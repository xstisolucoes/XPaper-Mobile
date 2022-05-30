import * as React from 'react';
import { FlatList, Text, View } from 'react-native';
import { Atoms } from '_components';
import { Contexts, Global } from '_services';
import { Typography } from '_styles';

const ListProductStockItem = (props) => {
    return (
        <Contexts.EstoqueProdutosFornecedores.EstoqueProdutosFornecedoresContext.Consumer>
            {({ functions }) => (
                <Atoms.DefaultCard
                    style={{
                        marginHorizontal: 8,
                        marginVertical: 4,
                    }}
                    android_ripple={{
                        color: props.components.list_maintenance_item.rippleColor
                    }}
                    onPress={async () => {
                        await functions.updateEstoqueProdutosFornecedores(null, props.item['pc_codigo']);
                        props.navigation.navigate('ListProductProvidersScreen', {item: props.item});
                    }}
                >
                    <Text style={[{fontSize: 18, color: props.theme.defaultTextColor}, Typography.DEFAULT_FONT_BOLD]}>Produto: {Global.numberWithPoints(props.item['pc_codigo'])}</Text>
                    <Text>
                        <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_BOLD]}>Descrição: </Text>
                        <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_REGULAR]}>{props.item['pc_descricao_completa']}</Text>
                    </Text>
                    <Text>
                        <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_BOLD]}>Quantidade: </Text>
                        <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_REGULAR]}>{Global.formatPoints(props.item['pc_quantidade'])}</Text>
                    </Text>
                    <Text>
                        <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_BOLD]}>Locais: </Text>
                        <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_REGULAR]}>{props.item['pc_ruas']}</Text>
                    </Text>
                    <Text>
                        <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_BOLD]}>Status: </Text>
                        <Text
                            style={[
                                {
                                    fontSize: 14,
                                    color: props.item['pc_status'] == 'Ativo' ? props.theme.success : props.theme.error,
                                },
                                Typography.SECONDARY_FONT_BOLD
                            ]}
                        >
                            {props.item['pc_status']}
                        </Text>
                    </Text>
                </Atoms.DefaultCard>
            )}
        </Contexts.EstoqueProdutosFornecedores.EstoqueProdutosFornecedoresContext.Consumer>
    );
}

class ListProductStockScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
            connected : true,
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
                            <Contexts.EstoqueProdutos.EstoqueProdutosContext.Consumer>
                                {({ estoqueProdutos, functions }) => (
                                    <FlatList
                                        style={{
                                            width: '100%',
                                        }}
                                        data={this.state.connected == false ? [] : estoqueProdutos}
                                        renderItem={(object) => (
                                            <ListProductStockItem item={object.item} navigation={this.props.navigation} theme={theme} components={components} />
                                        )}
                                        onRefresh={async () => {
                                            await this.setState({
                                                refreshing: true,
                                            });
                                            
                                            let connected = await Global.checkInternetConnection();
                                            if (connected) {
                                                await functions.updateEstoqueProdutos(null);
                                            }
                                            await this.setState({
                                                refreshing: false,
                                                connected : connected,
                                            });
                                        }}
                                        ListFooterComponent={() => (
                                            this.state.connected == false ? <Atoms.Errors.NoConnection /> :
                                            estoqueProdutos.length == 0 ? <Atoms.Errors.NoItens /> : null
                                        )}
                                        refreshing={this.state.refreshing}
                                        keyExtractor={(item) => item.key}
                                    />
                                )}
                            </Contexts.EstoqueProdutos.EstoqueProdutosContext.Consumer>
                        )}
                    </Contexts.Theme.ThemeContext.Consumer>
                </View>
            </Atoms.NavigationScroll>
        );
    }
}

export default ListProductStockScreen;