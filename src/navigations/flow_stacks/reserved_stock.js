import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Molecules } from '_components';
import { ListReservedsScreen, ReservedStockDetailScreen, RemoveStockAddressScreen, ProductLotesScreen } from '_scenes/reserved_stock';
import { Contexts } from '_services';

const ReservedStock = createNativeStackNavigator();

class ReservedStockStack extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeFilter: null,
			activeScreen: null,
			filters     : {
				ListReservedsScreen: Contexts.EstoqueReservado.DEFAULT_FILTERS,
			},
		}

		this._filterDrawer = React.createRef();
	}
	
	render() {
		return (
			<Contexts.EstoqueReservado.EstoqueReservadoContext.Consumer>
                {(estoqueReservado) => (
					<Molecules.FilterDrawer ref={this._filterDrawer} filterProps={this.state.activeFilter}>
						<ReservedStock.Navigator
							initialRouteName={'ListReservedsScreen'}
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
										ListReservedsScreen: estoqueReservado.functions.updateEstoqueReservado
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
							<ReservedStock.Screen
								name={'ListReservedsScreen'}
								options={{
									title       : "Reservas de Estoque",
									filterDrawer: this._filterDrawer,
									orientation : 'all',
								}}
							>
								{(props) => <ListReservedsScreen {...{...props, ...{stack: this}}} />}
							</ReservedStock.Screen>
							<ReservedStock.Screen
								name={'ReservedStockDetailScreen'}
								options={{
									title       : "Estoque Reservado",
									filterDrawer: this._filterDrawer,
									orientation : 'all',
								}}
							>
								{(props) => <ReservedStockDetailScreen {...{...props, ...{stack: this}}} />}
							</ReservedStock.Screen>
							<ReservedStock.Screen
								name={'RemoveStockAddressScreen'}
								options={{
									title       : "Endereços do Estoque",
									filterDrawer: this._filterDrawer,
									orientation : 'all',
								}}
							>
								{(props) => <RemoveStockAddressScreen {...{...props, ...{stack: this}}} />}
							</ReservedStock.Screen>
							<ReservedStock.Screen
								name={'ProductLotesScreen'}
								options={{
									title       : "Lotes do Fornecedor",
									filterDrawer: this._filterDrawer,
									orientation : 'all',
								}}
							>
								{(props) => <ProductLotesScreen {...{...props, ...{stack: this}}} />}
							</ReservedStock.Screen>
						</ReservedStock.Navigator>
					</Molecules.FilterDrawer>
				)}
			</Contexts.EstoqueReservado.EstoqueReservadoContext.Consumer>
		);
	}
}

export default ReservedStockStack;
export { ReservedStock };