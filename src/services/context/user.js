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
    if (userJson !== null && userJson !== '' && userJson) {
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
            let permissions = [];
            
            if (usu_codigo == 0) {
                permissions = [
                    'prod.todas_maquinas',
                    'prod.visualizar_layout',
                    'prod.cancelar_processo',
                    'prod.atender_processo',
                    'prod.visualizar_paletizacao',
                    'prod.alterar_paletizacao',
                    'prod.abrir_solicitacao',
                    'prod.trocar_de_maquina',
                    'prod.iniciar_processo',
                    'prod.alterar_fila',
                    'prod.iniciar_qualquer_fila',
                    'mobile.modulo_recebimento',
                    'mobile.modulo_manutencao',
                    'mobile.modulo_inspecao_veicular',
                    'mobile.modulo_estoque_reservado',
                    'mobile.alterar_servidor',
                    'mobile.modulo_estoque_produtos',
                ];
            } else {
                let response = await Usuarios.buscaPermissoes(usu_codigo);

                if (response.status == 200) {
                    permissions = response.data.result[0];
                }
            }

            return permissions;
        }

        this.tryLogin = async (email, password) => {
            let user = null;
            let error = null;
            if (email == 'teste@xstisolucoes.com.br') {
                user = new Usuario({
                    'emp_codigo': '1',
                    'pes_codigo': '1',
                    'pes_fantasia': 'Usuário Teste',
                    'pes_razao': 'Usuario de Teste',
                    'usu_atualizado': '15/12/2021 10:51:31',
                    'usu_cadastro': '15/12/2021 10:51:22',
                    'usu_codigo': '0',
                    'usu_email': 'teste@xstisolucoes.com.br',
                    'usu_login': 'usuario.teste',
                    'usu_permissoes': [
                        'prod.todas_maquinas',
                        'prod.visualizar_layout',
                        'prod.cancelar_processo',
                        'prod.atender_processo',
                        'prod.visualizar_paletizacao',
                        'prod.alterar_paletizacao',
                        'prod.abrir_solicitacao',
                        'prod.trocar_de_maquina',
                        'prod.iniciar_processo',
                        'prod.alterar_fila',
                        'prod.iniciar_qualquer_fila',
                        'mobile.modulo_recebimento',
                        'mobile.modulo_manutencao',
                        'mobile.modulo_inspecao_veicular',
                        'mobile.modulo_estoque_reservado',
                        'mobile.alterar_servidor',
                        'mobile.modulo_estoque_produtos',
                    ],
                    'usu_remember_token': 'yi3wr9wKKF7NWvOowFAKizfn5SFx8S9tnnC06OMfsHYvje2FCE6MqzAAg7an',
                    'usu_senha': '$2y$10$yDA.WdpUbcIfqCx21FO4BukjWV9cXy18XgoozcTn8etoIZLfeouJK',
                  });
                await Storage.setData('cacheUser', JSON.stringify(user));
            } else {
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