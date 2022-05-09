import * as React from 'react';
import { View, Alert, Text } from 'react-native';
import { Atoms } from '_components';
import { Contexts } from '_services';
import { Typography } from '_styles';
import * as Icons from '_assets/icons';
import SignatureScreen from 'react-native-signature-canvas';

class VehicleInspectionAssinatureScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.route.params.item,
            checklist: this.props.route.params.checklist,
            status: this.props.route.params.status,
            signatures: [],
            signatureTitle: 'Assinatura do Responsável',
        }

        this.drawableArea = React.createRef();
    }

    confirmSignature() {
        Alert.alert(
            'Confirmação',
            'Confirma a assinatura feita?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Confirmar',
                    onPress: () => {
                        this.drawableArea.current.readSignature();
                    }
                }
            ],
        );
    }

    clearDraw() {
        this.drawableArea.current.clearSignature();
    }

    render() {
        return (
            <Contexts.Theme.ThemeContext.Consumer>
                {({ theme }) => (
                    <Contexts.InspecoesVeiculares.InspecoesVeicularesContext.Consumer>
                        {({ functions }) => (
                            <Atoms.NavigationScroll noScroll
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <SignatureScreen
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        position: 'absolute',
                                        left: 0,
                                        top: 0,
                                        right: 0,
                                        bottom: 0,
                                    }}
                                    webStyle={`body, html {width: 100%; height: 100%;}
                                        .m-signature-pad {box-shadow: none; border: none; width: 100%; height: 100%; top: 0; left: 0; margin-left: auto; margin-top: auto;} 
                                        .m-signature-pad--body {border: none; top: 0; left: 0; right: 0; bottom:0;}
                                        .m-signature-pad--footer {display: none; margin: 0px;}`}
                                    penColor={'#0000FF'}
                                    ref={this.drawableArea}
                                    onOK={async (image) => {
                                        let signatures = this.state.signatures;
                                        signatures.push(image);

                                        if (signatures.length == 2) {
                                            await functions.saveInspection(this.state.item['iv_codigo'], this.state.checklist, this.state.status, signatures);
                                            await functions.updateInspecoesVeiculares();
                                            this.props.navigation.pop(2);
                                        } else {
                                            await this.setState({
                                                signatures: signatures,
                                                signatureTitle: 'Assinatura do Motorista',
                                            });

                                            this.clearDraw();
                                        }
                                    }}
                                />
                                <View 
                                    style={{
                                        width: 80,
                                        height: 80,
                                        position: 'absolute',
                                        left: 20,
                                        top: 20,
                                        borderColor: '#000000',
                                        borderTopWidth: 2,
                                        borderLeftWidth: 2,
                                    }}
                                />
                                <View 
                                    style={{
                                        width: 80,
                                        height: 80,
                                        position: 'absolute',
                                        left: 20,
                                        bottom: 20,
                                        borderColor: '#000000',
                                        borderBottomWidth: 2,
                                        borderLeftWidth: 2,
                                    }}
                                />
                                <View 
                                    style={{
                                        width: 80,
                                        height: 80,
                                        position: 'absolute',
                                        right: 20,
                                        top: 20,
                                        borderColor: '#000000',
                                        borderTopWidth: 2,
                                        borderRightWidth: 2,
                                    }}
                                />
                                <View 
                                    style={{
                                        width: 80,
                                        height: 80,
                                        position: 'absolute',
                                        right: 20,
                                        bottom: 20,
                                        borderColor: '#000000',
                                        borderRightWidth: 2,
                                        borderBottomWidth: 2,
                                    }}
                                />
                                <View 
                                    style={{
                                        width: 500,
                                        height: 2,
                                        backgroundColor: '#000000',
                                    }}
                                />
                                <Text style={[Typography.DEFAULT_FONT_REGULAR, {fontSize: 18, color: '#000000', marginBottom: 60, marginTop: 10}]}>{this.state.signatureTitle}</Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'absolute',
                                        top: 30,
                                        left: 30,
                                    }}
                                >
                                    <Atoms.DefaultButton
                                        style={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: 30,
                                            backgroundColor: theme.warning,
                                        }}
                                        onPress={() => this.clearDraw()}
                                    >
                                        <Icons.Trash color={'#FFFFFF'} size={32} />
                                    </Atoms.DefaultButton>
                                    <Atoms.DefaultButton
                                        style={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: 30,
                                            backgroundColor: theme.success,
                                            marginLeft: 15,
                                        }}
                                        onPress={() => this.confirmSignature()}
                                    >
                                        <Icons.Check color={'#FFFFFF'} size={32} />
                                    </Atoms.DefaultButton>
                                </View>
                            </Atoms.NavigationScroll>
                        )}
                    </Contexts.InspecoesVeiculares.InspecoesVeicularesContext.Consumer>
                )}
            </Contexts.Theme.ThemeContext.Consumer>
        );
    }
}

export default VehicleInspectionAssinatureScreen;