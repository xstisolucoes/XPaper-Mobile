import * as React from 'react';
import { Text, View } from 'react-native';
import { Atoms } from '_components';
import { Contexts } from '_services';

class UserProfileScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Atoms.NavigationScroll>
                <Contexts.User.UserContext.Consumer>
                    {({ user, functions }) => (
                        <View 
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                padding: 20,
                            }}
                        >
                            <Atoms.DefaultInput labelTitle={'Apelido'} multiline={true} disabled value={user.pes_fantasia} />
                            <Atoms.DefaultInput labelTitle={'Nome Completo'} multiline={true} disabled value={user.pes_razao} />
                            <Atoms.DefaultInput labelTitle={'E-mail'} multiline={true} disabled value={user.usu_email} />
                            <View
                                style={{
                                    width: '100%',
                                    padding: 20,
                                    alignItems: 'center',
                                }}
                            >
                                <Atoms.DefaultButton
                                    style={{
                                        width: '100%',
                                        maxWidth: 200,
                                    }}
                                    title={'Sair'}
                                    onPress={() => {
                                        this.props.navigation.pop();
                                        functions.logout();
                                    }}
                                />
                            </View>
                        </View>
                    )}
                </Contexts.User.UserContext.Consumer>
            </Atoms.NavigationScroll>
        );
    }
}

export default UserProfileScreen;