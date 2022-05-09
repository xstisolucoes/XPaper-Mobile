import * as React from 'react';
import { RecebimentoNotaChecklist } from '../models';
import * as Storage from '../storage';
import { Recebimentos } from '../functions';

export const RecebimentosNotasChecklistContext = React.createContext({
    recebimentosNotasChecklist: [],
});

const getCacheRecebimentosNotasChecklist = async () => {
    let recebimentosNotasChecklistJson = await Storage.getData('cacheRecebimentosNotasChecklist');

    let recebimentosNotasChecklist = []
    if (recebimentosNotasChecklistJson !== null && recebimentosNotasChecklistJson !== "" && recebimentosNotasChecklistJson) {
        recebimentosNotasChecklist = JSON.parse(recebimentosNotasChecklistJson);
    }

    return recebimentosNotasChecklist;
}

class RecebimentosNotasChecklistContextProvider extends React.Component {
    constructor(props) {
        super(props);

        this.updateRecebimentosNotasChecklist = async (nfe_codigo, infe_codigo) => {
            let data = await getCacheRecebimentosNotasChecklist();

            let response = await Recebimentos.getAllNotesChecklist(nfe_codigo, infe_codigo);

            if (response.status == 200) {
                data = response.data.result[0];
            }
            
            await Storage.setData('cacheRecebimentosNotasChecklist', JSON.stringify(data));

            data.forEach((object, index) => {
                data[index] = new RecebimentoNotaChecklist(object);
            });

            this.setState({
                recebimentosNotasChecklist: data,
            });
        }

        this.setValue = async (p_codigo, value) => {
            let data = this.state.recebimentosNotasChecklist;

            data.forEach((object) => {
                if (object['p_codigo'] == p_codigo) {
                    object['p_value'] = value;
                }
            });

            this.setState({
                recebimentosNotasChecklist: data,
            })
        }

        this.state = {
            recebimentosNotasChecklist: [],
            functions                 : {
                updateRecebimentosNotasChecklist: this.updateRecebimentosNotasChecklist,
                setValue                        : this.setValue,
            }
        }
    }

    render() {
        return (
            <RecebimentosNotasChecklistContext.Provider
                value={this.state}
            >
                {this.props.children}
            </RecebimentosNotasChecklistContext.Provider>
        );
    }
}

export default RecebimentosNotasChecklistContextProvider;