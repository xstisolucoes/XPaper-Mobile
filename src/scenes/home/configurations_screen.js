import * as React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { Atoms } from '_components';
import { Contexts } from '_services';
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

        this.state = {
            refreshing: false,
        }
    }

    render() {
        return (
            <Atoms.NavigationScroll noScroll>
                <Contexts.Theme.ThemeContext.Consumer>
                    {({ name, theme, components, functions }) => (
                        <Contexts.Configurations.ConfigurationsContext.Consumer>
                            {(configs) => (
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
                                                    <ConfigurationItem theme={theme} components={components} title={user.isLogged == true ? 'Usuario: ' + user.user['pes_fantasia'] : 'Entrar'} onPress={() => {
                                                        this.props.navigation.navigate(user.isLogged == true ? 'UserProfileScreen' : 'LoginScreen');
                                                    }} />
                                                    <Separator theme={theme} />
                                                    <ConfigurationItem theme={theme} components={components} title={'Tema escuro'}>
                                                        <Atoms.TogglerButton value={name === 'dark'} onPress={() => functions.toggleTheme()} />
                                                    </ConfigurationItem>
                                                    <Separator theme={theme} />
                                                    {user.user['usu_permissoes'] && user.user['usu_permissoes'].includes('mobile.alterar_servidor') ?
                                                        <View style={{width: '100%'}}>
                                                            <ConfigurationItem theme={theme} components={components} title={'IP do Servidor'}>
                                                                <Atoms.DefaultInput
                                                                    viewStyle={{
                                                                        flex: 1,
                                                                        maxWidth: 130,
                                                                    }}
                                                                    value={configs.configurations.server_ip}
                                                                    setValue={(value) => {
                                                                        configs.functions.setValue('server_ip', value);
                                                                    }}
                                                                />
                                                            </ConfigurationItem>
                                                            <Separator theme={theme} />
                                                            <ConfigurationItem theme={theme} components={components} title={'Porta do Servidor'}>
                                                                <Atoms.DefaultInput
                                                                    viewStyle={{
                                                                        flex: 1,
                                                                        maxWidth: 70,
                                                                    }}
                                                                    value={configs.configurations.server_port}
                                                                    setValue={(value) => {
                                                                        configs.functions.setValue('server_port', value);
                                                                    }}
                                                                />
                                                            </ConfigurationItem>
                                                            <Separator theme={theme} />
                                                            <ConfigurationItem theme={theme} components={components} title={'Método do Servidor'}>
                                                                <Atoms.DefaultInput
                                                                    viewStyle={{
                                                                        flex: 1,
                                                                        maxWidth: 70,
                                                                    }}
                                                                    value={configs.configurations.server_method}
                                                                    setValue={(value) => {
                                                                        configs.functions.setValue('server_method', value);
                                                                    }}
                                                                />
                                                            </ConfigurationItem>
                                                            <Separator theme={theme} />
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