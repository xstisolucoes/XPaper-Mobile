import * as React from 'react';
import { Pressable, View } from 'react-native';
import { Contexts } from '_services';

class DefaultCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Contexts.Theme.ThemeContext.Consumer>
                {({ theme }) => (
                    this.props.onPress ?
                        <Pressable
                            {...{
                                ...this.props,
                                ...{
                                    style: {
                                        ...{
                                            padding: 16,
                                            borderRadius: 8,
                                            elevation: 5,
                                            backgroundColor: theme.backgroundColor,
                                            shadowColor: theme.backgroundColorShadow,
                                            shadowOpacity: 0.2,
                                            shadowOffset: {width: 1, height: 1},
                                        },
                                        ...this.props.style,
                                    },
                                },
                            }}
                        >
                            {this.props.children}
                        </Pressable>
                    :
                        <View
                            {...{
                                ...this.props,
                                ...{
                                    style: {
                                        ...{
                                            padding: 16,
                                            borderRadius: 8,
                                            elevation: 5,
                                            backgroundColor: theme.backgroundColor,
                                            shadowColor: theme.backgroundColorShadow,
                                            shadowOpacity: 0.2,
                                            shadowOffset: {width: 1, height: 1},
                                        },
                                        ...this.props.style,
                                    },
                                },
                            }}
                        >
                            {this.props.children}
                        </View>
                )}
            </Contexts.Theme.ThemeContext.Consumer>
        );
    }
}

export default DefaultCard;