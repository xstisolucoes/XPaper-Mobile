import * as React from 'react';
import { FlatList, Text, View } from 'react-native';
import { Atoms } from '_components';
import { Contexts } from '_services';
import { Typography } from '_styles';

const ListInspectionsItem = (props) => {
    return (
        <Contexts.InspecoesVeicularesNotas.InspecoesVeicularesNotasContext.Consumer>
            {(inspecoesVeicularesNotas) => (
                <Contexts.InspecoesVeicularesChecklist.InspecoesVeicularesChecklistContext.Consumer>
                    {(inspecoesVeicularesChecklist) => (
                        <Atoms.DefaultCard
                            style={{
                                marginHorizontal: 8,
                                marginVertical: 4,
                            }}
                            android_ripple={{
                                color: props.components.list_maintenance_item.rippleColor
                            }}
                            onPress={async () => {
                                await inspecoesVeicularesNotas.functions.updateInspecoesVeicularesNotas(props.item['iv_codigo']);
                                await inspecoesVeicularesChecklist.functions.updateInspecoesVeicularesChecklist(props.item['iv_codigo']);
                                
                                props.navigation.navigate('VehicleInspectionDetailScreen', {item: props.item});
                            }}
                        >
                            <Text style={[{fontSize: 18, color: props.theme.defaultTextColor}, Typography.DEFAULT_FONT_BOLD]}>{props.item['iv_caminhao_placa'] == "" ? props.item['iv_carreta_placa'] : props.item['iv_caminhao_placa']} - {props.item['iv_motorista_razao']}</Text>
                            <Text>
                                <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_BOLD]}>Transportadora: </Text>
                                <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_REGULAR]}>{props.item['iv_transportadora_razao']}</Text>
                            </Text>
                            <Text>
                                <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_BOLD]}>Data de Cadastro: </Text>
                                <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_REGULAR]}>{props.item['iv_data_cadastro']}</Text>
                            </Text>
                            <Text>
                                <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_BOLD]}>Status: </Text>
                                <Text
                                    style={[
                                        {
                                            fontSize: 14,
                                            color: props.item['iv_status'] == 'Aprovado' ? props.theme.success : props.item['iv_status'] == 'Reprovado' ? props.theme.error : props.theme.waiting,
                                        },
                                        Typography.SECONDARY_FONT_BOLD
                                    ]}
                                >
                                    {props.item['iv_status']}
                                </Text>
                            </Text>
                        </Atoms.DefaultCard>
                    )}
                </Contexts.InspecoesVeicularesChecklist.InspecoesVeicularesChecklistContext.Consumer>
            )}
        </Contexts.InspecoesVeicularesNotas.InspecoesVeicularesNotasContext.Consumer>
    );
}

class ListInspectionsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
                    }}
                >
                    <Contexts.Theme.ThemeContext.Consumer>
				        {({ theme, components }) => (
                            <Contexts.InspecoesVeiculares.InspecoesVeicularesContext.Consumer>
                                {({ inspecoesVeiculares, functions }) => (
                                    <FlatList
                                        style={{
                                            width: '100%',
                                        }}
                                        data={inspecoesVeiculares}
                                        renderItem={(object) => (
                                            <ListInspectionsItem item={object.item} navigation={this.props.navigation} theme={theme} components={components} />
                                        )}
                                        /*onRefresh={async () => {
                                            this.setState({refreshing: true});
                                            await functions.updateInspecoesVeiculares(filters);
                                            this.setState({refreshing: false});
                                        }}*/
                                        refreshing={this.state.refreshing}
                                        keyExtractor={(item) => item.key}
                                    />
                                )}
                            </Contexts.InspecoesVeiculares.InspecoesVeicularesContext.Consumer>
                        )}
                    </Contexts.Theme.ThemeContext.Consumer>
                </View>
            </Atoms.NavigationScroll>
        );
    }
}

export default ListInspectionsScreen;
