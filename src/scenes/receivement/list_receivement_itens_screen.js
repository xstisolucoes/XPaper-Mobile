import * as React from 'react';
import { FlatList, Text, View } from 'react-native';
import { Atoms } from '_components';
import { Contexts } from '_services';
import { Typography } from '_styles';
import { Global } from '_services';

const ListReceivementItensItem = (props) => {
    return (
        <Contexts.RecebimentosNotasChecklist.RecebimentosNotasChecklistContext.Consumer>
            {({ functions }) => (
                <Atoms.DefaultCard
                    style={{
                        marginHorizontal: 8,
                        marginVertical: 4,
                    }}
                    android_ripple={{
                        color: props.components.list_maintenance_item.rippleColor
                    }}
                    onPress={async () => {
                        await functions.updateRecebimentosNotasChecklist(props.item.infe_numero_nf, props.item.infe_codigo)
                        props.navigation.navigate('ReceivementChecklistScreen', {item: props.item});
                    }}
                >
                    <Text style={[{fontSize: 18, color: props.theme.defaultTextColor}, Typography.DEFAULT_FONT_BOLD]}>Produto: {Global.numberWithPoints(props.item['pc_codigo'])}</Text>
                    <Text>
                        <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_BOLD]}>Descrição: </Text>
                        <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_REGULAR]}>{props.item['infe_descricao']}</Text>
                    </Text>
                    <Text>
                        <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_BOLD]}>Quantidade: </Text>
                        <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_REGULAR]}>{Global.formatPoints(props.item['infe_quantidade'])}</Text>
                    </Text>
                    <Text>
                        <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_BOLD]}>Situação: </Text>
                        <Text
                            style={[
                                {
                                    fontSize: 14,
                                    color: props.item['infe_aprovado'] == 'Conforme' ? props.theme.success : props.theme.error,
                                },
                                Typography.SECONDARY_FONT_BOLD
                            ]}
                        >
                            {props.item['infe_aprovado']}
                        </Text>
                    </Text>
                </Atoms.DefaultCard>
            )}
        </Contexts.RecebimentosNotasChecklist.RecebimentosNotasChecklistContext.Consumer>
    );
}

class ListReceivementItensScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
            item      : this.props.route.params.item,
        };

        this._listItens = React.createRef();
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
                            <Contexts.RecebimentosNotasItens.RecebimentosNotasItensContext.Consumer>
                                {({ recebimentosNotasItens, functions }) => (
                                    <FlatList
                                        style={{
                                            width: '100%',
                                        }}
                                        ref={this._listItens}
                                        data={recebimentosNotasItens}
                                        renderItem={(object) => (
                                            <ListReceivementItensItem item={object.item} navigation={this.props.navigation} theme={theme} components={components} />
                                        )}
                                        onRefresh={async () => {
                                            this.setState({refreshing: true});
                                            await functions.updateRecebimentosNotasItens(this.state.item['nfe_numero']);
                                            this.setState({refreshing: false});
                                        }}

                                        refreshing={this.state.refreshing}
                                        keyExtractor={(item) => item.key}
                                    />
                                )}
                            </Contexts.RecebimentosNotasItens.RecebimentosNotasItensContext.Consumer>
                        )}
                    </Contexts.Theme.ThemeContext.Consumer>
                </View>
            </Atoms.NavigationScroll>
        );
    }
}

export default ListReceivementItensScreen;