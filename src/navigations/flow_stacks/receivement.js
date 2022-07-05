import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Molecules } from '_components';
import { ListReceivementsScreen, ListReceivementItensScreen, ReceivementChecklistScreen, ReceivementRefugoScreen, AddStockAddressScreen, ReceivementSubquestionsScreen } from '_scenes/receivement';
import { Contexts } from '_services';
import { Alert } from 'react-native';

const Receivement = createNativeStackNavigator();

class ReceivementStack extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeFilter: null,
			activeScreen: null,
			filters     : {
				ListReceivementsScreen: Contexts.RecebimentosNotas.DEFAULT_FILTERS,
			},
		}

		this._filterDrawer = React.createRef();
	}
	
	render() {
		return (
			<Contexts.RecebimentosNotas.RecebimentosNotasContext.Consumer>
            	{(recebimentoNotas) => (
					<Molecules.FilterDrawer ref={this._filterDrawer} filterProps={this.state.activeFilter}>
						<Receivement.Navigator
							initialRouteName={'ListReceivementsScreen'}
							screenOptions={{
								contentStyle: {
									width: '100%',
									
								},
								header: (props) => (
									<Molecules.HeaderNavigation {...props} showBackButton={true} filter={this.state.activeFilter} navigationControl={this.props.navigation} />
								),
							}}
							screenListeners={{
								state: ({ data }) => {
									let functions = {
										ListReceivementsScreen: recebimentoNotas.functions.updateRecebimentosNotas
									};

									let screenName = data.state.routes[data.state.index].name;
									
									if (this.state.activeScreen !== screenName) {
										let filterParams = this.state.filters[screenName] ?? null;
										let updateFunction = functions[screenName] ?? null;

										this.setState({
											activeScreen: screenName,
											activeFilter: filterParams,
											filterFunction: updateFunction,
										});
										
										this._filterDrawer.current.setActiveFilter(updateFunction);
									}
								}
							}}
						>
							<Receivement.Screen
								name={'ListReceivementsScreen'}
								options={{
									title       : "Recebimentos",
									filterDrawer: this._filterDrawer,
									orientation : 'all',
								}}
							>
								{(props) => <ListReceivementsScreen {...{...props, ...{stack: this}}} />}
							</Receivement.Screen>
							<Receivement.Screen
								name={'ListReceivementItensScreen'}
								options={{
									title       : "Itens da Nota Fiscal",
									filterDrawer: this._filterDrawer,
									orientation : 'all',
									header: (props) => (
										<Contexts.RecebimentosNotas.RecebimentosNotasContext.Consumer>
											{({ functions, activeNote }) => (
												<Contexts.RecebimentosNotasItens.RecebimentosNotasItensContext.Consumer>
													{({ recebimentosNotasItens }) => (
														<Molecules.HeaderNavigation
															{...props}
															showBackButton={true}
															navigationControl={this.props.navigation}
															check={activeNote['nfe_inspecao_status'] == 'Não Inspecionado' ? () => {
																let allInspected = true;

																recebimentosNotasItens.forEach((object) => {
																	if (!(['Conforme', 'Não Conforme'].includes(object.infe_aprovado))) {
																		allInspected = false;
																	}
																});

																if (allInspected) {
																	Alert.alert(
																		'Confirmação',
																		'Deseja atender a inspeção de recebimento?',
																		[
																			{
																				text: 'Cancelar',
																				style: 'cancel',
																			},
																			{
																				text: 'Confirmar',
																				onPress: async () => {
																					functions.concludeNote()
																					props.navigation.pop(1);
																				}
																			}
																		],
																	);
																} else {
																	Alert.alert(
																		'Erro',
																		'Inspecione todos os itens da nota fiscal antes de atende-la.',
																		[
																			{
																				text: 'Ok',
																			}
																		],
																	);
																}
															} : null}
														/>
													)}
												</Contexts.RecebimentosNotasItens.RecebimentosNotasItensContext.Consumer>
											)}
										</Contexts.RecebimentosNotas.RecebimentosNotasContext.Consumer>
									),
								}}
							>
								{(props) => <ListReceivementItensScreen {...{...props, ...{stack: this}}} />}
							</Receivement.Screen>
							<Receivement.Screen
								name={'ReceivementChecklistScreen'}
								options={{
									title       : "Checklist de Inspeção",
									filterDrawer: this._filterDrawer,
									orientation : 'all',
								}}
							>
								{(props) => <ReceivementChecklistScreen {...{...props, ...{stack: this}}} />}
							</Receivement.Screen>
							<Receivement.Screen
								name={'ReceivementSubquestionsScreen'}
								options={{
									title       : "Detalhes",
									filterDrawer: this._filterDrawer,
									orientation : 'all',
								}}
							>
								{(props) => <ReceivementSubquestionsScreen {...{...props, ...{stack: this}}} />}
							</Receivement.Screen>
							<Receivement.Screen
								name={'ReceivementRefugoScreen'}
								options={{
									title       : "Refugo",
									filterDrawer: this._filterDrawer,
									orientation : 'all',
								}}
							>
								{(props) => <ReceivementRefugoScreen {...{...props, ...{stack: this}}} />}
							</Receivement.Screen>
						</Receivement.Navigator>
					</Molecules.FilterDrawer>
				)}
			</Contexts.RecebimentosNotas.RecebimentosNotasContext.Consumer>
		);
	}
}

export default ReceivementStack;
export { Receivement };