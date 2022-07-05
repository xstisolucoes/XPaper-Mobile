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
                            <Contexts.User.UserContext.Consumer>
                                {(user) => (
                                    <Contexts.RecebimentosNotasRefugo.RecebimentosNotasRefugoContext.Consumer>
                                        {({ recebimentosNotasRefugo, functions }) => (
                                            <Contexts.RecebimentosNotasItens.RecebimentosNotasItensContext.Consumer>
                                                {(recebimentosNotasItem) => (
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
                                                                    onPress={async () => {
                                                                        let checklist = [];
                                                                        this.state.data.forEach((object) => {
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
                                                                        let refugo = [];
                                                                        recebimentosNotasRefugo.forEach((object) => {
                                                                            refugo.push({mo_codigo: object.mo_codigo, infer_quantidade: object.infer_quantidade});
                                                                        });
                                                                        await this.setState({
                                                                            refreshing: true,
                                                                        });
                                                                        await recebimentosNotasItem.functions.saveInspecaoRecebimento(
                                                                            this.state.item.infe_numero_nf,
                                                                            this.state.item.infe_serie_nf,
                                                                            this.state.item.pes_codigo,
                                                                            this.state.item.infe_codigo,
                                                                            this.state.item.pc_codigo,
                                                                            user.user.pes_codigo,
                                                                            checklist,
                                                                            refugo, 
                                                                            0);
                                                                        await recebimentosNotasItem.functions.updateRecebimentosNotasItens(this.state.item.infe_numero_nf);
                                                                        await this.setState({
                                                                            refreshing: false,
                                                                        });
                                                                        this.props.navigation.pop(2);
                                                                    }}
                                                                />
                                                            </View>
                                                        )}
                                                    />
                                                )}
                                            </Contexts.RecebimentosNotasItens.RecebimentosNotasItensContext.Consumer>
                                        )}
                                    </Contexts.RecebimentosNotasRefugo.RecebimentosNotasRefugoContext.Consumer>
                                )}
                            </Contexts.User.UserContext.Consumer>
                        )}
                    </Contexts.Theme.ThemeContext.Consumer>
                </View>
            </Atoms.NavigationScroll>
        );
    }
}

export default ReceivementRefugoScreen;