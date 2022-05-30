import * as Global from '../global';
const axios = require('axios');

export const getAll = async (filters) => {
    let requestResponse = [];

    const params = Global.formatRequestParamsBody({
        filters: filters,
    });

    const url = (await Global.url()) + Global.Modules.GESTAO_QUALIDADE + '/%22BuscaEstoqueProdutos%22';

    await axios.post(url, params)
        .then(async (response) => {
            requestResponse = response;
        });

    return requestResponse;
}

export const getAllProviders = async (filters) => {
    let requestResponse = [];

    const params = Global.formatRequestParamsBody({
        filters: filters,
    });

    const url = (await Global.url()) + Global.Modules.GESTAO_QUALIDADE + '/%22BuscaEstoqueProdutosForn%22';

    await axios.post(url, params)
        .then(async (response) => {
            requestResponse = response;
        });

    return requestResponse;
}

export const removeProductStock = async (emp_codigo, pc_codigo, pcf_codigo, data) => {
    let requestResponse = [];

    const params = Global.formatRequestParamsBody({
        emp_codigo: emp_codigo,
        pc_codigo : pc_codigo,
        pcf_codigo: pcf_codigo,
        data      : data,
    });

    const url = (await Global.url()) + Global.Modules.GESTAO_QUALIDADE + '/%22RemoveStockAddress%22';

    await axios.post(url, params)
        .then(async (response) => {
            requestResponse = response;
        });

    return requestResponse;
}

export const addProductStock = async (emp_codigo, pc_codigo, pcf_codigo, data) => {
    let requestResponse = [];

    const params = Global.formatRequestParamsBody({
        emp_codigo: emp_codigo,
        pc_codigo : pc_codigo,
        pcf_codigo: pcf_codigo,
        data      : data,
    });

    const url = (await Global.url()) + Global.Modules.GESTAO_QUALIDADE + '/%22AddStockAddress%22';

    await axios.post(url, params)
        .then(async (response) => {
            requestResponse = response;
        });

    return requestResponse;
}