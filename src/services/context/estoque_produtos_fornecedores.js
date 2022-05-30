import * as React from 'react';
import { EstoqueProdutoForn } from '../models';
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
        fieldName   : 'PCF_STATUS',
        values      : [
            {codigo: 1, label: 'Ativo',   defaultValue: true,  value: true},
            {codigo: 2, label: 'Inativo', defaultValue: false, value: false},
        ],
        title       : 'Status',
        name        : 'status',
    },
];

export const EstoqueProdutosFornecedoresContext = React.createContext({
    estoqueProdutosFornecedores: [],
});

const getCacheEstoqueProdutosFornecedores = async () => {
    let estoqueProdutosFornecedoresJson = await Storage.getData('cacheEstoqueProdutosFornecedores');

    let estoqueProdutosFornecedores = []
    if (estoqueProdutosFornecedoresJson !== null && estoqueProdutosFornecedoresJson !== "" && estoqueProdutosFornecedoresJson) {
        estoqueProdutosFornecedores = JSON.parse(estoqueProdutosFornecedoresJson);
    }

    return estoqueProdutosFornecedores;
}

class EstoqueProdutosFornecedoresContextProvider extends React.Component {
    constructor(props) {
        super(props);

        this.updateEstoqueProdutosFornecedores = async (filters, pc_codigo) => {
            if (filters && filters !== null) {
                await this.setState({
                    activeFilter: filters,
                });
            }

            if (pc_codigo && pc_codigo !== null) {
                let filter = this.state.activeFilter;
                let has = false;

                filter.forEach((object) => {
                    if (object.fieldName == 'PC_CODIGO') {
                        has = true;
                        object.value = pc_codigo;
                    }
                });

                if (!has) {
                    filter.push({
                        type        : Global.FilterType.TEXT,
                        fieldName   : 'PC_CODIGO',
                        defaultValue: '0',
                        value       : pc_codigo,
                        name        : 'produto',
                        visible     : false,
                    });
                }

                await this.setState({
                    activeFilter: filter,
                });
            }

            let data = await getCacheEstoqueProdutosFornecedores();

            let response = await EstoqueProdutosFunc.getAllProviders(this.state.activeFilter);

            if (response.status == 200) {
                data = response.data.result[0];
            }
            
            await Storage.setData('cacheEstoqueProdutosFornecedores', JSON.stringify(data));

            data.forEach((object, index) => {
                data[index] = new EstoqueProdutoForn(object);
            });

            this.setState({
                estoqueProdutosFornecedores: data,
            });
        }

        this.addProductStock = async (emp_codigo, pc_codigo, pcf_codigo, data) => {
            await EstoqueProdutosFunc.addProductStock(emp_codigo, pc_codigo, pcf_codigo, data);
        }

        this.removeProductStock = async (emp_codigo, pc_codigo, pcf_codigo, data) => {
            await EstoqueProdutosFunc.removeProductStock(emp_codigo, pc_codigo, pcf_codigo, data);
        }

        this.state = {
            estoqueProdutosFornecedores: [],
            defaultFilters             : DEFAULT_FILTERS,
            activeFilter               : DEFAULT_FILTERS,
            functions                  : {
                updateEstoqueProdutosFornecedores: this.updateEstoqueProdutosFornecedores,
                addProductStock                  : this.addProductStock,
                removeProductStock               : this.removeProductStock,
            }
        }
    }

    render() {
        return (
            <EstoqueProdutosFornecedoresContext.Provider
                value={this.state}
            >
                {this.props.children}
            </EstoqueProdutosFornecedoresContext.Provider>
        );
    }
}

export default EstoqueProdutosFornecedoresContextProvider;