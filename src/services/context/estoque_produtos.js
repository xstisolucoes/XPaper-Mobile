import * as React from 'react';
import { EstoqueProduto } from '../models';
import * as Storage from '../storage';
import { EstoqueProdutosFunc } from '../functions';
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
        fieldName   : 'PC_STATUS',
        values      : [
            {codigo: 1, label: 'Ativo',   defaultValue: true,  value: true},
            {codigo: 2, label: 'Inativo', defaultValue: false, value: false},
        ],
        title       : 'Status',
        name        : 'status',
    },
    {
        type        : Global.FilterType.TEXT,
        fieldName   : 'PV_REFERENCIA',
        placeholder : 'Buscar Referência...',
        defaultValue: '',
        value       : '',
        name        : 'referencia',
    },
    {
        type        : Global.FilterType.TEXT,
        fieldName   : 'PV_FANTASIA',
        placeholder : 'Buscar Fantasia...',
        defaultValue: '',
        value       : '',
        name        : 'fantasia',
    },
    {
        type        : Global.FilterType.TEXT,
        fieldName   : 'PV_RAZAO_SOCIAL',
        placeholder : 'Buscar Razão Social...',
        defaultValue: '',
        value       : '',
        name        : 'razao_social',
    },
];

export const EstoqueProdutosContext = React.createContext({
    estoqueProdutos: [],
});

const getCacheEstoqueProdutos = async () => {
    let estoqueProdutosJson = await Storage.getData('cacheEstoqueProdutos');

    let estoqueProdutos = []
    if (estoqueProdutosJson !== null && estoqueProdutosJson !== "" && estoqueProdutosJson) {
        estoqueProdutos = JSON.parse(estoqueProdutosJson);
    }

    return estoqueProdutos;
}

class EstoqueProdutosContextProvider extends React.Component {
    constructor(props) {
        super(props);

        this.updateEstoqueProdutos = async (filters) => {
            if (filters && filters !== null) {
                await this.setState({
                    activeFilter: filters,
                });
            }

            let data = await getCacheEstoqueProdutos();

            let response = await EstoqueProdutosFunc.getAll(this.state.activeFilter);

            if (response.status == 200) {
                data = response.data.result[0];
            }
            
            await Storage.setData('cacheEstoqueProdutos', JSON.stringify(data));

            data.forEach((object, index) => {
                data[index] = new EstoqueProduto(object);
            });

            this.setState({
                estoqueProdutos: data,
            });
        }

        this.addProductStock = async (emp_codigo, pc_codigo, pcf_codigo, data) => {
            await EstoqueProdutosFunc.addProductStock(emp_codigo, pc_codigo, pcf_codigo, data);
        }

        this.removeProductStock = async (emp_codigo, pc_codigo, pcf_codigo, data) => {
            await EstoqueProdutosFunc.removeProductStock(emp_codigo, pc_codigo, pcf_codigo, data);
        }

        this.state = {
            estoqueProdutos: [],
            defaultFilters : DEFAULT_FILTERS,
            activeFilter   : DEFAULT_FILTERS,
            functions      : {
                updateEstoqueProdutos: this.updateEstoqueProdutos,
                addProductStock      : this.addProductStock,
                removeProductStock   : this.removeProductStock,
            }
        }
    }

    render() {
        return (
            <EstoqueProdutosContext.Provider
                value={this.state}
            >
                {this.props.children}
            </EstoqueProdutosContext.Provider>
        );
    }
}

export default EstoqueProdutosContextProvider;