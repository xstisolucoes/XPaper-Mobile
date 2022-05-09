import * as React from 'react';
import { FlatList, Text, Pressable, View, Image, Dimensions, Platform } from 'react-native';
import { Typography } from '_styles';
import { DefaultButton } from '_components/atoms';
import { Contexts } from '_services';

const MAX_COLUMNS_PORTRAIT = Math.floor(((Dimensions.get('window').width < Dimensions.get('window').height ? Dimensions.get('window').width : Dimensions.get('window').height) - 40) / 90);
const MAX_COLUMNS_LANDSCAPE = Math.floor(((Dimensions.get('window').width < Dimensions.get('window').height ? Dimensions.get('window').height : Dimensions.get('window').width) - 120) / 90);

class MenuItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Pressable
                    onPress={() => {
                        if (this.button.props.onPress !== undefined) {
                            this.button.props.onPress();
                        }
                    }}
                    style={{
                        padding: this.props.item.ghost ? 0 : 15,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: this.props.item.ghost ? 0 : 125,
                        opacity: this.props.item.ghost ? 0 : 1,
                    }}
                >
                    <DefaultButton
                        style={{
                            backgroundColor: this.props.components.category_list_item.backgroundColor,
                            width: 60,
                            height: 60,
                            borderRadius: 15,
                            padding: 0,
                            overflow: 'hidden',
                        }}
                        ref={(ref) => this.button = ref}
                        onPress={() => this.props.item.onPress !== undefined ? this.props.item.onPress() : () => {}}
                    >
                        {this.props.item.icon ?
                            (typeof this.props.item.icon === 'function') ?
                                this.props.item.icon()
                            :
                                <Image
                                    source={{
                                        uri: this.props.item.icon,
                                    }}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        resizeMode: 'cover'
                                    }}
                                />
                        : null}
                    </DefaultButton>
                    <View
                        style={{
                            flexDirection: 'row',
                            width: '100%',
                        }}
                    > 
                        <Text
                            style={{
                                ...Typography.DEFAULT_FONT_REGULAR,
                                textAlign: 'center',
                                marginTop: 5,
                                width: '100%',
                                color: this.props.theme.defaultTextColor,
                            }}
                            numberOfLines={2}
                            ellipsizeMode='tail'
                        >{this.props.item.name + '\n'}</Text>
                    </View>
                </Pressable>
            </View>
        );
    }
}

class MenuList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            orientation: this.isPortrait() ? 'portrait' : 'landscape'
        }

        Dimensions.addEventListener('change', () => {
            this.setState({
                orientation: this.isPortrait() ? 'portrait' : 'landscape'
            });
        });
    }

    isPortrait() {
        const dim = Dimensions.get('screen');
        return dim.height >= dim.width;
    };

    adjustItemQtd(items) {
        let data = items;
        let portrait_missed = (Math.ceil(data.length / MAX_COLUMNS_PORTRAIT) * MAX_COLUMNS_PORTRAIT) - data.length;
        let landscape_missed = (Math.ceil(data.length / MAX_COLUMNS_LANDSCAPE) * MAX_COLUMNS_LANDSCAPE) - data.length;
        let total_missed = portrait_missed > landscape_missed ? portrait_missed : landscape_missed;

        for (let i = 0; i < total_missed; i++) {
            data.push({
                ghost: true,
                key: 'menu-ghost-' + (Math.random() + 1).toString(36).substring(3),
            });
        }

        return data
    }

    render() {
        return (
            <Contexts.Theme.ThemeContext.Consumer>
                {({ theme, components }) => (
                    this.state.orientation === 'portrait' ?
                        <FlatList
                            {...{
                                ...this.props,
                                ... {
                                    key: '_',
                                    style: {
                                        width: '100%',
                                        ...this.props.style,
                                    },
                                    data: this.adjustItemQtd(this.props.data),
                                    numColumns: MAX_COLUMNS_PORTRAIT,
                                    renderItem: (object) => (
                                        <MenuItem item={object.item} theme={theme} components={components} />
                                    ),
                                    keyExtractor: (item) => item.key,
                                },
                            }}
                        />
                    :
                        <FlatList
                            {...{
                                ...this.props,
                                ... {
                                    key: '#',
                                    style: {
                                        width: '100%',
                                        ...this.props.style,
                                    },
                                    data: this.adjustItemQtd(this.props.data),
                                    numColumns: MAX_COLUMNS_LANDSCAPE,
                                    renderItem: (object) => (
                                        <MenuItem item={object.item} theme={theme} components={components} />
                                    ),
                                    keyExtractor: (item) => item.key,
                                },
                            }}
                        />
                )}
            </Contexts.Theme.ThemeContext.Consumer>
        );
    }
}

export default MenuList;