import * as React from 'react';
import { FlatList, Text, Pressable, View } from 'react-native';
import { Typography } from '_styles';
import { Contexts } from '_services';

class RadioItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Contexts.Theme.ThemeContext.Consumer>
                {({ theme, components }) => (
                    <Pressable
                        onPress={() => {
                            this.props.selectFunction(this.props.item[this.props.fieldName.codigo]);

                        }}
                        style={{
                            padding: 5,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        <View
                            style={{
                                width: 18,
                                height: 18,
                                backgroundColor: this.props.selected == true ? components.radio_list_item.activeBackgroundColor : components.radio_list_item.inactiveBackgroundColor,
                                borderColor: this.props.selected == true ? components.radio_list_item.activeBorderColor : components.radio_list_item.inactiveBorderColor,
                                borderWidth: 1,
                                borderRadius: 9,
                                marginRight: 10,
                            }}
                        ></View>
                        <Text
                            style={[
                                Typography.DEFAULT_FONT_BOLD,
                                {
                                    color: theme.defaultTextColor,
                                    fontSize: 14,
                                    flex: 1,
                                }
                            ]}
                        >
                            {this.props.item[this.props.fieldName.title]}
                        </Text>
                    </Pressable>
                )}
            </Contexts.Theme.ThemeContext.Consumer>
        );
    }
}

class RadioList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: null,
        }

        this.getCodigo = () => this.state.selected;
    }

    selectFunction(codigo) {
        this.setState({
            selected: codigo,
        });
    }

    render() {
        return (
            <Contexts.Theme.ThemeContext.Consumer>
                {({ theme }) => (
                    <View
                        style={{
                            width: '100%',
                            ...this.props.style,
                        }}
                    >
                        {this.props.label !== undefined ? 
                            <Text
                                style={[
                                    Typography.DEFAULT_FONT_BOLD,
                                    {
                                        color: theme.defaultTextColor,
                                        fontSize: 16
                                    }
                                ]}
                            >{this.props.label}</Text>
                        : null}
                        <FlatList
                            {...{
                                ...this.props,
                                renderItem: (object) => (
                                    <RadioItem item={object.item} fieldName={this.props.fieldName} selected={this.state.selected === object.item[this.props.fieldName.codigo]} selectFunction={(codigo) => this.selectFunction(codigo)} />
                                ),
                                keyExtractor: (item) => item.key,
                                ItemSeparatorComponent: () => <View style={{width: '100%', height: 10}} />
                            }}
                        />
                    </View>
                )}
            </Contexts.Theme.ThemeContext.Consumer>
        );
    }
}

export default RadioList;