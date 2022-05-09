import * as React from 'react';
import * as Storage from '../storage';

const defaultConfigurations = {
    server_ip: '192.168.0.10',
    server_port: '8080',
    server_method: 'http',
};

export const ConfigurationsContext = React.createContext({
    configurations: [],
});

const getCacheConfigurations = async () => {
    let configurationsJson = await Storage.getData('cacheConfigurations');

    let configurations = []
    if (configurationsJson !== null && configurationsJson !== "" && configurationsJson) {
        configurations = JSON.parse(configurationsJson);
    } else {
        configurations = defaultConfigurations;
    }

    return configurations;
}

class ConfigurationsContextProvider extends React.Component {
    constructor(props) {
        super(props);

        this.updateConfigurations = async () => {
            let data = await getCacheConfigurations();
            
            await Storage.setData('cacheConfigurations', JSON.stringify(data));

            this.setState({
                configurations: data,
            });
        }

        this.setValue = async (config_name, value) => {
            let data = this.state.configurations;

            data[config_name] = value;

            this.setState({
                configurations: data,
            })

            await Storage.setData('cacheConfigurations', JSON.stringify(data));
        }

        this.state = {
            configurations: {},
            functions     : {
                updateConfigurations: this.updateConfigurations,
                setValue            : this.setValue,
            }
        }

        this.updateConfigurations();
    }

    render() {
        return (
            <ConfigurationsContext.Provider
                value={this.state}
            >
                {this.props.children}
            </ConfigurationsContext.Provider>
        );
    }
}

export default ConfigurationsContextProvider;