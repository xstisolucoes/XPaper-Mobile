import * as React from 'react';
import { View, Alert } from 'react-native';
import { Atoms } from '_components';
import { Functions } from '_services';

class MaintenanceDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.route.params.item,
        }
        this._justificativa = React.createRef();
    }

    atenderSolicitacao() {
        Alert.alert(
            'Confirmação',
            'Deseja atender a solicitação?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Confirmar',
                    onPress: async () => {
                        this.props.route.params.item['sol_justificativa'] = this._justificativa.current.getText();
                        let response = await Functions.Solicitacoes.atenderSolicitacao(this.props.route.params.item);
                        if (response.status == 200) {
                            this.props.navigation.goBack();
                        }
                    }
                }
            ],
        );
    }

    render() {
        return (
            <Atoms.NavigationScroll>
                <View 
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 20,
                    }}
                >
                    <Atoms.DefaultInput labelTitle={'Código'} multiline={true} disabled value={this.state.item['sol_codigo']} />
                    <Atoms.DefaultInput labelTitle={'Status'} multiline={true} disabled value={this.state.item['sol_status']} />
                    <Atoms.DefaultInput labelTitle={'Setor'} multiline={true} disabled value={this.state.item['set_descricao']} />
                    <Atoms.DefaultInput labelTitle={'Máquina'} multiline={true} disabled value={this.state.item['sol_maquina']} />
                    <Atoms.DefaultInput labelTitle={'Solicitante'} multiline={true} disabled value={this.state.item['pes_razao']} />
                    <Atoms.DefaultInput labelTitle={'Data de solicitação'} multiline={true} disabled value={this.state.item['sol_data_solicitacao']} />
                    <Atoms.DefaultInput labelTitle={'Descrição'} multiline={true} disabled value={this.state.item['sol_descricao_solicitacao']} />
                    <Atoms.DefaultInput labelTitle={'Resposta'} ref={this._justificativa} multiline={true} {...{disabled: this.state.item['sol_status'] == 'Aberto' ? undefined : true}} value={this.state.item['sol_justificativa']} />
                    {this.state.item['sol_status'] == 'Aberto' ? 
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
                                title={'Atender'}
                                onPress={() => this.atenderSolicitacao()}
                            />
                        </View>
                    : null}
                </View>
            </Atoms.NavigationScroll>
        );
    }
}

export default MaintenanceDetailScreen;