import * as React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { Atoms } from '_components';
import { Contexts, Global } from '_services';
import { Typography } from '_styles';

const ListReceivementItem = (props) => {
    return (
        <Contexts.RecebimentosNotas.RecebimentosNotasContext.Consumer>
            {(recebimentoNotas) => (
                <Contexts.RecebimentosNotasItens.RecebimentosNotasItensContext.Consumer>
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
                                recebimentoNotas.functions.selectNote(props.item);
                                await functions.updateRecebimentosNotasItens(props.item['nfe_numero']);
                                props.navigation.navigate('ListReceivementItensScreen', {item: props.item});
                            }}
                        >
                            <Text style={[{fontSize: 18, color: props.theme.defaultTextColor}, Typography.DEFAULT_FONT_BOLD]}>{props.item['pes_fantasia']}</Text>
                            <Text>
                                <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_BOLD]}>Nota Fiscal: </Text>
                                <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_REGULAR]}>{props.item['nfe_numero']}</Text>
                            </Text>
                            <Text>
                                <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_BOLD]}>Data de entrada: </Text>
                                <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_REGULAR]}>{props.item['nfe_data_entrada']}</Text>
                            </Text>
                            <Text>
                                <Text style={[{fontSize: 14, color: props.theme.defaultTextColor}, Typography.SECONDARY_FONT_BOLD]}>Status: </Text>
                                <Text
                                    style={[
                                        {
                                            fontSize: 14,
                                            color: props.item['nfe_inspecao_status'] == 'Não Inspecionado' ? props.theme.waiting : props.theme.success,
                                        },
                                        Typography.SECONDARY_FONT_BOLD
                                    ]}
                                >
                                    {props.item['nfe_inspecao_status']}
                                </Text>
                            </Text>
                        </Atoms.DefaultCard>
                    )}
                </Contexts.RecebimentosNotasItens.RecebimentosNotasItensContext.Consumer>
            )}
        </Contexts.RecebimentosNotas.RecebimentosNotasContext.Consumer>
    );
}

class ListReceivementsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
            connected : true,
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
                            <Contexts.RecebimentosNotas.RecebimentosNotasContext.Consumer>
                                {({ recebimentosNotas, functions }) => (
                                    <FlatList
                                        style={{
                                            width: '100%',
                                        }}
                                        data={this.state.connected == false ? [] : recebimentosNotas}
                                        renderItem={(object) => (
                                            <ListReceivementItem item={object.item} navigation={this.props.navigation} theme={theme} components={components} />
                                        )}
                                        onRefresh={async () => {
                                            await this.setState({
                                                refreshing: true,
                                            });
                                            
                                            let connected = await Global.checkInternetConnection();
                                            if (connected) {
                                                await functions.updateRecebimentosNotas(null);
                                            }
                                            await this.setState({
                                                refreshing: false,
                                                connected : connected,
                                            });
                                        }}
                                        ListFooterComponent={() => (
                                            this.state.connected == false ? <Atoms.Errors.NoConnection /> :
                                            recebimentosNotas.length == 0 ? <Atoms.Errors.NoItens /> : null
                                        )}
                                        refreshing={this.state.refreshing}
                                        keyExtractor={(item) => item.key}
                                    />
                                )}
                            </Contexts.RecebimentosNotas.RecebimentosNotasContext.Consumer>
                        )}
                    </Contexts.Theme.ThemeContext.Consumer>
                </View>
            </Atoms.NavigationScroll>
        );
    }
}

export default ListReceivementsScreen;