import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Molecules } from '_components';
import { HomeScreen, ConfigurationsScreen, LoginScreen, UserProfileScreen } from '_scenes/home';
import { Contexts } from '_services';

const Home = createNativeStackNavigator();

class HomeStack extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeFilter: null,
			filters     : {
			},
		}

		this._filterDrawer = React.createRef();
	}
	
	render() {
		return (
			<Contexts.User.UserContext.Consumer>
				{({ isLogged, functions }) => (
					<Molecules.FilterDrawer ref={this._filterDrawer} filterProps={this.state.activeFilter}>
						<Home.Navigator
							initialRouteName={'HomeScreen'}
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
									let screenName   = data.state.routes[data.state.index].name;
									let filterParams = this.state.filters[screenName] ?? null;

									this.setState({
										activeFilter: filterParams,
									});
								}
							}}
						>
							<Home.Screen
								name={'HomeScreen'}
								options={{
									header      : (props) => (
										<Molecules.HeaderNavigation {...props} showLogo={true} showUser={true} navigationControl={this.props.navigation} />
									),
									title       : "XPaper",
									filterDrawer: this._filterDrawer,
									orientation : 'all',
								}}
							>
								{(props) => <HomeScreen {...{...props, ...{stack: this}}} />}
							</Home.Screen>
							<Home.Screen
								name={'ConfigurationsScreen'}
								options={{
									title       : "Configurações",
									filterDrawer: this._filterDrawer,
									orientation : 'all',
								}}
							>
								{(props) => <ConfigurationsScreen {...{...props, ...{stack: this}}} />}
							</Home.Screen>
							{isLogged == true ?
								<Home.Screen
									name={'UserProfileScreen'}
									options={{
										title       : "Perfil",
										filterDrawer: this._filterDrawer,
										orientation : 'all',
									}}
								>
									{(props) => <UserProfileScreen {...{...props, ...{stack: this}}} />}
								</Home.Screen>
							:
								<Home.Screen
									name={'LoginScreen'}
									options={{
										title       : "Entrar",
										filterDrawer: this._filterDrawer,
										orientation : 'all',
									}}
								>
									{(props) => <LoginScreen {...{...props, ...{stack: this, functions: functions}}} />}
								</Home.Screen>}
						</Home.Navigator>
					</Molecules.FilterDrawer>
				)}
			</Contexts.User.UserContext.Consumer>
		);
	}
}

export default HomeStack;
export { Home };