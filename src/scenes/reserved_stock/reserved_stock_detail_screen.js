import * as React from 'react';
import { View, Alert } from 'react-native';
import { Atoms } from '_components';
import { Functions, Global, Contexts } from '_services';

class ReservedStockDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.route.params.item,
        }
    }

    atenderSolicitacao(functions, reservedStock) {
        Alert.alert(
            'Confirmação',
            this.state.item['ser_status'] == 'Solicitado' ? 'Confirma a separação desta reserva?' : this.state.item['ser_status'] == 'Separado' ? 'Deseja realizar o transbordo da reserva?' : 'Deseja atender a solicitação?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Confirmar',
                    onPress: async () => {
                        if (this.state.item['ser_status'] == 'Solicitado') {
                            Alert.alert(
                                'Endereço',
                                'Indique os endereços e suas respectivas quantidades retiradas.',
                                [
                                    {
                                        text: 'Ok',
                                        onPress: async () => {
                                            await functions.updateProductAddress(1, this.state.item.pc_codigo, this.state.item.pcf_codigo);
                                            this.props.navigation.navigate('RemoveStockAddressScreen', {item: this.state.item});
                                        }
                                    }
                                ],
                            );
                        } else if (this.state.item['ser_status'] == 'Separado') {
                            let item = this.state.item;
                            let response = await reservedStock.functions.transbordReservedStock(item.op_codigo, item.er_codigo);
                            if (response.status == 200) {
                                await reservedStock.functions.updateEstoqueReservado();
                                this.props.navigation.goBack();
                            }
                        } else {
                            let item = this.state.item;
                            let response = await reservedStock.functions.finishReservedStock(item.op_codigo, item.er_codigo);
                            if (response.status == 200) {
                                await reservedStock.functions.updateEstoqueReservado();
                                this.props.navigation.goBack();
                            }
                        }
                    }
                }
            ],
        );
    }

    render() {
        return (
            <Contexts.EstoqueReservado.EstoqueReservadoContext.Consumer>
                {(reservedStock) => (
                    <Contexts.ProductAddress.ProductAddressContext.Consumer>
                        {({ functions }) => (
                            <Atoms.NavigationScroll>
                                <View 
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: 20,
                                    }}
                                >
                                    <Atoms.DefaultInput labelTitle={'Ordem de Produção'} multiline={true} disabled value={this.state.item['op_codigo']} />
                                    <Atoms.DefaultInput labelTitle={'Máquina'} multiline={true} disabled value={this.state.item['ser_processo']} />
                                    <Atoms.DefaultInput labelTitle={'Data de solicitação'} multiline={true} disabled value={this.state.item['ser_data_solicitacao']} />
                                    <Atoms.DefaultInput labelTitle={'Referência'} multiline={true} disabled value={this.state.item['referencia']} />
                                    <Atoms.DefaultInput labelTitle={'Cliente'} multiline={true} disabled value={this.state.item['fantasia']} />
                                    <Atoms.DefaultInput labelTitle={'Composição'} multiline={true} disabled value={this.state.item['compos_descricao']} />
                                    <Atoms.DefaultInput labelTitle={'Medidas'} multiline={true} disabled value={this.state.item['pc_medidas']} />
                                    <Atoms.DefaultInput labelTitle={'Quantidade'} multiline={true} disabled value={Global.formatPoints(this.state.item['ser_quantidade'])} />
                                    <Atoms.DefaultInput labelTitle={'Status'} multiline={true} disabled value={this.state.item['ser_status']} />
                                    {this.state.item['ser_status'] !== 'Atendido' ? 
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
                                                title={this.state.item['ser_status'] == 'Solicitado' ? 'Separar' : this.state.item['ser_status'] == 'Separado' ? 'Transbordar' : 'Atender'}
                                                onPress={() => this.atenderSolicitacao(functions, reservedStock)}
                                            />
                                        </View>
                                    : null}
                                </View>
                            </Atoms.NavigationScroll>
                        )}
                    </Contexts.ProductAddress.ProductAddressContext.Consumer>
                )}
            </Contexts.EstoqueReservado.EstoqueReservadoContext.Consumer>
        );
    }
}

export default ReservedStockDetailScreen;