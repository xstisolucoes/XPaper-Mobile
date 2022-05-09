import * as React from 'react';
import { View, Alert, FlatList, Text } from 'react-native';
import { Atoms } from '_components';
import { Contexts, Functions } from '_services';
import { Typography } from '_styles';

const VehicleInspectionNotaItem = (props) => {
    return (
        <Atoms.DefaultCard
            style={{
                marginVertical: 5,
            }}
        >
            <Text style={[{fontSize: 18, color: props.theme.defaultTextColor}, Typography.DEFAULT_FONT_BOLD]}>Nota Fiscal {props.item['nfs_codigo']}</Text>
            <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_REGULAR]}>{props.item['nfs_cliente']}</Text>
        </Atoms.DefaultCard>
    );
}

class VehicleInspectionDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.route.params.item,
        }
        this._justificativa = React.createRef();
    }

    atenderSolicitacao(checklist) {
        Alert.alert(
            'Confirmação',
            'Qual a situação da inspeção veicular?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Reprovado',
                    onPress: async () => {
                        this.props.navigation.navigate('VehicleInspectionAssinatureScreen', {item: this.state.item, checklist: checklist, status: 'Reprovado'})
                    }
                },
                {
                    text: 'Aprovado',
                    onPress: async () => {
                        this.props.navigation.navigate('VehicleInspectionAssinatureScreen', {item: this.state.item, checklist: checklist, status: 'Aprovado'})
                    }
                },
            ],
        );
    }

    render() {
        return (
            <Atoms.NavigationScroll noScroll>
                <Contexts.Theme.ThemeContext.Consumer>
				    {({ theme }) => (
                        <Contexts.InspecoesVeicularesNotas.InspecoesVeicularesNotasContext.Consumer>
                            {({ inspecoesVeicularesNotas }) => (
                                <Contexts.InspecoesVeicularesChecklist.InspecoesVeicularesChecklistContext.Consumer>
                                    {({ inspecoesVeicularesChecklist, functions }) => (
                                        <View 
                                            style={{
                                                flex: 1,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <FlatList 
                                                ListHeaderComponent={() => (
                                                    <View style={{width: '100%', paddingHorizontal: 20}}>
                                                        <Text style={[Typography.DEFAULT_FONT_BOLD, {width: '100%', fontSize: 18, color: theme.defaultTextColor, marginVertical: 8,}]}>Detalhes da Solicitação de Inspeção</Text>
                                                        <Atoms.DefaultInput labelTitle={'Código'} multiline={true} disabled value={this.state.item['iv_codigo']} />
                                                        <Atoms.DefaultInput labelTitle={'Motorista'} multiline={true} disabled value={this.state.item['iv_motorista_razao']} />
                                                        <Atoms.DefaultInput labelTitle={'CNH'} multiline={true} disabled value={this.state.item['iv_motorista_cnh']} />
                                                        <Atoms.DefaultInput labelTitle={'Validade da CNH'} multiline={true} disabled value={this.state.item['iv_motorista_cnh_validade']} />
                                                        <Atoms.DefaultInput labelTitle={'Transportadora'} multiline={true} disabled value={this.state.item['iv_transportadora_razao']} />
                                                        <Atoms.DefaultInput labelTitle={'Placa'} multiline={true} disabled value={this.state.item['iv_caminhao_placa']} />
                                                        <Text style={[Typography.DEFAULT_FONT_BOLD, {width: '100%', fontSize: 18, color: theme.defaultTextColor, marginTop: 8}]}>Notas Fiscais</Text>
                                                        {inspecoesVeicularesNotas.map(object => {
                                                            return (<VehicleInspectionNotaItem item={object} navigation={this.props.navigation} theme={theme} key={object.key} />);
                                                        })}
                                                        <Text style={[Typography.DEFAULT_FONT_BOLD, {width: '100%', fontSize: 18, color: theme.defaultTextColor, marginTop: 8}]}>Inspeção do Veículo</Text>
                                                    </View>
                                                )}
                                                style={{
                                                    width: '100%',
                                                }}
                                                data={inspecoesVeicularesChecklist}
                                                renderItem={(object) => (
                                                    <Atoms.DefaultChecklist
                                                        title={object.item['ic_texto']}
                                                        type={object.item['ic_tipo']}
                                                        value={object.item['ivcl_valor']}
                                                        setValue={(valor) => {
                                                            functions.setValue(object.item['ic_codigo'], valor);
                                                        }}
                                                    />
                                                )}
                                                keyExtractor={(item) => item.key}
                                                ListFooterComponent={() => (
                                                    <View style={{width: '100%', marginVertical: 20}}>
                                                        {this.state.item['iv_status'] == 'Aberto' ? 
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
                                                                    onPress={() => {
                                                                        let result = true;

                                                                        inspecoesVeicularesChecklist.forEach((object) => {
                                                                            if (object['ivcl_valor'] == 0) {
                                                                                result = false;
                                                                            }
                                                                        });

                                                                        if (result) {
                                                                            this.atenderSolicitacao(inspecoesVeicularesChecklist);
                                                                        } else {
                                                                            Alert.alert(
                                                                                'Erro',
                                                                                'Preencha todos os items do checklist antes de finalizá-lo',
                                                                                [
                                                                                    {
                                                                                        text: 'OK',
                                                                                    }
                                                                                ],
                                                                            );
                                                                        }
                                                                    }}
                                                                />
                                                            </View>
                                                        : null}
                                                    </View>
                                                )}
                                            />
                                        </View>
                                    )}
                                </Contexts.InspecoesVeicularesChecklist.InspecoesVeicularesChecklistContext.Consumer>
                            )}
                        </Contexts.InspecoesVeicularesNotas.InspecoesVeicularesNotasContext.Consumer>
                    )}
                </Contexts.Theme.ThemeContext.Consumer>
            </Atoms.NavigationScroll>
        );
    }
}

export default VehicleInspectionDetailScreen;