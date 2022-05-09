import * as React from 'react';
import { InspecaoVeicularNota } from '../models';
import * as Storage from '../storage';
import { InspecoesVeiculares } from '../functions';

export const InspecoesVeicularesNotasContext = React.createContext({
    inspecoesVeicularesNotas: [],
});

const getCacheInspecoesVeicularesNotas = async () => {
    let inspecoesVeicularesNotasJson = await Storage.getData('cacheInspecoesVeicularesNotas');

    let inspecoesVeicularesNotas = []
    if (inspecoesVeicularesNotasJson !== null && inspecoesVeicularesNotasJson !== "" && inspecoesVeicularesNotasJson) {
        inspecoesVeicularesNotas = JSON.parse(inspecoesVeicularesNotasJson);
    }

    return inspecoesVeicularesNotas;
}

class InspecoesVeicularesNotasContextProvider extends React.Component {
    constructor(props) {
        super(props);

        this.updateInspecoesVeicularesNotas = async (iv_codigo) => {
            let data = await getCacheInspecoesVeicularesNotas();

            let response = await InspecoesVeiculares.getInspectionNotas(iv_codigo);

            if (response.status == 200) {
                data = response.data.result[0];
            }
            
            await Storage.setData('cacheInspecoesVeicularesNotas', JSON.stringify(data));

            data.forEach((object, index) => {
                data[index] = new InspecaoVeicularNota(object);
            });

            this.setState({
                inspecoesVeicularesNotas: data,
            });
        }

        this.state = {
            inspecoesVeicularesNotas: [],
            functions               : {
                updateInspecoesVeicularesNotas: this.updateInspecoesVeicularesNotas,
            }
        }
    }

    render() {
        return (
            <InspecoesVeicularesNotasContext.Provider
                value={this.state}
            >
                {this.props.children}
            </InspecoesVeicularesNotasContext.Provider>
        );
    }
}

export default InspecoesVeicularesNotasContextProvider;