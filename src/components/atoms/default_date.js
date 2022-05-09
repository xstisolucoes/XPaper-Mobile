import * as React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Typography } from '_styles';
import { Contexts } from '_services';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Icons from '_assets/icons';

class DefaultDate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value ?? this.props.defaultValue ?? new Date(),
            valueString: this.getDateString(this.props.value ?? this.props.defaultValue ?? new Date()),
            modalOpened: false,
        }

        this.getValue = () => this.getDateString(this.state.value);
    }

    getDateString(date) {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        return ('0' + day).slice(-2) + '/' + ('0' + month).slice(-2) + '/' + year;
    }

    setDate(date) {
        this.setState({
            value: date,
            valueString: this.getDateString(date),
        });

        if (this.props.setValue) {
            this.props.setValue(date);
        }
    }

    render() {
        return (
            <Contexts.Theme.ThemeContext.Consumer>
                {({ name, theme, components }) => (
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
                                        alignItems: 'center',
                                        borderWidth: this.props.error && this.props.error ? 1 : 0,
                                        borderColor: theme.error,
                                    },
                                    ...this.props.style,
                                },
                                onPress: () => {
                                    this.setState({
                                        modalOpened: true,
                                    });
                                }
                            }}
                        >
                            {this.props.icon ? this.props.icon : null}
                            <TextInput
                                {...{
                                    ...this.props,
                                    ...{
                                        value: this.state.valueString,
                                        defaultValue: undefined,
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
                                        editable: false,
                                    }
                                }}
                            />
                            <Icons.Calendar size={16} color={theme.backgroundColorLightBrightness} />
                        </Pressable>
                        {this.state.modalOpened ?
                            <DateTimePicker
                                value={this.state.value}
                                display={'spinner'}
                                themeVariant={name}
                                locale={'pt-BR'}
                                onChange={(event, date) => {
                                    this.setState({
                                        modalOpened: false,
                                    });

                                    if (date) {
                                        this.setDate(date);
                                    }

                                }}
                            />
                        : null}
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

export default DefaultDate;