import * as React from 'react';
import { InspecaoVeicular } from '../models';
import * as Storage from '../storage';
import { InspecoesVeiculares } from '../functions';
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
        fieldName   : 'IV_STATUS',
        values      : [
            {codigo: 1, label: 'Aberto',    defaultValue: true,  value: true},
            {codigo: 2, label: 'Aprovado',  defaultValue: false, value: false},
            {codigo: 3, label: 'Reprovado', defaultValue: false, value: false},
        ],
        title       : 'Status',
        name        : 'status',
    },
    {
        type        : Global.FilterType.DATE,
        fieldName   : 'IV_DATA_CADASTRO',
        title       : 'A partir de',
        defaultValue: new Date(new Date().setMonth(new Date().getMonth() - 6)),
        value       : new Date(new Date().setMonth(new Date().getMonth() - 6)),
        name        : 'date',
    },
];

export const InspecoesVeicularesContext = React.createContext({
    inspecoesVeiculares: [],
});

const getCacheInspecoesVeiculares = async () => {
    let inspecoesVeicularesJson = await Storage.getData('cacheInspecoesVeiculares');

    let inspecoesVeiculares = []
    if (inspecoesVeicularesJson !== null && inspecoesVeicularesJson !== "" && inspecoesVeicularesJson) {
        inspecoesVeiculares = JSON.parse(inspecoesVeicularesJson);
    }

    return inspecoesVeiculares;
}

class InspecoesVeicularesContextProvider extends React.Component {
    constructor(props) {
        super(props);

        this.updateInspecoesVeiculares = async (filters) => {
            let data = await getCacheInspecoesVeiculares();

            let response = await InspecoesVeiculares.getAllInspections(filters);

            if (response.status == 200) {
                data = response.data.result[0];
            }
            
            await Storage.setData('cacheInspecoesVeiculares', JSON.stringify(data));

            data.forEach((object, index) => {
                data[index] = new InspecaoVeicular(object);
            });

            this.setState({
                inspecoesVeiculares: data,
            });
        }

        this.saveInspection = async (inspection, checklist, status, signatures) => {
            let list = [];
            checklist.forEach((object) => {
                list.push(object['ivcl_valor']);
            });

            await InspecoesVeiculares.saveInspection(
                inspection,
                status,
                {arquivo: signatures[0]},
                {arquivo: signatures[1]},
                list,
            );
        }

        this.state = {
            inspecoesVeiculares: [],
            defaultFilters     : DEFAULT_FILTERS,
            functions          : {
                updateInspecoesVeiculares: this.updateInspecoesVeiculares,
                saveInspection           : this.saveInspection,
            }
        }
    }

    render() {
        return (
            <InspecoesVeicularesContext.Provider
                value={this.state}
            >
                {this.props.children}
            </InspecoesVeicularesContext.Provider>
        );
    }
}

export default InspecoesVeicularesContextProvider;