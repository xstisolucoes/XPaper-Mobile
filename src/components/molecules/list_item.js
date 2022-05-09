import * as React from 'react';
import { Text, Pressable } from 'react-native';
import * as Atoms from '../atoms';
import { Contexts } from '_services';
import { Typography } from '_styles';

class ListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Contexts.Theme.ThemeContext.Consumer>
                {({ theme, components }) => (
                    <Pressable
                        {...{
                            ...this.props,
                            ...{
                                style: {
                                    ...{
                                        flexDirection: 'row',
                                        alignContent: 'center',
                                        justifyContent: 'center',
                                        width: '100%',
                                        paddingVertical: 10,
                                        paddingHorizontal: 20,
                                        borderTopWidth: 1,
                                        borderBottomWidth: 1,
                                        borderColor: 'transparent',
                                        overflow: 'hidden',
                                        elevation: 1,
                                        shadowColor: components.list_item.shadowColor,
                                    },
                                    ...this.props.style,
                                }
                            }
                        }}
                    >
                        <Text
                            style={[
                                Typography.DEFAULT_FONT_REGULAR,
                                {
                                    fontSize: 18,
                                    textAlignVertical: 'center',
                                    flex: 1,
                                    color: theme.defaultTextColor,
                                },
                            ]}
                        >{this.props.title !== undefined ? this.props.title : null}</Text>
                        {this.props.isToggle == true ?
                            <Atoms.TogglerButton onPress={this.props.onPress} value={this.props.value} />
                        : null}
                    </Pressable>
                )}
            </Contexts.Theme.ThemeContext.Consumer>
        );
    }
}

export default ListItem;