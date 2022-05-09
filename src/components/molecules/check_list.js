import * as React from 'react';
import { FlatList, Text, Pressable, View } from 'react-native';
import { Typography } from '_styles';
import { Contexts } from '_services';
import * as Icons from '_assets/icons';

class CheckItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Contexts.Theme.ThemeContext.Consumer>
                {({ theme, components }) => (
                    <Pressable
                        onPress={() => {
                            this.props.selectFunction(this.props.item[this.props.fieldName.codigo], !this.props.selected);
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
                                backgroundColor: this.props.selected == true ? components.check_list_item.activeBackgroundColor : components.check_list_item.inactiveBackgroundColor,
                                borderColor: this.props.selected == true ? components.check_list_item.activeBorderColor : components.check_list_item.inactiveBorderColor,
                                borderWidth: 1,
                                borderRadius: 3,
                                marginRight: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {this.props.selected == true ?
                                <Icons.Check size={12} color={theme.backgroundColor} />
                            : null}
                        </View>
                        <Text
                            style={[
                                Typography.DEFAULT_FONT_REGULAR,
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

class CheckList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data,
        }

        this.getData = () => this.state.data;
    }

    selectFunction(codigo, value) {
        let data = this.state.data;

        data.forEach((object) => {
            if (object[this.props.fieldName.codigo] == codigo) {
                object.value = value;
            }
        });

        if (this.props.setValue) {
            this.props.setValue(data);
        }

        this.setState({
            data: data,
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
                                data: this.state.data,
                                renderItem: (object) => (
                                    <CheckItem item={object.item} selected={object.item.value} fieldName={this.props.fieldName} selectFunction={(codigo, value) => this.selectFunction(codigo, value)}/>
                                ),
                                keyExtractor: this.props.keyExtractor ? (item) => this.props.keyExtractor(item) : (item) => item.key,
                                ItemSeparatorComponent: () => <View style={{width: '100%', height: 10}} />
                            }}
                        />
                    </View>
                )}
            </Contexts.Theme.ThemeContext.Consumer>
        );
    }
}

export default CheckList;