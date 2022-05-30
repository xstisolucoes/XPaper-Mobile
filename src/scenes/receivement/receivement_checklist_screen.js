import * as React from 'react';
import { View, Alert, FlatList } from 'react-native';
import { Atoms } from '_components';
import { Contexts } from '_services';
import Dialog from 'react-native-dialog';

const ReceivementChecklistItem = (props) => {
    return (
        <Contexts.RecebimentosNotasChecklist.RecebimentosNotasChecklistContext.Consumer>
            {({ functions }) => (
                <Atoms.DefaultChecklist
                    title={props.item['p_descricao']}
                    type={props.item['p_tipo']}
                    value={props.item['p_value']}
                    setValue={(value) => {
                        functions.setValue(props.item['p_codigo'], value);
                    }}
                />
            )}
        </Contexts.RecebimentosNotasChecklist.RecebimentosNotasChecklistContext.Consumer>
    );
}

class ReceivementChecklistScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.route.params.item,
            value: 0,
            refreshing: false,
            inputDialogVisible: false,
            qtdeNaoConforme: '0',
        }

        this._inputQtdeNC = React.createRef();
        this._inputRefugo = React.createRef();
    }

    verificaFinalInspecao(data, functions, refugo) {
        let preenchido = true;
        let conforme = true;

        data.forEach((object) => {
            if (object['p_value'] == 2) {
                conforme = false;
            } else if (object['p_value'] == 0) {
                preenchido = false;
            }
        });

        if (!preenchido) {
            Alert.alert(
                'Erro',
                'Preencha todos os items do checklist antes de finalizá-lo.',
                [
                    {
                        text: 'Ok',
                    }
                ],
            );
        } else {
            if (!conforme) {
                Alert.alert(
                    'Não conformidade',
                    'O produto apresenta não conformidade(s), deseja informar a quantidade não conforme?',
                    [
                        {
                            text: 'Não',
                            style: 'cancel',
                            onPress: () => this.verificaRefugo(refugo, functions, data),
                        },
                        {
                            text: 'Sim',
                            onPress: () => {
                                this.setState({
                                    inputDialogVisible: true,
                                });
                            },
                        }
                    ],
                );
            } else {
                this.verificaRefugo(refugo, functions, data);
            }
        }
    }

    verificaRefugo(refugo, functions, data) {
        Alert.alert(
            'Refugo',
            'O produto apresenta refugo?',
            [
                {
                    text: 'Não',
                    style: 'cancel',
                    onPress: () => this.finalizaInspecao(functions, data),
                },
                {
                    text: 'Sim',
                    onPress: async () => {
                        await refugo.functions.updateRecebimentosNotasRefugo(this.state.item['infe_numero_nf'], this.state.item['infe_serie_nf'], this.state.item['pes_codigo'], this.state.item['infe_codigo']);
                        this.props.navigation.navigate('ReceivementRefugoScreen', {item: this.state.item, data: data});
                    }
                }
            ],
        );
    }

    async finalizaInspecao(functions, data) {
        Alert.alert(
            'Endereço',
            'Selecione o endereço do estoque no qual o produto será alocado.',
            [
                {
                    text: 'Ok',
                    onPress: async () => {
                        let item = this.state.item;
                        let checklist = [];
                        data.forEach((object) => {
                            checklist.push({p_codigo: object["p_codigo"], p_value: object["p_value"]});
                        });
                        await this.setState({
                            refreshing: true,
                        });
                        await functions.updateProductAddress(1, item.pc_codigo, 1);
                        this.props.navigation.navigate('AddStockAddressScreen', {item: this.state.item, checklist: checklist, refugo: [], pop: 2});
                        await this.setState({
                            refreshing: false,
                        });
                    }
                }
            ],
        );
    }

    render() {
        return (
            <Atoms.NavigationScroll noScroll>
                <Contexts.Theme.ThemeContext.Consumer>
                    {({ theme, components }) => (
                        <Contexts.RecebimentosNotasItens.RecebimentosNotasItensContext.Consumer>
                            {(recebimentosNotasItem) => (
                                <Contexts.RecebimentosNotasChecklist.RecebimentosNotasChecklistContext.Consumer>
                                    {({ recebimentosNotasChecklist, functions }) => (
                                        <Contexts.RecebimentosNotasRefugo.RecebimentosNotasRefugoContext.Consumer>
                                            {(refugo) => (
                                                <Contexts.ProductAddress.ProductAddressContext.Consumer>
                                                    {(address) => (
                                                        <View 
                                                            style={{
                                                                flex: 1,
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                            }}
                                                        >
                                                            <Dialog.Container visible={this.state.inputDialogVisible}>
                                                                <Dialog.Title style={{fontWeight: 'bold', fontSize: 18}}>Não Conformidade</Dialog.Title>
                                                                <Dialog.Description style={{fontSize: 16}}>Quantidade não conforme</Dialog.Description>
                                                                <Dialog.Input value={this.state.qtdeNaoConforme} style={{fontSize: 16}} keyboardType={'number-pad'} onChangeText={(text) => this.setState({qtdeNaoConforme: text})} />
                                                                <Dialog.Button style={{color: '#1C73B4', fontSize: 16}} label="Cancelar" onPress={() => {
                                                                    this.setState({
                                                                        inputDialogVisible: false,
                                                                    });
                                                                }} />
                                                                <Dialog.Button style={{color: '#1C73B4', fontSize: 16}}  label="Confirmar" onPress={() => {
                                                                    this.setState({
                                                                        inputDialogVisible: false,
                                                                    });
                                                                    this.verificaRefugo(refugo);
                                                                }} />
                                                            </Dialog.Container>
                                                            <FlatList
                                                                style={{
                                                                    width: '100%',
                                                                }}
                                                                data={recebimentosNotasChecklist}
                                                                renderItem={(object) => (
                                                                    <ReceivementChecklistItem item={object.item} navigation={this.props.navigation} theme={theme} components={components} />
                                                                )}
                                                                onRefresh={async () => {
                                                                    this.setState({refreshing: true});
                                                                    await functions.updateRecebimentosNotasChecklist(this.state.item.infe_numero_nf, this.state.item.infe_codigo);
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
                                                                            title={'Finalizar'}
                                                                            onPress={() => this.verificaFinalInspecao(recebimentosNotasChecklist, address.functions, refugo)}
                                                                        />
                                                                    </View>
                                                                )}
                                                            />
                                                        </View>
                                                    )}
                                                </Contexts.ProductAddress.ProductAddressContext.Consumer>
                                            )}
                                        </Contexts.RecebimentosNotasRefugo.RecebimentosNotasRefugoContext.Consumer>
                                    )}
                                </Contexts.RecebimentosNotasChecklist.RecebimentosNotasChecklistContext.Consumer>
                            )}
                        </Contexts.RecebimentosNotasItens.RecebimentosNotasItensContext.Consumer>
                    )}
                </Contexts.Theme.ThemeContext.Consumer>
            </Atoms.NavigationScroll>
        );
    }
}

export default ReceivementChecklistScreen;