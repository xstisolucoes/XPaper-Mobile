import * as React from 'react';
import { Alert, View } from 'react-native';
import { Atoms, Molecules } from '_components';
import { Contexts } from '_services';

class AddStockAddressScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
            item      : this.props.route.params.item,
            checklist : this.props.route.params.checklist,
            refugo    : this.props.route.params.refugo,
            pop       : this.props.route.params.pop,
        };

        this._listItens = React.createRef();
    }

    finalizarInspecao(functions, pes_codigo) {
        let codigo = this._listItens.current.getCodigo();
        Alert.alert(
            'Confirmação',
            'Deseja salvar as informações da inspeção?',
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
                        await functions.saveInspecaoRecebimento(
                            this.state.item.infe_numero_nf,
                            this.state.item.infe_serie_nf,
                            this.state.item.pes_codigo,
                            this.state.item.infe_codigo,
                            this.state.item.pc_codigo,
                            pes_codigo,
                            this.state.checklist,
                            this.state.refugo, 
                            codigo);
                        await functions.updateRecebimentosNotasItens(this.state.item.infe_numero_nf);
                        await this.setState({
                            refreshing: false,
                        });
                        this.props.navigation.pop(this.state.pop);
                    }
                }
            ],
        );
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
                        padding: 20,
                    }}
                >
                    <Contexts.User.UserContext.Consumer>
                        {(user) => (
                            <Contexts.RecebimentosNotasItens.RecebimentosNotasItensContext.Consumer>
                                {(recebimentosNotasItens) => (
                                    <Contexts.ProductAddress.ProductAddressContext.Consumer>
                                        {({ productAddress, functions }) => (
                                            <Molecules.RadioList 
                                                refreshing={this.state.refreshing}
                                                ref={this._listItens}
                                                onRefresh={async () => {
                                                    this.setState({refreshing: true});
                                                    await functions.updateProductAddress(this.state.item['pc_codigo'], this.state.item['emp_codigo']);
                                                    this.setState({refreshing: false});
                                                }}
                                                fieldName={{
                                                    codigo: 're_codigo',
                                                    title: 're_nome',
                                                }}
                                                keyExtractor={(item) => item.key}
                                                data={productAddress}
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
                                                            title={'Finalizar'}
                                                            onPress={() => {
                                                                this.finalizarInspecao(recebimentosNotasItens.functions, user.user.pes_codigo);
                                                            }}
                                                        />
                                                    </View>
                                                )}
                                            />
                                        )}
                                    </Contexts.ProductAddress.ProductAddressContext.Consumer>
                                )}
                            </Contexts.RecebimentosNotasItens.RecebimentosNotasItensContext.Consumer>
                        )}
                    </Contexts.User.UserContext.Consumer>
                </View>
            </Atoms.NavigationScroll>
        );
    }
}

export default AddStockAddressScreen;