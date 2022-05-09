import * as React from 'react';
import { Pressable, TextInput } from 'react-native';
import { Typography } from '_styles';
import * as Icons from '_assets/icons';
import { Contexts } from '_services';

class SearchInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Contexts.Theme.ThemeContext.Consumer>
                {({ theme, components }) => (
                    <Pressable
                        {...{
                            style: {
                                ...{
                                    backgroundColor: components.search_input.backgroundColor,
                                    paddingVertical: 10,
                                    paddingHorizontal: 15,
                                    borderRadius: 10,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                },
                                ...this.props.style,
                            },
                            onPress: () => this.input.focus()
                        }}
                    >
                        <Icons.Search color={components.search_input.searchIconColor} size={20} />
                        <TextInput
                            {...{
                                ...this.props,
                                ...{
                                    placeholder: 'Buscar...',
                                    placeholderTextColor: components.search_input.placeholderColorText,
                                    style: {
                                        ...{
                                            ...Typography.DEFAULT_FONT_REGULAR,
                                            marginLeft: 15,
                                            flex: 1,
                                            color: components.search_input.searchColorText,
                                        },
                                        ...this.props.inputStyle,
                                    },
                                    ref: (ref) => this.input = ref,
                                    onSubmitEditing: () => {
                                        if (this.props.onSearch !== undefined) {
                                            this.props.onSearch();
                                        }
                                    }
                                }
                            }}
                        />
                    </Pressable>
                )}
            </Contexts.Theme.ThemeContext.Consumer>
        );
    }
}

export default SearchInput;