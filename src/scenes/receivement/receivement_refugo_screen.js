import * as React from 'react';
import { Alert, FlatList, Pressable, Text, View } from 'react-native';
import { Atoms } from '_components';
import { Contexts } from '_services';
import { Typography } from '_styles';

const ListRefugoItem = (props) => {
    return (
        <Contexts.RecebimentosNotasRefugo.RecebimentosNotasRefugoContext.Consumer>
            {({ functions }) => (
                <Atoms.DefaultInput
                    labelTitle={props.item['mo_descricao']}
                    value={props.item['infer_quantidade']}
                    setValue={(text) => {
                        functions.setValue(props.item['mo_codigo'], text);
                    }}
                    keyboardType={'number-pad'}
                />
            )}
        </Contexts.RecebimentosNotasRefugo.RecebimentosNotasRefugoContext.Consumer>
    );
}

class ReceivementRefugoScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            item      : this.props.route.params.item,
            data      : this.props.route.params.data,
            refreshing: false,
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
                        padding: 20,
                    }}
                >
                    <Contexts.Theme.ThemeContext.Consumer>
				        {({ theme, components }) => (
                            <Contexts.ProductAddress.ProductAddressContext.Consumer>
                                {(productAddress) => (
                                    <Contexts.RecebimentosNotasRefugo.RecebimentosNotasRefugoContext.Consumer>
                                        {({ recebimentosNotasRefugo, functions }) => (
                                            <FlatList
                                                style={{
                                                    width: '100%',
                                                }}
                                                data={recebimentosNotasRefugo}
                                                renderItem={(object) => (
                                                    <ListRefugoItem item={object.item} navigation={this.props.navigation} theme={theme} components={components} />
                                                )}
                                                onRefresh={async () => {
                                                    this.setState({refreshing: true});
                                                    await functions.updateRecebimentosNotasRefugo(this.state.item['infe_numero_nf'], this.state.item['infe_serie_nf'], this.state.item['pes_codigo'], this.state.item['infe_codigo']);
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
                                                            title={'Salvar'}
                                                            onPress={() => {
                                                                Alert.alert(
                                                                    'Endereço',
                                                                    'Selecione o endereço do estoque no qual o produto será alocado.',
                                                                    [
                                                                        {
                                                                            text: 'Ok',
                                                                            onPress: async () => {
                                                                                let item = this.state.item;
                                                                                let checklist = [];
                                                                                this.state.data.forEach((object) => {
                                                                                    checklist.push({p_codigo: object["p_codigo"], p_value: object["p_value"]});
                                                                                });
                                                                                let refugo = [];
                                                                                recebimentosNotasRefugo.forEach((object) => {
                                                                                    refugo.push({mo_codigo: object.mo_codigo, infer_quantidade: object.infer_quantidade});
                                                                                });
                                                                                await this.setState({
                                                                                    refreshing: true,
                                                                                });
                                                                                await productAddress.functions.updateProductAddress(1, item.pc_codigo);
                                                                                this.props.navigation.navigate('AddStockAddressScreen', {item: this.state.item, checklist: checklist, refugo: refugo, pop: 3});
                                                                                await this.setState({
                                                                                    refreshing: false,
                                                                                });
                                                                            }
                                                                        }
                                                                    ],
                                                                );
                                                            }}
                                                        />
                                                    </View>
                                                )}
                                            />
                                        )}
                                    </Contexts.RecebimentosNotasRefugo.RecebimentosNotasRefugoContext.Consumer>
                                )}
                            </Contexts.ProductAddress.ProductAddressContext.Consumer>
                        )}
                    </Contexts.Theme.ThemeContext.Consumer>
                </View>
            </Atoms.NavigationScroll>
        );
    }
}

export default ReceivementRefugoScreen;