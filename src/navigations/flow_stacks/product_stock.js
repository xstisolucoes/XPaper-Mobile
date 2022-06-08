import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Molecules } from '_components';
import { Contexts } from '_services';
import {
    ListProductStockScreen,
    ProductStockDetailScreen,
    AddStockAddressScreen,
    RemoveStockAddressScreen
} from '_scenes/product_stock';

const ProductStock = createNativeStackNavigator();

class ProductStockStack extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeFilter: null,
			activeScreen: null,
			filters     : {
				ListProductStockScreen: Contexts.EstoqueProdutos.DEFAULT_FILTERS,
			},
		}

		this._filterDrawer = React.createRef();
	}
	
	render() {
		return (
			<Contexts.EstoqueProdutos.EstoqueProdutosContext.Consumer>
                {(estoqueProdutos) => (
                    <Molecules.FilterDrawer ref={this._filterDrawer} filterProps={this.state.activeFilter}>
                        <ProductStock.Navigator
                            initialRouteName={'ListProductStockScreen'}
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
                                        ListProductStockScreen: estoqueProdutos.functions.updateEstoqueProdutos,
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
                            <ProductStock.Screen
                                name={'ListProductStockScreen'}
                                options={{
                                    title       : "Produtos no Estoque",
                                    filterDrawer: this._filterDrawer,
                                    orientation : 'all',
                                }}
                            >
                                {(props) => <ListProductStockScreen {...{...props, ...{stack: this}}} />}
                            </ProductStock.Screen>
                            <ProductStock.Screen
                                name={'ProductStockDetailScreen'}
                                options={{
                                    title       : "Produto",
                                    filterDrawer: this._filterDrawer,
                                    orientation : 'all',
                                }}
                            >
                                {(props) => <ProductStockDetailScreen {...{...props, ...{stack: this}}} />}
                            </ProductStock.Screen>
                            <ProductStock.Screen
                                name={'AddStockAddressScreen'}
                                options={{
                                    title       : "Endereços no Estoque",
                                    filterDrawer: this._filterDrawer,
                                    orientation : 'all',
                                }}
                            >
                                {(props) => <AddStockAddressScreen {...{...props, ...{stack: this}}} />}
                            </ProductStock.Screen>
                            <ProductStock.Screen
                                name={'RemoveStockAddressScreen'}
                                options={{
                                    title       : "Endereços no Estoque",
                                    filterDrawer: this._filterDrawer,
                                    orientation : 'all',
                                }}
                            >
                                {(props) => <RemoveStockAddressScreen {...{...props, ...{stack: this}}} />}
                            </ProductStock.Screen>
                        </ProductStock.Navigator>
                    </Molecules.FilterDrawer>
				)}
			</Contexts.EstoqueProdutos.EstoqueProdutosContext.Consumer>
		);
	}
}

export default ProductStockStack;
export { ProductStock };