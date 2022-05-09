import * as React from 'react';
import { FlatList, Text, Pressable, View, Image } from 'react-native';
import { Typography } from '_styles';
import { DefaultButton } from '_components/atoms';
import { Contexts, Global } from '_services';

class ProductItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Contexts.Theme.ThemeContext.Consumer>
                {({ theme, components }) => (
                    <Pressable
                        onPress={() => {
                            if (this.button.props.onPress !== undefined) {
                                this.button.props.onPress();
                            }
                        }}
                        style={{
                            padding: 5,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: 100,
                        }}
                    >
                        <DefaultButton
                            style={{
                                backgroundColor: components.product_list_item.backgroundColor,
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                borderRadius: 5,
                            }}
                            ref={(ref) => this.button = ref}
                            onPress={() => console.log('teste')}
                        >
                            <Image 
                                style={{
                                    width: 70,
                                    height: 70,
                                    borderRadius: 35,
                                    marginRight: 10,
                                    resizeMode: 'cover',
                                }}

                                source={this.props.item.image !== "" ? {uri: this.props.item.image} : undefined}
                            />
                            <View
                                style={{
                                    flex: 1,
                                    height: '100%',
                                    flexDirection: 'column',

                                }}
                            >
                                <Text
                                    style={[
                                        Typography.DEFAULT_FONT_BOLD,
                                        {
                                            color: components.product_list_item.titleTextColor,
                                            fontSize: 14
                                        }
                                    ]}
                                >{this.props.item.name}</Text>
                                <Text
                                    style={[
                                        Typography.DEFAULT_FONT_REGULAR,
                                        {
                                            color: components.product_list_item.descriptionTextColor,
                                            fontSize: 12,
                                            flex: 1,
                                        }
                                    ]}
                                    numberOfLines={2} ellipsizeMode='tail'
                                >{this.props.item.description}</Text>
                                <Text
                                    style={[
                                        Typography.DEFAULT_FONT_BOLD,
                                        {
                                            color: components.product_list_item.priceTextColor,
                                            fontSize: 16,
                                            textAlign: 'right',
                                        }
                                    ]}
                                >{Global.formatMonetary(this.props.item.price)}</Text>
                            </View>
                        </DefaultButton>
                    </Pressable>
                )}
            </Contexts.Theme.ThemeContext.Consumer>
        );
    }
}

class ProductList extends React.Component {
    constructor(props) {
        super(props);
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
                                        fontSize: 15
                                    }
                                ]}
                            >{this.props.label}</Text>
                        : null}
                        <FlatList
                            {...{
                                ...this.props,
                                renderItem: (object) => (
                                    <ProductItem item={object.item} />
                                ),
                                keyExtractor: (item) => item.key,
                            }}
                        />
                    </View>
                )}
            </Contexts.Theme.ThemeContext.Consumer>
        );
    }
}

export default ProductList;