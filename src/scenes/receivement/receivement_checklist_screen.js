import * as React from 'react';
import { View, Alert, FlatList } from 'react-native';
import { Atoms } from '_components';
import { Contexts } from '_services';

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
                    onError={() => {
                        props.navigation.navigate('ReceivementSubquestionsScreen', {item: props.item});
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
            qtdeNaoConforme: '0',
        }

        this._inputQtdeNC = React.createRef();
        this._inputRefugo = React.createRef();
    }

    verificaFinalInspecao(data, functions, refugo, pes_codigo) {
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
            this.verificaRefugo(refugo, functions, data, pes_codigo);
        }
    }

    verificaRefugo(refugo, functions, data, pes_codigo) {
        Alert.alert(
            'Refugo',
            'O produto apresenta refugo?',
            [
                {
                    text: 'Não',
                    style: 'cancel',
                    onPress: async () => {
                        let checklist = [];
                        data.forEach((object) => {
                            let sub_perguntas = [];
                            if (object["p_value"] == 2) {
                                object["sub_perguntas"].forEach((sub_pergunta) => {
                                    if (sub_pergunta['value'] == true) {
                                        sub_perguntas.push({sp_codigo: sub_pergunta['SP_CODIGO']});
                                    }
                                });
                            }
                            checklist.push({p_codigo: object["p_codigo"], p_value: object["p_value"], sub_perguntas: sub_perguntas});
                        });
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
                            checklist,
                            [], 
                            0);
                        await functions.updateRecebimentosNotasItens(this.state.item.infe_numero_nf);
                        await this.setState({
                            refreshing: false,
                        });
                        this.props.navigation.pop(1);
                    },
                },
                {
                    text: 'Sim',
                    onPress: async () => {
                        await refugo.functions.updateRecebimentosNotasRefugo(this.state.item['infe_numero_nf'], this.state.item['infe_serie_nf'], this.state.item['pes_codigo'], this.state.item['infe_codigo']);
                        this.props.navigation.navigate('ReceivementRefugoScreen', {item: this.state.item, data: data, pes_codigo: pes_codigo});
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
                                                <Contexts.User.UserContext.Consumer>
                                                    {(user) => (
                                                        <View 
                                                            style={{
                                                                flex: 1,
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                            }}
                                                        >
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
                                                                            onPress={() => this.verificaFinalInspecao(recebimentosNotasChecklist, recebimentosNotasItem.functions, refugo, user.user.pes_codigo)}
                                                                        />
                                                                    </View>
                                                                )}
                                                            />
                                                        </View>
                                                    )}
                                                </Contexts.User.UserContext.Consumer>
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