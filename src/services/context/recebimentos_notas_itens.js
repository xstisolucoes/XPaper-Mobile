import * as React from 'react';
import { RecebimentoNotaItem } from '../models';
import * as Storage from '../storage';
import { Recebimentos } from '../functions';

export const RecebimentosNotasItensContext = React.createContext({
    recebimentosNotasItens: [],
});

const getCacheRecebimentosNotasItens = async () => {
    let recebimentosNotasItensJson = await Storage.getData('cacheRecebimentosNotasItens');

    let recebimentosNotasItens = []
    if (recebimentosNotasItensJson !== null && recebimentosNotasItensJson !== "" && recebimentosNotasItensJson) {
        recebimentosNotasItens = JSON.parse(recebimentosNotasItensJson);
    }

    return recebimentosNotasItens;
}

class RecebimentosNotasItensContextProvider extends React.Component {
    constructor(props) {
        super(props);

        this.updateRecebimentosNotasItens = async (nfe_codigo) => {
            let data = await getCacheRecebimentosNotasItens();

            let response = await Recebimentos.getAllNotesItens(nfe_codigo);

            if (response.status == 200) {
                data = response.data.result[0];
            }
            
            await Storage.setData('cacheRecebimentosNotasItens', JSON.stringify(data));

            data.forEach((object, index) => {
                data[index] = new RecebimentoNotaItem(object);
            });

            this.setState({
                recebimentosNotasItens: data,
            });
        }

        this.saveInspecaoRecebimento = async (nfe_codigo, nfe_serie, pes_codigo, infe_codigo, pc_codigo, perguntas, refugos, rua_codigo) => {
            await Recebimentos.saveInspecao(nfe_codigo, nfe_serie, pes_codigo, infe_codigo, pc_codigo, perguntas, refugos, rua_codigo);
        }

        this.state = {
            recebimentosNotasItens: [],
            functions             : {
                updateRecebimentosNotasItens: this.updateRecebimentosNotasItens,
                saveInspecaoRecebimento     : this.saveInspecaoRecebimento,
            }
        }
    }

    render() {
        return (
            <RecebimentosNotasItensContext.Provider
                value={this.state}
            >
                {this.props.children}
            </RecebimentosNotasItensContext.Provider>
        );
    }
}

export default RecebimentosNotasItensContextProvider;