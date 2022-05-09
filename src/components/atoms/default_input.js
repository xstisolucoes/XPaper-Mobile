import * as React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Typography } from '_styles';
import { Contexts } from '_services';

class DefaultInput extends React.Component {
    constructor(props) {
        super(props);

        this._value = '';
    }

    getText() {
        return this._value;
    }

    render() {
        return (
            <Contexts.Theme.ThemeContext.Consumer>
                {({ theme, components }) => (
                    <View
                        {...{
                            style: {
                                width: '100%',
                                ...this.props.viewStyle,
                            }
                        }}
                    >
                        {this.props.labelTitle ?
                            <Text
                                style={[
                                    {
                                        marginVertical: 5,
                                        fontSize: 15,
                                        color: theme.defaultTextColor
                                    },
                                    Typography.DEFAULT_FONT_BOLD,
                                ]}
                            >
                                {this.props.labelTitle}
                            </Text>
                        : null}
                        <Pressable
                            {...{
                                style: {
                                    ...{
                                        backgroundColor: this.props.disabled ? components.default_input.disabledBackgroundColor : components.default_input.backgroundColor,
                                        paddingVertical: 10,
                                        paddingHorizontal: 15,
                                        borderRadius: 10,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'flex-start',
                                        borderWidth: this.props.error && this.props.error ? 1 : 0,
                                        borderColor: theme.error,
                                    },
                                    ...this.props.style,
                                },
                                onPress: () => this.input.focus()
                            }}
                        >
                            {this.props.icon ? this.props.icon : null}
                            <TextInput
                                {...{
                                    ...this.props,
                                    ...{
                                        placeholderTextColor: components.default_input.placeholderColorText,
                                        style: {
                                            ...{
                                                ...Typography.DEFAULT_FONT_REGULAR,
                                                marginLeft: this.props.icon ? 15 : 0,
                                                flex: 1,
                                                color: components.default_input.defaultColorText,
                                            },
                                            ...this.props.inputStyle,
                                        },
                                        ref: (ref) => this.input = ref,
                                        editable: this.props.disabled ? false : true,
                                        onChangeText: (value) => {
                                            this._value = value;
                                            if (this.props.setValue) {
                                                this.props.setValue(value);
                                            }
                                        },
                                    }
                                }}
                            />
                        </Pressable>
                        {this.props.error && this.props.error !== '' ?
                            <Text
                                style={[
                                    {
                                        marginVertical: 5,
                                        fontSize: 14,
                                        color: theme.error
                                    },
                                    Typography.DEFAULT_FONT_REGULAR,
                                ]}
                            >
                                {this.props.error}
                            </Text>
                        : null}
                    </View>
                )}
            </Contexts.Theme.ThemeContext.Consumer>
        );
    }
}

export default DefaultInput;