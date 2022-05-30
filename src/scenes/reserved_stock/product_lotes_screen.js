import * as React from 'react';
import { Alert, View } from 'react-native';
import { Atoms } from '_components';
import { Contexts } from '_services';

class ProductLotesScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lotes: '',
            item : this.props.route.params.item,
            stock: this.props.route.params.stock,
        };
    }

    finalizarInspecao(functions) {
        Alert.alert(
            'Confirmação',
            'Deseja salvar as informações do estoque reservado?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Confirmar',
                    onPress: async () => {
                        await functions.separeReservedStock(
                            this.state.item.op_codigo,
                            this.state.item.er_codigo,
                            this.state.stock,
                            this.state.lotes
                        );
                        await functions.updateEstoqueReservado();
                        this.props.navigation.pop(3);
                    }
                }
            ],
        );
    }

    render() {
        return (
            <Atoms.NavigationScroll>
                
                <Contexts.EstoqueReservado.EstoqueReservadoContext.Consumer>
                    {(reservedStock) => (
                        <View 
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                padding: 20,
                            }}
                        >
                            <Atoms.DefaultInput
                                labelTitle={'Lotes separados'}
                                value={this.state.lotes}
                                style={{
                                    height: 200,
                                }}
                                setValue={(text) => {
                                    this.setState({
                                        lotes: text,
                                    })
                                }}
                                multiline={true}
                            />
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
                                        this.finalizarInspecao(reservedStock.functions);
                                    }}
                                />
                            </View>
                        </View>
                    )}
                </Contexts.EstoqueReservado.EstoqueReservadoContext.Consumer>
            </Atoms.NavigationScroll>
        );
    }
}

export default ProductLotesScreen;