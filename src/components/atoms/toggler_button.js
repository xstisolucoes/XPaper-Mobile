import * as React from 'react';
import { Pressable, Animated } from 'react-native';
import { Contexts } from '_services';

class TogglerButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: new Animated.Value(this.props.value == true ? 30 : 0),
            color: new Animated.Value(this.props.value == true ? 1 : 0),
        }
    }

    render() {
        return (
            <Contexts.Theme.ThemeContext.Consumer>
                {({ components }) => (
                    <Pressable
                        {...{
                            ...this.props,
                            ...{
                                style: {
                                    ...this.props.style,
                                },
                                onPress: () => {
                                    Animated.timing(this.state.value, {
                                        toValue        : this.props.value == true ? 0 : 30,
                                        duration       : 200,
                                        useNativeDriver: false,
                                    }).start();
                        
                                    Animated.timing(this.state.color, {
                                        toValue        : this.props.value == true ? 0 : 1,
                                        duration       : 200,
                                        useNativeDriver: false,
                                    }).start();

                                    if (this.props.onPress && typeof this.props.onPress === "function") {
                                        this.props.onPress();
                                    }
                                },
                            },
                        }}
                    >
                        <Animated.View
                            style={{
                                ...{
                                    height: 30,
                                    width: 60,
                                    borderRadius: 15,
                                    padding: 2.5,
                                    backgroundColor: this.state.color.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [components.toggler_button.inactiveColor, components.toggler_button.activeColor],
                                    }),
                                }
                            }}
                        >
                            <Animated.View
                                style={{
                                    height: 25,
                                    width: 25,
                                    borderRadius: 12.5,
                                    backgroundColor: components.toggler_button.ballColor,
                                    marginLeft: this.state.value,
                                }}
                            />
                        </Animated.View>
                    </Pressable>
                )}
            </Contexts.Theme.ThemeContext.Consumer>
        );
    }
}

export default TogglerButton;