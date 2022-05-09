import * as React from 'react';
import { Text, View } from 'react-native';
import { Atoms } from '_components';
import { Contexts } from '_services';
import { Typography } from '_styles';
import * as Icons from '_assets/icons';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
        };

        this._email = React.createRef();
        this._password = React.createRef();
    }

    render() {
        return (
            <Atoms.NavigationScroll>
                <Contexts.Theme.ThemeContext.Consumer>
                    {({ theme }) => (
                        <View 
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                padding: 20, 
                            }}
                        >
                            <Icons.Logo size={150} />
                            <Text style={[Typography.DEFAULT_FONT_BOLD, {fontSize: 20, color: theme.defaultTextColor, marginVertical: 30}]}>Login</Text>
                            <Atoms.DefaultInput labelTitle={'E-mail'} ref={this._email} error={this.state.error == 'invalid_email' ? 'E-mail Inválido' : undefined} returnKeyType={'next'} keyboardType={'email-address'} />
                            <Atoms.DefaultInput labelTitle={'Senha'} ref={this._password} error={this.state.error == 'incorrect_password' ? 'Senha Incorreta' : undefined} returnKeyType={'done'} secureTextEntry={true} />
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
                                    title={'Entrar'}
                                    onPress={async () => {
                                        let email = this._email.current.getText();
                                        let password = this._password.current.getText();

                                        this.setState({
                                            error: null,
                                        });

                                        let response = await this.props.functions.tryLogin(email, password);

                                        if (response !== null) {
                                            this.setState({
                                                error: response,
                                            });
                                        }
                                    }}
                                />
                            </View>
                        </View>
                    )}
                </Contexts.Theme.ThemeContext.Consumer>
            </Atoms.NavigationScroll>
        );
    }
}

export default LoginScreen;