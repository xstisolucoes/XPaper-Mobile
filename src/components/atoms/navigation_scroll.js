import * as React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Contexts } from '_services';

class NavigationScroll extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Contexts.Theme.ThemeContext.Consumer>
                {({ theme }) => (
                    <View
                        {...{
                            ...this.props.noScroll ?? false ? this.props : {},
                            ...{
                                style:{
                                    flex: 1,
                                    backgroundColor: theme.backgroundColor,
                                    ...this.props.noScroll ?? false ? this.props.style : {},
                                },
                            },
                        }}
                    >
                        {this.props.noScroll ? 
                            this.props.children
                        :
                            <KeyboardAwareScrollView
                                {...{
                                    ...this.props,
                                }}
                            >
                                {this.props.children}
                            </KeyboardAwareScrollView>
                        }
                    </View>
                )}
            </Contexts.Theme.ThemeContext.Consumer>
        );
    }
}

export default NavigationScroll;