import * as React from 'react';
import { InspecaoVeicularChecklist } from '../models';
import * as Storage from '../storage';
import { InspecoesVeiculares } from '../functions';

export const InspecoesVeicularesChecklistContext = React.createContext({
    inspecoesVeicularesChecklist: [],
});

const getCacheInspecoesVeicularesChecklist = async () => {
    let inspecoesVeicularesChecklistJson = await Storage.getData('cacheInspecoesVeicularesChecklist');

    let inspecoesVeicularesChecklist = []
    if (inspecoesVeicularesChecklistJson !== null && inspecoesVeicularesChecklistJson !== "" && inspecoesVeicularesChecklistJson) {
        inspecoesVeicularesChecklist = JSON.parse(inspecoesVeicularesChecklistJson);
    }

    return inspecoesVeicularesChecklist;
}

class InspecoesVeicularesChecklistContextProvider extends React.Component {
    constructor(props) {
        super(props);

        this.updateInspecoesVeicularesChecklist = async (iv_codigo) => {
            let data = await getCacheInspecoesVeicularesChecklist();

            let response = await InspecoesVeiculares.getInspectionChecklist(iv_codigo);

            if (response.status == 200) {
                data = response.data.result[0];
            }
            
            await Storage.setData('cacheInspecoesVeicularesChecklist', JSON.stringify(data));

            data.forEach((object, index) => {
                data[index] = new InspecaoVeicularChecklist(object);
            });

            this.setState({
                inspecoesVeicularesChecklist: data,
            });
        }

        this.setValue = async (ic_codigo, value) => {
            let data = this.state.inspecoesVeicularesChecklist;

            data.forEach((object) => {
                if (object['ic_codigo'] == ic_codigo) {
                    object['ivcl_valor'] = value;
                }
            });

            this.setState({
                inspecoesVeicularesChecklist: data,
            })
        }

        this.state = {
            inspecoesVeicularesChecklist: [],
            functions                   : {
                updateInspecoesVeicularesChecklist: this.updateInspecoesVeicularesChecklist,
                setValue                          : this.setValue,
            }
        }
    }

    render() {
        return (
            <InspecoesVeicularesChecklistContext.Provider
                value={this.state}
            >
                {this.props.children}
            </InspecoesVeicularesChecklistContext.Provider>
        );
    }
}

export default InspecoesVeicularesChecklistContextProvider;