import * as React from 'react';
import { View, Alert } from 'react-native';
import { Atoms } from '_components';
import { Functions, Global, Contexts } from '_services';

class ProductStockDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.route.params.item,
        }
    }

    removeStock(functions) {
        Alert.alert(
            'Endereço',
            'Indique os endereços e suas respectivas quantidades retiradas.',
            [
                {
                    text: 'Ok',
                    onPress: async () => {
                        await functions.updateProductAddress(1, this.state.item.pc_codigo, this.state.item.pcf_codigo);
                        this.props.navigation.navigate('RemoveStockAddressScreen', {item: this.state.item});
                    }
                }
            ],
        );
    }

    addStock(functions) {
        Alert.alert(
            'Endereço',
            'Indique os endereços e suas respectivas quantidades alocadas.',
            [
                {
                    text: 'Ok',
                    onPress: async () => {
                        await functions.updateProductAddress(1, this.state.item.pc_codigo, this.state.item.pcf_codigo);
                        this.props.navigation.navigate('AddStockAddressScreen', {item: this.state.item});
                    }
                }
            ],
        );
    }

    render() {
        return (
            <Contexts.ProductAddress.ProductAddressContext.Consumer>
                {({ functions }) => (
                    <Atoms.NavigationScroll>
                        <View 
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 20,
                            }}
                        >
                            <Atoms.DefaultInput labelTitle={'Código do Produto'} multiline={true} disabled value={Global.numberWithPoints(this.state.item['pc_codigo'])} />
                            <Atoms.DefaultInput labelTitle={'Descrição'} multiline={true} disabled value={this.state.item['pc_descricao']} />
                            <Atoms.DefaultInput labelTitle={'Medidas'} multiline={true} disabled value={this.state.item['pc_medidas']} />
                            <Atoms.DefaultInput labelTitle={'Composição Interna'} multiline={true} disabled value={this.state.item['pc_composicao']} />
                            <Atoms.DefaultInput labelTitle={'Composição do Fornecedor'} multiline={true} disabled value={this.state.item['cps_descricao']} />
                            <Atoms.DefaultInput labelTitle={'Vincos'} multiline={true} disabled value={this.state.item['pc_vincos']} />
                            <Atoms.DefaultInput labelTitle={'Fornecedor'} multiline={true} disabled value={this.state.item['pes_forn_fantasia']} />
                            <Atoms.DefaultInput labelTitle={'Razão Social'} multiline={true} disabled value={this.state.item['pes_forn_razao_social']} />
                            <Atoms.DefaultInput labelTitle={'Status'} multiline={true} disabled value={this.state.item['pcf_status']} />
                            {this.state.item['pcf_status'] == 'Ativo' ?
                                <View
                                    style={{
                                        width: '100%',
                                        paddingVertical: 20,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'row',
                                    }}
                                >
                                    <Atoms.DefaultButton
                                        style={{
                                            flex: 1,
                                            maxWidth: 200,
                                            marginRight: 10,
                                        }}
                                        title={'Adicionar'}
                                        onPress={() => this.addStock(functions)}
                                    />
                                    <Atoms.DefaultButton
                                        style={{
                                            flex: 1,
                                            maxWidth: 200,
                                        }}
                                        title={'Retirar'}
                                        onPress={() => this.removeStock(functions)}
                                    />
                                </View>
                            : null}
                        </View>
                    </Atoms.NavigationScroll>
                )}
            </Contexts.ProductAddress.ProductAddressContext.Consumer>
        );
    }
}

export default ProductStockDetailScreen;