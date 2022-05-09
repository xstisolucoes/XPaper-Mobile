import * as React from 'react';
import { FlatList, Text, View } from 'react-native';
import { Atoms } from '_components';
import { Contexts, Global } from '_services';
import { Typography } from '_styles';

const ListReservedsItem = (props) => {
    return (
        <Atoms.DefaultCard
            style={{
                marginHorizontal: 8,
                marginVertical: 4,
            }}
            android_ripple={{
                color: props.components.list_maintenance_item.rippleColor
            }}
            onPress={async () => {
                props.navigation.navigate('ReservedStockDetailScreen', {item: props.item});
            }}
        >
            <Text style={[{fontSize: 18, color: props.theme.defaultTextColor}, Typography.DEFAULT_FONT_BOLD]}>{props.item['referencia']}</Text>
            <Text>
                <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_BOLD]}>Medidas: </Text>
                <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_REGULAR]}>{props.item['pc_medidas']}</Text>
            </Text>
            <Text>
                <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_BOLD]}>Composição: </Text>
                <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_REGULAR]}>{props.item['compos_descricao']}</Text>
            </Text>
            <Text>
                <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_BOLD]}>Quantidade: </Text>
                <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_REGULAR]}>{Global.formatPoints(props.item['ser_quantidade'])}</Text>
            </Text>
            <Text>
                <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_BOLD]}>Situação: </Text>
                <Text
                    style={[
                        {
                            fontSize: 14,
                            color: props.item['ser_status'] == 'Solicitado' ? props.theme.waiting : props.item['ser_status'] == 'Separado' ? props.theme.inProgress : props.item['ser_status'] == 'Transbordo' ? props.theme.warning : props.theme.success,
                        },
                        Typography.SECONDARY_FONT_BOLD
                    ]}
                >
                    {props.item['ser_status']}
                </Text>
            </Text>
        </Atoms.DefaultCard>
    );
}

class ListReservedsScreen extends React.Component {
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
                            <Contexts.EstoqueReservado.EstoqueReservadoContext.Consumer>
                                {({ estoqueReservado, functions }) => (
                                    <FlatList
                                        style={{
                                            width: '100%',
                                        }}
                                        data={estoqueReservado}
                                        renderItem={(object) => (
                                            <ListReservedsItem item={object.item} navigation={this.props.navigation} theme={theme} components={components} />
                                        )}
                                        onRefresh={async () => {
                                            /*this.setState({refreshing: true});
                                            await functions.updateEstoqueReservado(filters);
                                            this.setState({refreshing: false});*/
                                        }}
                                        refreshing={this.state.refreshing}
                                        keyExtractor={(item) => item.key}
                                    />
                                )}
                            </Contexts.EstoqueReservado.EstoqueReservadoContext.Consumer>
                        )}
                    </Contexts.Theme.ThemeContext.Consumer>
                </View>
            </Atoms.NavigationScroll>
        );
    }
}

export default ListReservedsScreen;