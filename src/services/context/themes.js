import * as React from 'react';
import { Appearance } from 'react-native';
import * as Storage from '../storage';

export const themes = {
    light: {
        primaryColor:       '#D32F39',
        primaryColorText:   '#FFFFFF',
        secondaryColor:     '#0F191B',
        secondaryColorText: '#F3F3F3',

        defaultTextColor: '#000000',
        accentTextColor:  '#FFFFFF',

        backgroundColorLightBrightness:  '#757575',
        backgroundColorShadowBrightness: '#505050',
        backgroundColorAccent:           '#111111',
        backgroundColor:                 '#FFFFFF',
        backgroundColorShadow:           '#777777',
        backgroundColorLightShadow:      '#F3F3F3',
        backgroundColorDarkShadow:       '#E0E0E0',
        statusBarStyle: 'dark-content',

        waiting:    '#00B0F0',
        error:      '#FF3939',
        inProgress: '#B7EB34',
        success:    '#09D574',
        warning:    '#FFC000',
        disabled:   '#727272',
    },
    dark: {
        primaryColor:       '#D32F39',
        primaryColorText:   '#FFFFFF',
        secondaryColor:     '#0F191B',
        secondaryColorText: '#F3F3F3',

        defaultTextColor: '#FFFFFF',
        accentTextColor:  '#000000',

        backgroundColorLightBrightness:  '#757575',
        backgroundColorShadowBrightness: '#505050',
        backgroundColorAccent:           '#F3F3F3',
        backgroundColor:                 '#474747',
        backgroundColorShadow:           '#FFFFFF',
        backgroundColorLightShadow:      '#3F3F3F',
        backgroundColorDarkShadow:       '#363636',
        statusBarStyle: 'light-content',

        waiting:    '#00B0F0',
        error:      '#FF3939',
        inProgress: '#B7EB34',
        success:    '#09D574',
        warning:    '#FFC000',
        disabled:   '#727272',
    },
}

const search_theme = async () => {
    let mode = await Storage.getData('themeMode');
    
    if (mode == null) {
        mode = Appearance.getColorScheme();
    }

    return mode;
};

const default_theme = 'light';

const theme_components = (theme_name) => ({
    navigation_bar: {
        backgroundColor: themes[theme_name].backgroundColor,
        activeIconColor: themes[theme_name].primaryColor,
        inactiveIconColor: themes[theme_name].defaultTextColor,
        activeBackgroundColor: themes[theme_name].backgroundColorDarkShadow,
        inactiveBackgroundColor: themes[theme_name].backgroundColor,
        badgeBackgroundColor: themes[theme_name].primaryColor,
        badgeTextColor: themes[theme_name].primaryColorText,
        shadowColor: themes[theme_name].defaultTextColor,
    },
    header_navigation: {
        backgroundColor: themes[theme_name].backgroundColor,
        titleColorText: themes[theme_name].defaultTextColor,
        secondaryIconColor: themes[theme_name].backgroundColorAccent,
        secondaryRippleColor: themes[theme_name].backgroundColorLightBrightness,
        backgroundIconColor: themes[theme_name].backgroundColorDarkShadow,
    },
    default_input: {
        backgroundColor: themes[theme_name].backgroundColorDarkShadow,
        disabledBackgroundColor: themes[theme_name].backgroundColorLightShadow,
        defaultIconColor: themes[theme_name].defaultTextColor,
        placeholderColorText: themes[theme_name].backgroundColorLightBrightness,
        defaultColorText: themes[theme_name].defaultTextColor,
    },
    search_input: {
        backgroundColor: themes[theme_name].backgroundColorDarkShadow,
        searchIconColor: themes[theme_name].defaultTextColor,
        placeholderColorText: themes[theme_name].backgroundColorLightBrightness,
        searchColorText: themes[theme_name].defaultTextColor,
    },
    category_list_item: {
        backgroundColor: themes[theme_name].secondaryColor,
        colorText: themes[theme_name].secondaryColorText,
    },
    product_list_item: {
        backgroundColor: themes[theme_name].backgroundColorLightShadow,
        colorText: themes[theme_name].defaultTextColor,
        titleTextColor: themes[theme_name].defaultTextColor,
        descriptionTextColor: themes[theme_name].backgroundColorLightBrightness,
        priceTextColor: themes[theme_name].primaryColor,
    },
    toggler_button: {
        inactiveColor: themes[theme_name].backgroundColorDarkShadow,
        activeColor: themes[theme_name].primaryColor,
        ballColor: themes[theme_name].primaryColorText,
    },
    list_item: {
        shadowColor: themes[theme_name].defaultTextColor,
    },
    list_maintenance_item: {
        rippleColor: themes[theme_name].backgroundColorDarkShadow,
        shadowColor: themes[theme_name].defaultTextColor,
    },
    configurations_list_item: {
        rippleColor: themes[theme_name].backgroundColorDarkShadow,
        shadowColor: themes[theme_name].defaultTextColor,
    },
    radio_list_item: {
        inactiveBackgroundColor: themes[theme_name].backgroundColorDarkShadow,
        inactiveBorderColor: themes[theme_name].backgroundColorLightBrightness,
        activeBackgroundColor: themes[theme_name].primaryColor,
        activeBorderColor: themes[theme_name].primaryColor,
    },
    check_list_item: {
        inactiveBackgroundColor: themes[theme_name].backgroundColorDarkShadow,
        inactiveBorderColor: themes[theme_name].backgroundColorLightBrightness,
        activeBackgroundColor: themes[theme_name].primaryColor,
        activeBorderColor: themes[theme_name].primaryColor,
    },
});

export const ThemeContext = React.createContext({
    name: default_theme,
    theme: themes[default_theme],
    components: theme_components(default_theme),
    functions: {
        toggleTheme: () => {},
    },
});

class ThemeContextProvider extends React.Component {
    constructor(props) {
        super(props);

        this.toggleTheme = () => {
            var new_theme = this.state.name == 'light' ? 'dark' : 'light';

            Storage.setData('themeMode', new_theme);

            this.setState({
                name: new_theme,
                theme: themes[new_theme],
                components: theme_components(new_theme),
            });
        }

        this.state = {
            name: default_theme,
            theme: themes[default_theme],
            components: theme_components(default_theme),
            functions: {
                toggleTheme: this.toggleTheme,
            },
        }
    }

    componentDidMount() {
        this.defaultTheme();
    }

    async defaultTheme() {
        let theme = await search_theme();

        if (theme !== default_theme) {
            this.toggleTheme();
        }
    }

    render() {
        return (
            <ThemeContext.Provider
                value={this.state}
            >
                {this.props.children}
            </ThemeContext.Provider>
        );
    }
}

export default ThemeContextProvider;