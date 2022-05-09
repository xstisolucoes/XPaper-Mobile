import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Molecules } from '_components';
import { ListMaintenancesScreen, MaintenanceDetailScreen } from '_scenes/maintenance';
import { Contexts } from '_services';

const Maintenance = createNativeStackNavigator();

class MaintenanceStack extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeFilter: null,
			activeScreen: null,
			filters     : {
				ListMaintenancesScreen: Contexts.Solicitacoes.DEFAULT_FILTERS,
			},
		}

		this._filterDrawer = React.createRef();
	}
	
	render() {
		return (
			<Contexts.Solicitacoes.SolicitacoesContext.Consumer>
                {(solicitacoes) => (
					<Molecules.FilterDrawer ref={this._filterDrawer} filterProps={this.state.activeFilter}>
						<Maintenance.Navigator
							initialRouteName={'ListMaintenancesScreen'}
							screenOptions={{
								contentStyle: {
									width: '100%',
								},
								header: (props) => (
									<Molecules.HeaderNavigation {...props} showBackButton={true} filter={this.state.activeFilter} navigationControl={this.props.navigation} />
								),
							}}
							screenListeners={{
								state: async ({ data }) => {
									let functions = {
										ListMaintenancesScreen: solicitacoes.functions.updateSolicitacoes
									};

									let screenName = data.state.routes[data.state.index].name;
									
									if (this.state.activeScreen !== screenName) {
										let filterParams = this.state.filters[screenName] ?? null;
										let updateFunction = functions[screenName] ?? null;

										await this.setState({
											activeScreen: screenName,
											activeFilter: filterParams,
											filterFunction: updateFunction,
										});
										
										this._filterDrawer.current.setActiveFilter(updateFunction);
									}
								}
							}}
						>
							<Maintenance.Screen
								name={'ListMaintenancesScreen'}
								options={{
									title       : "Manutenções",
									filterDrawer: this._filterDrawer,
									orientation : 'all',
								}}
							>
								{(props) => <ListMaintenancesScreen {...{...props, ...{stack: this}}} />}
							</Maintenance.Screen>
							<Maintenance.Screen
								name={'MaintenanceDetailScreen'}
								options={{
									title       : "Manutenção",
									filterDrawer: this._filterDrawer,
									orientation : 'all',
								}}
							>
								{(props) => <MaintenanceDetailScreen {...{...props, ...{stack: this}}} />}
							</Maintenance.Screen>
						</Maintenance.Navigator>
					</Molecules.FilterDrawer>
				)}
			</Contexts.Solicitacoes.SolicitacoesContext.Consumer>
		);
	}
}

export default MaintenanceStack;
export { Maintenance };