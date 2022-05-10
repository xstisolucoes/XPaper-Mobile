import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { Contexts } from '_services';
import { Typography } from '_styles';

export const NoConnection = () => (
    <Contexts.Theme.ThemeContext.Consumer>
        {({ theme }) => (
            <View
                style={{
                    width: '100%',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Image
                    source={require('_assets/images/no_connection.png')}
                    style={{
                        resizeMode: 'contain',
                        width: '100%',
                        maxWidth: 200,
                        maxHeight: 200
                    }}
                />
                <Text style={[Typography.DEFAULT_FONT_REGULAR, {fontSize: 18, textAlign: 'center', color: theme.defaultTextColor}]}>Parece que você não consegue se conectar</Text>
            </View>
        )}
    </Contexts.Theme.ThemeContext.Consumer>
);

export const NotLogged = () => (
    <Contexts.Theme.ThemeContext.Consumer>
        {({ theme }) => (
            <View
                style={{
                    width: '100%',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Image
                    source={require('_assets/images/error_404.png')}
                    style={{
                        resizeMode: 'contain',
                        width: '100%',
                        maxWidth: 200,
                        maxHeight: 200
                    }}
                />
                <Text style={[Typography.DEFAULT_FONT_REGULAR, {fontSize: 18, textAlign: 'center', color: theme.defaultTextColor}]}>Parece que você não esta logado, clique no icone à direita e realize o login</Text>
            </View>
        )}
    </Contexts.Theme.ThemeContext.Consumer>
);

export const NoItens = () => (
    <Contexts.Theme.ThemeContext.Consumer>
        {({ theme }) => (
            <View
                style={{
                    width: '100%',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Image
                    source={require('_assets/images/error_404.png')}
                    style={{
                        resizeMode: 'contain',
                        width: '100%',
                        maxWidth: 200,
                        maxHeight: 200
                    }}
                />
                <Text style={[Typography.DEFAULT_FONT_REGULAR, {fontSize: 18, textAlign: 'center', color: theme.defaultTextColor}]}>Não há itens</Text>
            </View>
        )}
    </Contexts.Theme.ThemeContext.Consumer>
);