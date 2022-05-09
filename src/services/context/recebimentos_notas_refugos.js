import * as React from 'react';
import { RecebimentoNotaRefugo } from '../models';
import * as Storage from '../storage';
import { Recebimentos } from '../functions';

export const RecebimentosNotasRefugoContext = React.createContext({
    recebimentosNotasRefugo: [],
});

const getCacheRecebimentosNotasRefugo = async () => {
    let recebimentosNotasRefugoJson = await Storage.getData('cacheRecebimentosNotasRefugo');

    let recebimentosNotasRefugo = []
    if (recebimentosNotasRefugoJson !== null && recebimentosNotasRefugoJson !== "" && recebimentosNotasRefugoJson) {
        recebimentosNotasRefugo = JSON.parse(recebimentosNotasRefugoJson);
    }

    return recebimentosNotasRefugo;
}

class RecebimentosNotasRefugoContextProvider extends React.Component {
    constructor(props) {
        super(props);

        this.updateRecebimentosNotasRefugo = async (nfe_codigo, nfe_serie, pes_codigo, infe_codigo) => {
            let data = await getCacheRecebimentosNotasRefugo();

            let response = await Recebimentos.getAllNotesRefugo(nfe_codigo, nfe_serie, pes_codigo, infe_codigo);

            if (response.status == 200) {
                data = response.data.result[0];
            }
            
            await Storage.setData('cacheRecebimentosNotasRefugo', JSON.stringify(data));

            data.forEach((object, index) => {
                data[index] = new RecebimentoNotaRefugo(object);
            });

            this.setState({
                recebimentosNotasRefugo: data,
            });
        }

        this.setValue = async (mo_codigo, value) => {
            let data = this.state.recebimentosNotasRefugo;

            data.forEach((object) => {
                if (object['mo_codigo'] == mo_codigo) {
                    object['infer_quantidade'] = value;
                }
            });

            this.setState({
                recebimentosNotasRefugo: data,
            });
        }

        this.state = {
            recebimentosNotasRefugo: [],
            functions              : {
                updateRecebimentosNotasRefugo: this.updateRecebimentosNotasRefugo,
                setValue                     : this.setValue,
            }
        }
    }

    render() {
        return (
            <RecebimentosNotasRefugoContext.Provider
                value={this.state}
            >
                {this.props.children}
            </RecebimentosNotasRefugoContext.Provider>
        );
    }
}

export default RecebimentosNotasRefugoContextProvider;