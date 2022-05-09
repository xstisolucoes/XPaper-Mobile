import * as React from 'react';
import { View } from 'react-native';
import { Atoms, Molecules } from '_components';
import * as Icons from '_assets/icons';
import { Contexts } from '_services';

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
        };
    }

    formatData(data) {
        let formatted = [];

        data.forEach((object) => {
            if (object !== null) {
                formatted.push(object);
            }
        });

        return formatted;
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
                    <Contexts.User.UserContext.Consumer>
                        {(user) => (
                            <Contexts.RecebimentosNotas.RecebimentosNotasContext.Consumer>
                                {(recebimentoNotas) => (
                                    <Contexts.Solicitacoes.SolicitacoesContext.Consumer>
                                        {(maintenances) => (
                                            <Contexts.EstoqueReservado.EstoqueReservadoContext.Consumer>
                                                {(estoqueReservado) => (
                                                    <Contexts.InspecoesVeiculares.InspecoesVeicularesContext.Consumer>
                                                        {(inspecoesVeiculares) => (
                                                            <Molecules.MenuList 
                                                                refreshing={this.state.refreshing}
                                                                onRefresh={() => {
                                                                    user.functions.updateUser();
                                                                }}
                                                                data={this.formatData([
                                                                    (user.isLogged && (user.user['usu_permissoes']).includes('mobile.modulo_recebimento')) ? {
                                                                        key: "module_receivement",
                                                                        name: "Recebimento",
                                                                        onPress: async () => {
                                                                            await this.setState({refreshing: true});
                                                                            await recebimentoNotas.functions.updateRecebimentosNotas(recebimentoNotas.defaultFilters);
                                                                            await this.setState({refreshing: false});
                                                                            this.props.navigation.navigate('Receivement');
                                                                        },
                                                                        icon: () => (<Icons.Receivement color={'#FFFFFF'} size={36} />),
                                                                    } : null,
                                                                    (user.isLogged && (user.user['usu_permissoes']).includes('mobile.modulo_manutencao')) ? {
                                                                        key: "module_maintenance",
                                                                        name: "Manutenção",
                                                                        onPress: async () => {
                                                                            await this.setState({refreshing: true});
                                                                            await maintenances.functions.updateSolicitacoes(maintenances.defaultFilters);
                                                                            await this.setState({refreshing: false});
                                                                            this.props.navigation.navigate('Maintenance');
                                                                        },
                                                                        icon: () => (<Icons.Maintenance color={'#FFFFFF'} size={36} />),
                                                                    } : null,
                                                                    (user.isLogged && (user.user['usu_permissoes']).includes('mobile.modulo_inspecao_veicular')) ? {
                                                                        key: "module_vehicle_inspection",
                                                                        name: "Inspeção Veicular",
                                                                        onPress: async () => {
                                                                            await this.setState({refreshing: true});
                                                                            await inspecoesVeiculares.functions.updateInspecoesVeiculares(inspecoesVeiculares.defaultFilters);
                                                                            await this.setState({refreshing: false});
                                                                            this.props.navigation.navigate('VehicleInspection');
                                                                        },
                                                                        icon: () => (<Icons.Inspection color={'#FFFFFF'} size={36} />),
                                                                    } : null,
                                                                    (user.isLogged && (user.user['usu_permissoes']).includes('mobile.modulo_estoque_reservado')) ? {
                                                                        key: "module_reserved_stock",
                                                                        name: "Estoque Reservado",
                                                                        onPress: async () => {
                                                                            await this.setState({refreshing: true});
                                                                            await estoqueReservado.functions.updateEstoqueReservado(estoqueReservado.defaultFilters);
                                                                            await this.setState({refreshing: false});
                                                                            this.props.navigation.navigate('ReservedStock');
                                                                        },
                                                                        icon: () => (<Icons.Stock color={'#FFFFFF'} size={36} />),
                                                                    } : null,
                                                                ])}
                                                            />
                                                        )}
                                                    </Contexts.InspecoesVeiculares.InspecoesVeicularesContext.Consumer>
                                                )}
                                            </Contexts.EstoqueReservado.EstoqueReservadoContext.Consumer>
                                        )}
                                    </Contexts.Solicitacoes.SolicitacoesContext.Consumer>
                                )}
                            </Contexts.RecebimentosNotas.RecebimentosNotasContext.Consumer>
                        )}
                    </Contexts.User.UserContext.Consumer>
                </View>
            </Atoms.NavigationScroll>
        );
    }
}

export default HomeScreen;