import * as React from 'react';
import { View, Animated, Dimensions, Pressable, Text, FlatList, Platform } from 'react-native';
import * as Atoms from '../atoms';
import { default as CheckList } from './check_list';
import { Contexts, Global } from '_services';
import { Typography } from '_styles';
import Constants from 'expo-constants';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;


const FilterViewItem = (props) => {
    if (props.item.visible == false) {
        return null;
    }

    if (props.item.type == Global.FilterType.TEXT) {
        return (
            <Atoms.DefaultInput
                setValue={(value) => props.item.value = value}
                placeholder={props.item.placeholder ?? undefined}
                defaultValue={props.item.value ?? props.item.defaultValue ?? undefined}
                style={{marginVertical: 10}}
            />
        );
    } else if (props.item.type == Global.FilterType.CHECK) {
        return (
            <CheckList
                setValue={(value) => {props.item.values = value}}
                data={props.item.values}
                fieldName={{
                    codigo: 'codigo',
                    title: 'label',
                }}
                keyExtractor={() => (Math.random() + 1).toString(36).substring(3)}
                style={{marginVertical: 10}}
                label={props.item.title ?? undefined}
            />
        );
    } else if (props.item.type == Global.FilterType.DATE) {
        return (
            <Atoms.DefaultDate
                value={props.item.value}
                setValue={(value) => props.item.value = value}
                labelTitle={props.item.title ?? undefined}
                placeholder={props.item.placeholder ?? undefined}
                defaultValue={props.item.value ?? props.item.defaultValue ?? undefined}
                style={{marginVertical: 10}}
            />
        );
    }

    return null;
}

class FilterDrawer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            screenWidth   : this.isPortrait() ? SCREEN_WIDTH : SCREEN_HEIGHT,
            leftPos       : new Animated.Value(this.isPortrait() ? SCREEN_WIDTH : SCREEN_HEIGHT),
            leftPosFade   : this.isPortrait() ? SCREEN_WIDTH : SCREEN_HEIGHT,
            fadeShow      : false,
            fadeOpa       : new Animated.Value(0),
            opacity       : new Animated.Value(0),
            filterFunction: null,
            refreshing    : false,
        }

        this.setValueFilter = (name, value) => {
			this.props.filterProps.forEach((object) => {
				if (object.name == name) {
                    if (object.type = 'check') {
                        object.values = value;
                    } else {
                        object.value = value;
                    }
				}
			});
		}

        this.setActiveFilter = (func) => {
            this.setState({
                filterFunction: func,
            });
        }

        this.setActiveFilter.bind(this);

        this.showDrawer = this.showDrawer.bind(this);
    }

    isPortrait() {
        const dim = Dimensions.get('screen');
        return dim.height >= dim.width;
    };

    componentDidMount() {
        Dimensions.addEventListener('change', async (e) => {
            const {width} = e.window;

            if (!this.state.fadeShow) {
                Animated.timing(this.state.leftPos, {
                    toValue: width,
                    duration: 0,
                    useNativeDriver: false,
                }).start(() => {
                    this.setState({
                        leftPosFade: width,
                    });
                });
            } else {
                Animated.timing(this.state.leftPos, {
                    toValue: (width - (SCREEN_WIDTH * 0.9)),
                    duration: 0,
                    useNativeDriver: false,
                }).start(() => {
                    this.setState({
                        leftPosFade: width - SCREEN_WIDTH,
                    });
                });
            }

            await this.setState({
                screenWidth: width,
            });
        });
    }

    async showDrawer() {
        await this.setState({
            screenWidth: this.isPortrait() ? SCREEN_WIDTH : SCREEN_HEIGHT,
            leftPos    : new Animated.Value(this.isPortrait() ? SCREEN_WIDTH : SCREEN_HEIGHT),
            leftPosFade: this.isPortrait() ? SCREEN_WIDTH : SCREEN_HEIGHT,
            fadeShow   : false,
            fadeOpa    : new Animated.Value(0),
            opacity    : new Animated.Value(0),
        });

        Animated.timing(this.state.leftPos, {
            toValue: (this.state.screenWidth - (SCREEN_WIDTH * 0.9)),
            duration: 500,
            useNativeDriver: false,
        }).start(() => {
            this.setState({
                leftPosFade: this.state.screenWidth - SCREEN_WIDTH,
            });
        });

        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
        }).start();

        await this.setState({
            fadeShow: true,
        });

        Animated.timing(this.state.fadeOpa, {
            toValue: 0.5,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }

    async hideDrawer() {
        Animated.timing(this.state.leftPos, {
            toValue: this.isPortrait() ? SCREEN_WIDTH : SCREEN_HEIGHT,
            duration: 500,
            useNativeDriver: false,
        }).start(() => {
            this.setState({
                leftPosFade: this.isPortrait() ? SCREEN_WIDTH : SCREEN_HEIGHT,
            });
        });

        Animated.timing(this.state.opacity, {
            toValue: 0,
            delay: 300,
            duration: 200,
            useNativeDriver: false,
        }).start();

        Animated.timing(this.state.fadeOpa, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
        }).start(async () => {
            await this.setState({
                fadeShow: false,
            });
        });
    }

    render() {
        return (
            <Contexts.Theme.ThemeContext.Consumer>
                {({ theme }) => (
                    <View
                        style={{
                            flex: 1,
                            position: 'relative',
                        }}
                    >
                        {this.props.children}
                        <Pressable
                            onPress={() => this.hideDrawer()}
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                left: this.state.fadeShow == true ? 0 : this.state.leftPosFade,
                                marginTop: Platform.OS == 'android' ? 0 : Constants.statusBarHeight,
                            }}
                        >
                            <Animated.View
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    backgroundColor: '#000000',
                                    left: 0,
                                    opacity: this.state.fadeOpa,
                                }}
                            />
                        </Pressable>
                        <Animated.View
                            style={{
                                width: SCREEN_WIDTH * 0.9,
                                height: '100%',
                                position: 'absolute',
                                backgroundColor: theme.backgroundColor,
                                left: this.state.leftPos,
                                opacity: this.state.opacity,
                                marginTop: Platform.OS == 'android' ? 0 : Constants.statusBarHeight,
                            }}
                        >
                            <Atoms.NavigationScroll
                                style={{
                                    flex: 1,
                                }}
                                noScroll
                            >
                                <Text style={[Typography.DEFAULT_FONT_BOLD, {color: theme.defaultTextColor, fontSize: 20, margin: 20, marginBottom: 10}]}>Filtros</Text>
                                <FlatList
                                    data={this.props.filterProps}
                                    style={{
                                        paddingHorizontal: 20,
                                    }}
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => {}}
                                    renderItem={(object) => <FilterViewItem item={object.item} setValueFilter={this.setValueFilter} />}
                                    keyExtractor={() => (Math.random() + 1).toString(36).substring(3)}
                                    ListFooterComponent={() => (
                                        <View
                                            style={{
                                                width: '100%',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Atoms.DefaultButton
                                                title={'Filtrar'}
                                                style={{
                                                    margin: 20,
                                                    maxWidth: 200,
                                                    width: '100%',
                                                }}
                                                onPress={async () => {
                                                    if (this.state.filterFunction !== null) {
                                                        await this.setState({
                                                            refreshing  : true,
                                                        });
                                                        await this.state.filterFunction(this.props.filterProps);
                                                        await this.setState({
                                                            refreshing: false,
                                                        });
                                                    }

                                                    this.hideDrawer();
                                                }}
                                            />
                                        </View>
                                    )}
                                />
                            </Atoms.NavigationScroll>
                        </Animated.View>
                    </View>
                )}
            </Contexts.Theme.ThemeContext.Consumer>
        )
    }
}

export default FilterDrawer;