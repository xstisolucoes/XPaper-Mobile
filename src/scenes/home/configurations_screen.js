import * as React from 'react';
import { Alert, FlatList, Pressable, Text, View } from 'react-native';
import { Atoms } from '_components';
import { Contexts, Global } from '_services';
import { Typography } from '_styles';

const Separator = (props) => (
    <View
        style={{
            width: '100%',
            height: 1,
            backgroundColor: props.theme.backgroundColorAccent,
        }}
    />
);

const ConfigurationItem = (props) => (
    props.onPress ?
        <Pressable
            style={{
                width: '100%',
                height: 80,
                padding: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
            android_ripple={{
                color: props.components.configurations_list_item.rippleColor,
            }}
            onPress={() => {
                if (props.onPress) {
                    props.onPress();
                }
            }}
        >
            {props.title && props.title !== '' ?
                <Text style={[Typography.DEFAULT_FONT_REGULAR, {fontSize: 18, color: props.theme.defaultTextColor, marginRight: 15}]}>{props.title}</Text>
            : null}
            {props.children}
        </Pressable>
    :
        <View
            style={{
                width: '100%',
                height: 80,
                padding: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            {props.title && props.title !== '' ?
                <Text style={[Typography.DEFAULT_FONT_REGULAR, {fontSize: 18, color: props.theme.defaultTextColor, marginRight: 15}]}>{props.title}</Text>
            : null}
            {props.children}
        </View>
);

class ConfigurationsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.configs       = Global.getConfigs();
        this.server_ip     = React.createRef();
        this.server_method = React.createRef();
        this.server_port   = React.createRef();

        this.state = {
            refreshing: false,
        }
    }

    render() {
        return (
            <Atoms.NavigationScroll noScroll>
                <Contexts.Theme.ThemeContext.Consumer>
                    {(theme) => (
                        <Contexts.Configurations.ConfigurationsContext.Consumer>
                            {({ functions }) => (
                                <Contexts.User.UserContext.Consumer>
                                    {(user) => (
                                        <FlatList
                                            refreshing={this.state.refreshing}
                                            onRefresh={async () => {
                                                await this.setState({
                                                    refreshing: true,
                                                });
                                                await user.functions.updateUser();
                                                await this.setState({
                                                    refreshing: false,
                                                });
                                            }}
                                            data={[]}
                                            ListFooterComponent={() => (
                                                <View 
                                                    style={{
                                                        flex: 1,
                                                        flexDirection: 'column',
                                                        justifyContent: 'flex-start',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <ConfigurationItem theme={theme.theme} components={theme.components} title={user.isLogged == true ? 'Usuario: ' + user.user['pes_fantasia'] : 'Entrar'} onPress={() => {
                                                        this.props.navigation.navigate(user.isLogged == true ? 'UserProfileScreen' : 'LoginScreen');
                                                    }} />
                                                    <Separator theme={theme.theme} />
                                                    <ConfigurationItem theme={theme.theme} components={theme.components} title={'Tema escuro'}>
                                                        <Atoms.TogglerButton value={theme.name === 'dark'} onPress={() => theme.functions.toggleTheme()} />
                                                    </ConfigurationItem>
                                                    <Separator theme={theme.theme} />
                                                    {(user.isLogged && (user.user['usu_permissoes']).some(v => ['mobile.alterar_servidor', 'mobile.todas_permissoes'].includes(v))) ?
                                                        <View style={{width: '100%'}}>
                                                            <ConfigurationItem theme={theme.theme} components={theme.components} title={'IP do Servidor'}>
                                                                <Atoms.DefaultInput
                                                                    viewStyle={{
                                                                        flex: 1,
                                                                        maxWidth: 130,
                                                                    }}
                                                                    ref={this.server_ip}
                                                                    value={this.configs.server_ip}
                                                                    keyboardType={'number-pad'}
                                                                    fixKeyboard
                                                                />
                                                            </ConfigurationItem>
                                                            <Separator theme={theme.theme} />
                                                            <ConfigurationItem theme={theme.theme} components={theme.components} title={'Porta do Servidor'}>
                                                                <Atoms.DefaultInput
                                                                    viewStyle={{
                                                                        flex: 1,
                                                                        maxWidth: 70,
                                                                    }}
                                                                    ref={this.server_port}
                                                                    value={this.configs.server_port}
                                                                    keyboardType={'number-pad'}
                                                                    fixKeyboard
                                                                />
                                                            </ConfigurationItem>
                                                            <Separator theme={theme.theme} />
                                                            <ConfigurationItem theme={theme.theme} components={theme.components} title={'Método do Servidor'}>
                                                                <Atoms.DefaultInput
                                                                    viewStyle={{
                                                                        flex: 1,
                                                                        maxWidth: 70,
                                                                    }}
                                                                    ref={this.server_method}
                                                                    value={this.configs.server_method}
                                                                    fixKeyboard
                                                                />
                                                            </ConfigurationItem>
                                                            <Separator theme={theme.theme} />
                                                            <ConfigurationItem theme={theme.theme} components={theme.components}>
                                                                <Atoms.DefaultButton
                                                                    style={{
                                                                        width: '100%',
                                                                        marginHorizontal: 'auto',
                                                                    }}
                                                                    title={'Salvar'}
                                                                    onPress={() => {
                                                                        functions.setValue('server_ip', this.server_ip.current.getText());
                                                                        functions.setValue('server_port', this.server_port.current.getText());
                                                                        functions.setValue('server_method', this.server_method.current.getText());
                                                                        Alert.alert('Sucesso!', 'As configurações foram salvas com sucesso.', [{text: 'OK'}]);
                                                                    }}
                                                                />
                                                            </ConfigurationItem>
                                                            <Separator theme={theme.theme} />
                                                        </View>
                                                    : null}
                                                </View>
                                            )}
                                        />
                                    )}
                                </Contexts.User.UserContext.Consumer>
                            )}
                        </Contexts.Configurations.ConfigurationsContext.Consumer>
                    )}
                </Contexts.Theme.ThemeContext.Consumer>
            </Atoms.NavigationScroll>
        );
    }
}

export default ConfigurationsScreen;