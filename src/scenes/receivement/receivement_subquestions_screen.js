import * as React from 'react';
import { Alert, View } from 'react-native';
import { Atoms, Molecules } from '_components';
import { Global } from '_services';
import { Contexts } from '_services';

class ReceivementSubquestionsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            item    : this.props.route.params.item,
            setValue: this.props.route.params.setValue,
        };

        this._listItens = React.createRef();
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
                    <Contexts.RecebimentosNotasChecklist.RecebimentosNotasChecklistContext.Consumer>
                        {({ functions }) => (
                            <Molecules.CheckList 
                                ref={this._listItens}
                                fieldName={{
                                    codigo: 'SP_CODIGO',
                                    title: 'SP_DESCRICAO',
                                }}
                                keyExtractor={() => Global.generateRandomKey()}
                                data={this.state.item.sub_perguntas}
                                setValue={async (value) => {
                                    await functions.setSubquestionValue(this.state.item.p_codigo, value);
                                    let setValue = false;
                                    this.state.item.sub_perguntas.forEach((item) => {
                                        if (item.value == true) {
                                            setValue = true;
                                        }
                                    });

                                    if (setValue) {
                                        functions.setValue(this.state.item['p_codigo'], 2);
                                    } else {
                                        functions.setValue(this.state.item['p_codigo'], 0);
                                    }
                                }}
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
                                            title={'Voltar'}
                                            onPress={() => {
                                                this.props.navigation.pop();
                                            }}
                                        />
                                    </View>
                                )}
                            />
                        )}
                    </Contexts.RecebimentosNotasChecklist.RecebimentosNotasChecklistContext.Consumer>
                </View>
            </Atoms.NavigationScroll>
        );
    }
}

export default ReceivementSubquestionsScreen;