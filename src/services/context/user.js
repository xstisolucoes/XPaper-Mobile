import * as React from 'react';
import { Usuario } from '../models';
import * as Storage from '../storage';
import { Usuarios } from '../functions';

export const UserContext = React.createContext({
    user: null,
});

const getCacheUser = async () => {
    let userJson = await Storage.getData('cacheUser');

    let user = null;
    if (userJson !== null && userJson !== "" && userJson) {
        user = JSON.parse(userJson);
    }

    return user;
}

class UserContextProvider extends React.Component {
    constructor(props) {
        super(props);

        this.updateUser = async () => {
            let data = await getCacheUser();
            let logged = !data || data == null ? false : true;
            let user = !data || data == null ? null : new Usuario(data);
            
            if (logged) {
                user['usu_permissoes'] = await this.getUserPermissions(user['usu_codigo']);
            }

            this.setState({
                user    : user,
                isLogged: logged,
            });
        }

        this.getUserPermissions = async (usu_codigo) => {
            let response = await Usuarios.buscaPermissoes(usu_codigo);

            let permissions = [];
            if (response.status == 200) {
                permissions = response.data.result[0];
            }

            return permissions;
        }

        this.tryLogin = async (email, password) => {
            let user = null;
            let error = null;
            let response = await Usuarios.tryLogin(email, password);

            if (response.status == 200) {
                let json = response.data.result[0];
                if (json.error == 'false') {
                    user = new Usuario(json.data);
                    await Storage.setData('cacheUser', JSON.stringify(user));
                } else {
                    error = json.error_type;
                }
            }

            this.setState({
                user    : !user || user == null ? null : user,
                isLogged: !user || user == null ? false : true,
            });

            return error;
        }

        this.logout = async () => {
            await this.setState({
                user    : {},
                isLogged: false,
            });

            await Storage.setData('cacheUser', '');
        }

        this.state = {
            user     : {},
            isLogged : false,
            functions: {
                updateUser        : this.updateUser,
                getUserPermissions: this.getUserPermissions,
                tryLogin          : this.tryLogin,
                logout            : this.logout,
            }
        }
    }

    componentDidMount() {
        this.updateUser();
    }

    render() {
        return (
            <UserContext.Provider
                value={this.state}
            >
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export default UserContextProvider;