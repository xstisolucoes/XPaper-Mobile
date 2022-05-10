import * as React from 'react';
import { EstoqueReservado } from '../models';
import * as Storage from '../storage';
import { EstoquesReservados } from '../functions';
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
        fieldName   : 'SER_STATUS',
        values      : [
            {codigo: 1, label: 'Solicitado', defaultValue: true,  value: true},
            {codigo: 2, label: 'Separado',   defaultValue: true,  value: true},
            {codigo: 3, label: 'Transbordo', defaultValue: true,  value: true},
            {codigo: 4, label: 'Atendido',   defaultValue: false, value: false},
        ],
        title       : 'Status',
        name        : 'status',
    },
    {
        type        : Global.FilterType.DATE,
        fieldName   : 'SER_DATA_SOLICITACAO',
        title       : 'A partir de',
        defaultValue: new Date(new Date().setMonth(new Date().getMonth() - 6)),
        value       : new Date(new Date().setMonth(new Date().getMonth() - 6)),
        name        : 'date',
    },
];

export const EstoqueReservadoContext = React.createContext({
    estoqueReservado: [],
});

const getCacheEstoqueReservado = async () => {
    let estoqueReservadoJson = await Storage.getData('cacheEstoqueReservado');

    let estoqueReservado = []
    if (estoqueReservadoJson !== null && estoqueReservadoJson !== "" && estoqueReservadoJson) {
        estoqueReservado = JSON.parse(estoqueReservadoJson);
    }

    return estoqueReservado;
}

class EstoqueReservadoContextProvider extends React.Component {
    constructor(props) {
        super(props);

        this.updateEstoqueReservado = async (filters) => {
            if (filters && filters !== null) {
                await this.setState({
                    activeFilter: filters,
                });
            }

            let data = await getCacheEstoqueReservado();

            let response = await EstoquesReservados.getAllReservedStocks(this.state.activeFilter);

            if (response.status == 200) {
                data = response.data.result[0];
            }
            
            await Storage.setData('cacheEstoqueReservado', JSON.stringify(data));

            data.forEach((object, index) => {
                data[index] = new EstoqueReservado(object);
            });

            this.setState({
                estoqueReservado: data,
            });
        }

        this.separeReservedStock = async (op_codigo, er_codigo, ruas, lotes) => {
            return await EstoquesReservados.separeReservedStock(op_codigo, er_codigo, ruas, lotes);
        }

        this.transbordReservedStock = async (op_codigo, er_codigo) => {
            return await EstoquesReservados.transbordReservedStock(op_codigo, er_codigo);
        }

        this.finishReservedStock = async (op_codigo, er_codigo) => {
            return await EstoquesReservados.finishReservedStock(op_codigo, er_codigo);
        }

        this.state = {
            estoqueReservado: [],
            defaultFilters  : DEFAULT_FILTERS,
            activeFilter    : DEFAULT_FILTERS,
            functions       : {
                updateEstoqueReservado: this.updateEstoqueReservado,
                separeReservedStock   : this.separeReservedStock,
                transbordReservedStock: this.transbordReservedStock,
                finishReservedStock   : this.finishReservedStock,
            }
        }
    }

    render() {
        return (
            <EstoqueReservadoContext.Provider
                value={this.state}
            >
                {this.props.children}
            </EstoqueReservadoContext.Provider>
        );
    }
}

export default EstoqueReservadoContextProvider;