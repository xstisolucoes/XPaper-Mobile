import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Molecules } from '_components';
import { ListInspectionsScreen, VehicleInspectionDetailScreen, VehicleInspectionAssinatureScreen } from '_scenes/vehicle_inspection';
import { Contexts } from '_services';

const VehicleInspection = createNativeStackNavigator();

class VehicleInspectionStack extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeFilter: null,
			activeScreen: null,
			filters     : {
				ListInspectionsScreen: Contexts.InspecoesVeiculares.DEFAULT_FILTERS,
			},
		}

		this._filterDrawer = React.createRef();
	}
	
	render() {
		return (
			<Contexts.InspecoesVeiculares.InspecoesVeicularesContext.Consumer>
                {(inspecoesVeiculares) => (
					<Molecules.FilterDrawer ref={this._filterDrawer} filterProps={this.state.activeFilter}>
						<VehicleInspection.Navigator
							initialRouteName={'ListInspectionsScreen'}
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
										ListInspectionsScreen: inspecoesVeiculares.functions.updateInspecoesVeiculares
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
							<VehicleInspection.Screen
								name={'ListInspectionsScreen'}
								options={{
									title       : "Inspeções Veiculares",
									filterDrawer: this._filterDrawer,
									orientation : 'all',
								}}
							>
								{(props) => <ListInspectionsScreen {...{...props, ...{stack: this}}} />}
							</VehicleInspection.Screen>
							<VehicleInspection.Screen
								name={'VehicleInspectionDetailScreen'}
								options={{
									title       : "Inspeção Veicular",
									filterDrawer: this._filterDrawer,
									orientation : 'all',
								}}
							>
								{(props) => <VehicleInspectionDetailScreen {...{...props, ...{stack: this}}} />}
							</VehicleInspection.Screen>
							<VehicleInspection.Screen
								name={'VehicleInspectionAssinatureScreen'}
								options={{
									filterDrawer: this._filterDrawer,
									orientation : 'landscape',
									headerShown : false,
									header: {
										left: false,
									}
								}}
							>
								{(props) => <VehicleInspectionAssinatureScreen {...{...props, ...{stack: this}}} />}
							</VehicleInspection.Screen>
						</VehicleInspection.Navigator>
					</Molecules.FilterDrawer>
				)}
			</Contexts.InspecoesVeiculares.InspecoesVeicularesContext.Consumer>
		);
	}
}

export default VehicleInspectionStack;
export { VehicleInspection };