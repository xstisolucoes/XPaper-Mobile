import * as React from 'react';
import { RecebimentoNota } from '../models';
import * as Storage from '../storage';
import { Recebimentos } from '../functions';
import Global from '../global';

export const DEFAULT_FILTERS = [
    {
        type        : Global.FilterType.TEXT,
        fieldName   : 'ALL',
        placeholder : 'Buscar...',
        defaultValue: '',
        value       : '',
        name        : 'search',
    },
    {
        type        : Global.FilterType.CHECK,
        fieldName   : 'NFE_INSPECAO_STATUS',
        values      : [
            {codigo: 1, label: 'Inspecionado',     defaultValue: false, value: false},
            {codigo: 2, label: 'Não Inspecionado', defaultValue: true,  value: true}
        ],
        title       : 'Status',
        name        : 'status',
    },
    {
        type        : Global.FilterType.DATE,
        fieldName   : 'NFE_DATA_ENTRADA',
        title       : 'A partir de',
        defaultValue: new Date(new Date().setMonth(new Date().getMonth() - 6)),
        value       : new Date(new Date().setMonth(new Date().getMonth() - 6)),
        name        : 'date',
    },
];

export const RecebimentosNotasContext = React.createContext({
    recebimentosNotas: [],
});

const getCacheRecebimentosNotas = async () => {
    let recebimentosNotasJson = await Storage.getData('cacheRecebimentosNotas');

    let recebimentosNotas = []
    if (recebimentosNotasJson !== null && recebimentosNotasJson !== "" && recebimentosNotasJson) {
        recebimentosNotas = JSON.parse(recebimentosNotasJson);
    }

    return recebimentosNotas;
}

class RecebimentosNotasContextProvider extends React.Component {
    constructor(props) {
        super(props);

        this.updateRecebimentosNotas = async (filters) => {
            if (filters && filters !== null) {
                await this.setState({
                    activeFilter: filters,
                });
            }

            let data = await getCacheRecebimentosNotas();

            let response = await Recebimentos.getAllNotes(this.state.activeFilter);

            if (response.status == 200) {
                data = response.data.result[0];
            }
            
            await Storage.setData('cacheRecebimentosNotas', JSON.stringify(data));

            data.forEach((object, index) => {
                data[index] = new RecebimentoNota(object);
            });

            this.setState({
                recebimentosNotas: data,
            });
        }

        this.concludeNote = () => {
            if (this.state.activeNote !== null) {
                Recebimentos.concludeNote(this.state.activeNote.nfe_numero, this.state.activeNote.nfe_serie, this.state.activeNote.pes_codigo);
            }
        }

        this.selectNote = (note) => {
            this.setState({
                activeNote: note,
            });
        }

        this.state = {
            recebimentosNotas: [],
            activeNote       : null,
            defaultFilters   : DEFAULT_FILTERS,
            activeFilter     : DEFAULT_FILTERS,
            functions        : {
                updateRecebimentosNotas: this.updateRecebimentosNotas,
                concludeNote           : this.concludeNote,
                selectNote             : this.selectNote,
            }
        }
    }

    render() {
        return (
            <RecebimentosNotasContext.Provider
                value={this.state}
            >
                {this.props.children}
            </RecebimentosNotasContext.Provider>
        );
    }
}

export default RecebimentosNotasContextProvider;