import * as React from 'react';
import { Alert, FlatList, View } from 'react-native';
import { Atoms, Molecules } from '_components';
import { Contexts } from '_services';

const ListProductAddressItem = (props) => {
    return (
        <Contexts.ProductAddress.ProductAddressContext.Consumer>
            {({ functions }) => (
                <View style={{marginHorizontal: 20}}>
                    <Atoms.DefaultInput
                        labelTitle={props.item['re_nome']}
                        value={props.item['re_quantidade']}
                        setValue={(text) => {
                            functions.setValue(props.item['re_codigo'], text);
                        }}
                        keyboardType={'number-pad'}
                    />
                </View>
            )}
        </Contexts.ProductAddress.ProductAddressContext.Consumer>
    );
}

class AddStockAddressScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
            item      : this.props.route.params.item,
        };

        this._listItens = React.createRef();
    }

    addStock(functions, address) {
        let data = [];
        let qtde = 0;

        address.forEach((object) => {
            if (object['re_quantidade'] > 0) {
                data.push({
                    re_codigo    : object['re_codigo'],
                    re_quantidade: object['re_quantidade'],
                });

                qtde = qtde + object['re_quantidade'];
            }
        });

        if (data.length == 0 || qtde <= 0) {
            Alert.alert(
                'Erro',
                'A quantidade total deve ser maior que 0.',
                [
                    {
                        text: 'Ok',
                    }
                ],
            );
        } else {
            Alert.alert(
                'Confirmação',
                'Deseja salvar os dado?',
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel',
                    },
                    {
                        text: 'Confirmar',
                        onPress: async () => {
                            await this.setState({
                                refreshing: true,
                            });

                            await functions.addProductStock(1, this.state.item['pc_codigo'], this.state.item['pcf_codigo'], data);
                            await functions.updateEstoqueProdutos();

                            await this.setState({
                                refreshing: true,
                            });
                            this.props.navigation.pop(2);
                        }
                    }
                ],
            );
        }
    }

    render() {
        return (
            <Atoms.NavigationScroll noScroll>
                <View 
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        paddingTop: 20,
                    }}
                >
                    <Contexts.EstoqueProdutos.EstoqueProdutosContext.Consumer>
                        {(productStockProviders) => (
                            <Contexts.ProductAddress.ProductAddressContext.Consumer>
                                {({ productAddress, functions }) => (
                                    <FlatList
                                        style={{
                                            width: '100%',
                                        }}
                                        data={productAddress}
                                        renderItem={(object) => (
                                            <ListProductAddressItem item={object.item} navigation={this.props.navigation} />
                                        )}
                                        onRefresh={async () => {
                                            this.setState({refreshing: true});
                                            await functions.updateProductAddress(1, this.state.item['pc_codigo'], this.state.item['pcf_codigo']);
                                            this.setState({refreshing: false});
                                        }}
                                        refreshing={this.state.refreshing}
                                        keyExtractor={(item) => item.key}
                                        ListFooterComponent={() => (
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
                                                    title={'Adicionar'}
                                                    onPress={() => {
                                                        this.addStock(productStockProviders.functions, productAddress);
                                                    }}
                                                />
                                            </View>
                                        )}
                                    />
                                )}
                            </Contexts.ProductAddress.ProductAddressContext.Consumer>
                        )}
                    </Contexts.EstoqueProdutos.EstoqueProdutosContext.Consumer>
                </View>
            </Atoms.NavigationScroll>
        );
    }
}

export default AddStockAddressScreen;