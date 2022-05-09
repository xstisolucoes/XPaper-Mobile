import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Contexts } from '_services';
import { HomeStack, MaintenanceStack, ReceivementStack, ReservedStockStack, VehicleInspectionStack } from './flow_stacks';

const Tab = createNativeStackNavigator();

class RootNavigator extends React.Component {
	
	constructor(props) {
		super(props);

		this.navigation = React.createRef(null);
		this.navigate = this.navigate.bind(this);
	}

	navigate(screen) {
		this.navigation.navigate(screen);
	}

	render() {
		return (
			<Contexts.Theme.ThemeContext.Consumer>
				{({ components }) => (
					<NavigationContainer
						ref={ref => this.navigation = ref}
					>
						<Tab.Navigator
							initialRouteName={'Home'}
							screenOptions={{
								tabBarActiveTintColor: components.navigation_bar.activeIconColor,
								tabBarInactiveTintColor: components.navigation_bar.inactiveIconColor,
								tabBarActiveBackgroundColor: components.navigation_bar.activeBackgroundColor,
								tabBarInactiveBackgroundColor: components.navigation_bar.inactiveBackgroundColor,
								headerShown: false,
							}}
						>
							<Tab.Screen 
								name="Home"
								component={HomeStack}
								options={{
									orientation: 'all',
								}}
							/>
							<Tab.Screen 
								name="Maintenance"
								component={MaintenanceStack}
								options={{
									orientation: 'all',
								}}
							/>
							<Tab.Screen 
								name="Receivement"
								component={ReceivementStack}
								options={{
									orientation: 'all',
								}}
							/>
							<Tab.Screen 
								name="ReservedStock"
								component={ReservedStockStack}
								options={{
									orientation: 'all',
								}}
							/>
							<Tab.Screen 
								name="VehicleInspection"
								component={VehicleInspectionStack}
								options={{
									orientation: 'all',
								}}
							/>
						</Tab.Navigator>
					</NavigationContainer>
				)}
			</Contexts.Theme.ThemeContext.Consumer>
		);
	}
}

export default RootNavigator;