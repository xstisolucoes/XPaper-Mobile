import * as React from 'react';
import { FlatList, Text, View } from 'react-native';
import { Atoms } from '_components';
import { Contexts, Global } from '_services';
import { Typography } from '_styles';

const ListProductProviderItem = (props) => {
    return (
        <Atoms.DefaultCard
            style={{
                marginHorizontal: 8,
                marginVertical: 4,
            }}
            android_ripple={{
                color: props.components.list_maintenance_item.rippleColor
            }}
            onPress={async () => {
                props.navigation.navigate('ProductStockDetailScreen', {item: props.product, forn: props.item});
            }}
        >
            <Text style={[{fontSize: 18, color: props.theme.defaultTextColor}, Typography.DEFAULT_FONT_BOLD]}>{props.item['pes_fantasia']}</Text>
            <Text>
                <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_BOLD]}>Fornecedor: </Text>
                <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_REGULAR]}>{props.item['pes_razao']}</Text>
            </Text>
            <Text>
                <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_BOLD]}>Quantidade: </Text>
                <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_REGULAR]}>{Global.formatPoints(props.item['pcf_quantidade'])}</Text>
            </Text>
            <Text>
                <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_BOLD]}>Locais: </Text>
                <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_REGULAR]}>{props.item['pcf_ruas']}</Text>
            </Text>
            <Text>
                <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_BOLD]}>Status: </Text>
                <Text
                    style={[
                        {
                            fontSize: 14,
                            color: props.item['pcf_status'] == 'Ativo' ? props.theme.success : props.theme.error,
                        },
                        Typography.SECONDARY_FONT_BOLD
                    ]}
                >
                    {props.item['pcf_status']}
                </Text>
            </Text>
        </Atoms.DefaultCard>
    );
}

class ListProductProvidersScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
            connected : true,
            item      : this.props.route.params.item,
        };
    }

    render() {
        return (
            <Atoms.NavigationScroll noScroll>
                <View 
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Contexts.Theme.ThemeContext.Consumer>
				        {({ theme, components }) => (
                            <Contexts.EstoqueProdutosFornecedores.EstoqueProdutosFornecedoresContext.Consumer>
                                {({ estoqueProdutosFornecedores, functions }) => (
                                    <FlatList
                                        style={{
                                            width: '100%',
                                        }}
                                        data={this.state.connected == false ? [] : estoqueProdutosFornecedores}
                                        renderItem={(object) => (
                                            <ListProductProviderItem item={object.item} product={this.state.item} navigation={this.props.navigation} theme={theme} components={components} />
                                        )}
                                        onRefresh={async () => {
                                            await this.setState({
                                                refreshing: true,
                                            });
                                            
                                            let connected = await Global.checkInternetConnection();
                                            if (connected) {
                                                await functions.updateEstoqueProdutosFornecedores(null, this.state.item['pc_codigo']);
                                            }
                                            await this.setState({
                                                refreshing: false,
                                                connected : connected,
                                            });
                                        }}
                                        ListFooterComponent={() => (
                                            this.state.connected == false ? <Atoms.Errors.NoConnection /> :
                                            estoqueProdutosFornecedores.length == 0 ? <Atoms.Errors.NoItens /> : null
                                        )}
                                        refreshing={this.state.refreshing}
                                        keyExtractor={(item) => item.key}
                                    />
                                )}
                            </Contexts.EstoqueProdutosFornecedores.EstoqueProdutosFornecedoresContext.Consumer>
                        )}
                    </Contexts.Theme.ThemeContext.Consumer>
                </View>
            </Atoms.NavigationScroll>
        );
    }
}

export default ListProductProvidersScreen;