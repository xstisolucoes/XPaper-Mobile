import * as React from 'react';
import { Pressable, Text } from 'react-native';
import { Contexts } from '_services';
import { Typography } from '_styles';

class DefaultButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Contexts.Theme.ThemeContext.Consumer>
                {({ theme }) => (
                    <Pressable
                        {...{
                            ...this.props,
                            ...{
                                style: {
                                    backgroundColor: theme.primaryColor,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 10,
                                    borderRadius: 4,
                                    elevation: 3,
                                    shadowColor: theme.backgroundColorShadowBrightness,
                                    ...this.props.style
                                },
                                android_ripple: {
                                    color: theme.accentTextColor,
                                    radius: 4, 
                                    ...this.props.android_ripple
                                }
                            }
                        }}
                    >
                        {this.props.title ? 
                            <Text
                                style={[
                                    Typography.DEFAULT_FONT_BOLD,
                                    {
                                        fontSize: 18,
                                        color: theme.primaryColorText,
                                    }
                                ]}
                            >
                                {this.props.title}
                            </Text>
                        : this.props.children ?
                            this.props.children
                        : null}
                    </Pressable>
                )}
            </Contexts.Theme.ThemeContext.Consumer>
        );
    }
}

export default DefaultButton;