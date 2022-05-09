import * as React from 'react';
import { StatusBar, View, Text, Pressable, Platform } from 'react-native';
import { Contexts } from '_services';
import { Typography } from '_styles';
import * as Icons from '_assets/icons';
import Constants from 'expo-constants';

class HeaderNavigation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Contexts.Theme.ThemeContext.Consumer>
                {({ name, theme, components, functions }) => (
                    <View
                        style={{
                            width: '100%',
                            height: (Platform.OS == 'android' ? 0 : Constants.statusBarHeight) + 80,
                            paddingBottom: 10,
                            paddingHorizontal: 20,
                            paddingTop: (Platform.OS == 'android' ? 0 : Constants.statusBarHeight) + 10,
                            backgroundColor: components.header_navigation.backgroundColor,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            elevation: 5,
                            shadowColor: theme.backgroundColorShadow,
                            shadowOpacity: 0.2,
                            shadowOffset: {width: 1, height: 1},
                        }}
                    >
                        <StatusBar backgroundColor={components.header_navigation.backgroundColor} barStyle={theme.statusBarStyle} animated />
                        <View
                            style={{
                                width: 60,
                                height: 60,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {this.props.showLogo == true ?
                                <Icons.Logo size={50} />
                            :
                            (this.props.showBackButton == true && (this.props.navigationControl.canGoBack() || this.props.navigation.canGoBack())) ?
                                <Pressable
                                    style={{
                                        width: '60%',
                                        height: '60%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    android_ripple={{
                                        color: components.header_navigation.secondaryRippleColor,
                                        borderless: true
                                    }}
                                    onPress={() => {
                                        if (this.props.navigation.canGoBack()) {
                                            this.props.navigation.goBack()
                                        } else if (this.props.navigationControl.canGoBack()) {
                                            this.props.navigationControl.goBack()
                                        }
                                    }}
                                >
                                    <Icons.Back size={20} color={components.header_navigation.secondaryIconColor} />
                                </Pressable>
                            : null}
                        </View>
                        <View
                            style={{
                                flex: 1,
                            }}
                        >
                            {this.props.children !== null && this.props.children !== undefined ?
                                this.props.children
                                :
                                this.props.options.title !== null && this.props.options.title !== undefined ?
                                    <Text
                                        style={[
                                            Typography.DEFAULT_FONT_BOLD,
                                            {
                                                textAlign: 'center',
                                                fontSize: 20,
                                                width: '100%',
                                                textAlignVertical: 'center',
                                                color: components.header_navigation.titleColorText,
                                            }
                                        ]}
                                    >{this.props.options.title}</Text>
                                    : null}
                        </View>
                        <View
                            style={{
                                width: 60,
                                height: 60,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {this.props.filter ?
                                <Pressable
                                    style={{
                                        width: '60%',
                                        height: '60%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    android_ripple={{
                                        color: components.header_navigation.secondaryRippleColor,
                                        borderless: true
                                    }}
                                    onPress={() => {
                                        this.props.options.filterDrawer?.current?.showDrawer();
                                    }}
                                >
                                    <Icons.Filter size={20} color={components.header_navigation.secondaryIconColor} />
                                </Pressable>
                            : this.props.check ?
                                <Pressable
                                    style={{
                                        width: '60%',
                                        height: '60%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    android_ripple={{
                                        color: components.header_navigation.secondaryRippleColor,
                                        borderless: true
                                    }}
                                    onPress={() => this.props.check()}
                                >
                                    <Icons.Check size={20} color={components.header_navigation.secondaryIconColor} />
                                </Pressable>
                            : this.props.toggleTheme ?
                                <Pressable
                                    style={{
                                        width: '60%',
                                        height: '60%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    android_ripple={{
                                        color: components.header_navigation.secondaryRippleColor,
                                        borderless: true
                                    }}
                                    onPress={() => functions.toggleTheme()}
                                >
                                    {name == 'dark' ?
                                        <Icons.Light size={20} color={components.header_navigation.secondaryIconColor} />
                                    :
                                        <Icons.Dark size={20} color={components.header_navigation.secondaryIconColor} />
                                    }
                                </Pressable>
                            :this.props.showUser ?
                                <Pressable
                                    style={{
                                        width: '60%',
                                        height: '60%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderWidth: 1,
                                        borderRadius: 100,
                                        borderColor: components.header_navigation.secondaryIconColor,
                                        backgroundColor: components.header_navigation.backgroundIconColor,
                                    }}
                                    android_ripple={{
                                        color: components.header_navigation.secondaryRippleColor,
                                        borderless: true
                                    }}
                                    onPress={() => this.props.navigation.navigate('ConfigurationsScreen')}
                                >
                                    <Icons.User size={20} color={components.header_navigation.secondaryIconColor} />
                                </Pressable>
                            : null}
                        </View>
                    </View>
                )}
            </Contexts.Theme.ThemeContext.Consumer>
        );
    }
}

export default HeaderNavigation;