import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Contexts } from '_services';
import { Typography } from '_styles';
import * as Icons from '_assets/icons';

class DefaultChecklist extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Contexts.Theme.ThemeContext.Consumer>
                {({ theme }) => (
                    <View
                        {...{
                            ...this.props,
                            ...{
                                style: {
                                    width  : '100%',
                                    padding: 15,
                                }
                            }
                        }}
                    >
                        <Text
                            style={[
                                Typography.DEFAULT_FONT_BOLD,
                                {
                                    color: theme.defaultTextColor,
                                    fontSize: 18,
                                },
                            ]}
                        >{this.props.title}</Text>
                        {this.props.type == 'Conformidade2Opc' ?
                            <View
                                style={{
                                    marginTop: 15,
                                    alignItems: 'center',
                                    justifyContent: 'space-around',
                                    flexDirection: 'row'
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flex: 1,
                                    }}
                                >
                                    <Pressable
                                        style={{
                                            width: 50,
                                            height: 50,
                                            backgroundColor: this.props.value == 1 ? theme.success : theme.backgroundColorLightBrightness,
                                            borderRadius: 25,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        onPress={() => {
                                            if (this.props.setValue) {
                                                this.props.setValue(this.props.value == 1 ? 0 : 1);
                                            }
                                        }}
                                        android_ripple={{
                                            color: theme.backgroundColorAccent,
                                            borderless: true,
                                        }}
                                    >
                                        <Icons.Check size={32} color={theme.backgroundColor} />
                                    </Pressable>
                                    <Text style={[Typography.SECONDARY_FONT_REGULAR, {fontSize: 14, marginTop: 8, color: theme.defaultTextColor}]}>Conforme</Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flex: 1,
                                    }}
                                >
                                    <Pressable
                                        style={{
                                            width: 50,
                                            height: 50,
                                            backgroundColor: this.props.value == 2 ? theme.error : theme.backgroundColorLightBrightness,
                                            borderRadius: 25,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        onPress={() => {
                                            if (this.props.onError) {
                                                if (this.props.setValue && this.props.value !== 2) {
                                                    this.props.setValue(0);
                                                }
                                                this.props.onError(() => {
                                                    if (this.props.setValue) {
                                                        this.props.setValue(this.props.value == 2 ? 0 : 2);
                                                    }
                                                });
                                            } else {
                                                if (this.props.setValue) {
                                                    this.props.setValue(this.props.value == 2 ? 0 : 2);
                                                }
                                            }
                                        }}
                                        android_ripple={{
                                            color: theme.backgroundColorAccent,
                                            borderless: true,
                                        }}
                                    >
                                        <Icons.XMark size={24} color={theme.backgroundColor} />
                                    </Pressable>
                                    <Text style={[Typography.SECONDARY_FONT_REGULAR, {fontSize: 14, marginTop: 8, color: theme.defaultTextColor}]}>Não Conforme</Text>
                                </View>
                            </View>
                        : this.props.type == 'Situacao3OpcNA' ?
                            <View
                                style={{
                                    marginTop: 15,
                                    alignItems: 'center',
                                    justifyContent: 'space-around',
                                    flexDirection: 'row'
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flex: 1,
                                    }}
                                >
                                    <Pressable
                                        style={{
                                            width: 50,
                                            height: 50,
                                            backgroundColor: this.props.value == 1 ? theme.success : theme.backgroundColorLightBrightness,
                                            borderRadius: 25,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        onPress={() => {
                                            if (this.props.setValue) {
                                                this.props.setValue(this.props.value == 1 ? 0 : 1);
                                            }
                                        }}
                                        android_ripple={{
                                            color: theme.backgroundColorAccent,
                                            borderless: true,
                                        }}
                                    >
                                        <Icons.Check size={32} color={theme.backgroundColor} />
                                    </Pressable>
                                    <Text style={[Typography.SECONDARY_FONT_REGULAR, {fontSize: 14, marginTop: 8, color: theme.defaultTextColor}]}>Bom</Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flex: 1,
                                    }}
                                >
                                    <Pressable
                                        style={{
                                            width: 50,
                                            height: 50,
                                            backgroundColor: this.props.value == 2 ? theme.warning : theme.backgroundColorLightBrightness,
                                            borderRadius: 25,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        onPress={() => {
                                            if (this.props.setValue) {
                                                this.props.setValue(this.props.value == 2 ? 0 : 2);
                                            }
                                        }}
                                        android_ripple={{
                                            color: theme.backgroundColorAccent,
                                            borderless: true,
                                        }}
                                    >
                                        <Icons.Minus size={32} color={theme.backgroundColor} />
                                    </Pressable>
                                    <Text style={[Typography.SECONDARY_FONT_REGULAR, {fontSize: 14, marginTop: 8, color: theme.defaultTextColor}]}>Regular</Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flex: 1,
                                    }}
                                >
                                    <Pressable
                                        style={{
                                            width: 50,
                                            height: 50,
                                            backgroundColor: this.props.value == 3 ? theme.error : theme.backgroundColorLightBrightness,
                                            borderRadius: 25,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        onPress={() => {
                                            if (this.props.setValue) {
                                                this.props.setValue(this.props.value == 3 ? 0 : 3);
                                            }
                                        }}
                                        android_ripple={{
                                            color: theme.backgroundColorAccent,
                                            borderless: true,
                                        }}
                                    >
                                        <Icons.XMark size={24} color={theme.backgroundColor} />
                                    </Pressable>
                                    <Text style={[Typography.SECONDARY_FONT_REGULAR, {fontSize: 14, marginTop: 8, color: theme.defaultTextColor}]}>Ruim</Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flex: 1,
                                    }}
                                >
                                    <Pressable
                                        style={{
                                            width: 50,
                                            height: 50,
                                            backgroundColor: this.props.value == 4 ? theme.waiting : theme.backgroundColorLightBrightness,
                                            borderRadius: 25,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        onPress={() => {
                                            if (this.props.setValue) {
                                                this.props.setValue(this.props.value == 4 ? 0 : 4);
                                            }
                                        }}
                                        android_ripple={{
                                            color: theme.backgroundColorAccent,
                                            borderless: true,
                                        }}
                                    >
                                        <Icons.NA size={32} color={theme.backgroundColor} />
                                    </Pressable>
                                    <Text style={[Typography.SECONDARY_FONT_REGULAR, {fontSize: 14, marginTop: 8, color: theme.defaultTextColor}]}>N/A</Text>
                                </View>
                            </View>
                        : null}
                        
                    </View>
                )}
            </Contexts.Theme.ThemeContext.Consumer>
        );
    }
}

export default DefaultChecklist;