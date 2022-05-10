import * as React from 'react';
import { FlatList, Text, View } from 'react-native';
import { Atoms } from '_components';
import { Global, Contexts } from '_services';
import { Typography } from '_styles';

const ListMaintenanceItem = (props) => {
    return (
        <Atoms.DefaultCard
            style={{
                marginHorizontal: 8,
                marginVertical: 4,
            }}
            android_ripple={{
                color: props.components.list_maintenance_item.rippleColor
            }}
            onPress={() => {
                props.navigation.navigate('MaintenanceDetailScreen', {item: props.item});
            }}
        >
            <Text style={[{fontSize: 18, color: props.theme.defaultTextColor}, Typography.DEFAULT_FONT_BOLD]}>{props.item['sol_maquina']}</Text>
            <Text>
                <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_BOLD]}>Solicitante: </Text>
                <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_REGULAR]}>{props.item['pes_razao']}</Text>
            </Text>
            <Text>
                <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_BOLD]}>Data de Solicitação: </Text>
                <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_REGULAR]}>{props.item['sol_data_solicitacao']}</Text>
            </Text>
            <Text>
                <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_BOLD]}>Status: </Text>
                <Text
                    style={[
                        {
                            fontSize: 14,
                            color: props.item['sol_status'] == 'Aberto' ? props.theme.waiting : props.theme.success,
                        },
                        Typography.SECONDARY_FONT_BOLD
                    ]}
                >
                    {props.item['sol_status']}
                </Text>
            </Text>
            <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_REGULAR]}>{props.item['sol_descricao_solicitacao']}</Text>
        </Atoms.DefaultCard>
    );
}

class ListMaintenancesScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
            connected : true,
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
                            <Contexts.Solicitacoes.SolicitacoesContext.Consumer>
                                {({ solicitacoes, functions }) => (
                                    <FlatList
                                        style={{
                                            width: '100%',
                                        }}
                                        data={this.state.connected == false ? [] : solicitacoes}
                                        renderItem={(object) => (
                                            <ListMaintenanceItem item={object.item} navigation={this.props.navigation} theme={theme} components={components} />
                                        )}
                                        onRefresh={async () => {
                                            await this.setState({
                                                refreshing: true,
                                            });

                                            let connected = await Global.checkInternetConnection();
                                            if (connected) {
                                                await functions.updateSolicitacoes(null);
                                            }
                                            await this.setState({
                                                refreshing: false,
                                                connected : connected,
                                            });
                                        }}
                                        ListFooterComponent={() => (
                                            this.state.connected == false ? <Atoms.Errors.NoConnection /> :
                                            solicitacoes.length == 0 ? <Atoms.Errors.NoItens /> : null
                                        )}
                                        refreshing={this.state.refreshing}
                                        keyExtractor={(item) => item.key}
                                    />
                                )}
                            </Contexts.Solicitacoes.SolicitacoesContext.Consumer>
                        )}
                    </Contexts.Theme.ThemeContext.Consumer>
                </View>
            </Atoms.NavigationScroll>
        );
    }
}

export default ListMaintenancesScreen;