import * as React from 'react';
import { Solicitacao } from '../models';
import * as Storage from '../storage';
import { Solicitacoes } from '../functions';
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
        fieldName   : 'SOL_STATUS',
        values      : [
            {codigo: 1, label: 'Solicitado', defaultValue: true,  value: true},
            {codigo: 2, label: 'Atendido',   defaultValue: false, value: false}
        ],
        title       : 'Status',
        name        : 'status',
    },
    {
        type        : Global.FilterType.DATE,
        fieldName   : 'SOL_DATA_SOLICITACAO',
        title       : 'A partir de',
        defaultValue: new Date(new Date().setMonth(new Date().getMonth() - 6)),
        value       : new Date(new Date().setMonth(new Date().getMonth() - 6)),
        name        : 'date',
    },
];

export const SolicitacoesContext = React.createContext({
    solicitacoes: [],
});

const getCacheSolicitacoes = async () => {
    let solicitacoesJson = await Storage.getData('cacheSolicitacoes');

    let solicitacoes = []
    if (solicitacoesJson !== null && solicitacoesJson !== "" && solicitacoesJson) {
        solicitacoes = JSON.parse(solicitacoesJson);
    }

    return solicitacoes;
}

class SolicitacoesContextProvider extends React.Component {
    constructor(props) {
        super(props);

        this.updateSolicitacoes = async (filters) => {
            let data = await getCacheSolicitacoes();

            let response = await Solicitacoes.getAll(filters);

            if (response.status == 200) {
                data = response.data.result[0];
            }
            
            await Storage.setData('cacheSolicitacoes', JSON.stringify(data));

            data.forEach((object, index) => {
                data[index] = new Solicitacao(object);
            });

            this.setState({
                solicitacoes: data,
            });
        }

        this.state = {
            solicitacoes  : [],
            defaultFilters: DEFAULT_FILTERS,
            functions     : {
                updateSolicitacoes: this.updateSolicitacoes,
            }
        }
    }

    render() {
        return (
            <SolicitacoesContext.Provider
                value={this.state}
            >
                {this.props.children}
            </SolicitacoesContext.Provider>
        );
    }
}

export default SolicitacoesContextProvider;