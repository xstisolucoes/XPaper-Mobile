import * as Global from '../global';

const axios = require('axios');

export const getAllReservedStocks = async (filters) => {    
    let requestResponse = [];

    const params = Global.formatRequestParamsBody({
        filters: filters,
    });

    const url = (await Global.url()) + Global.Modules.GESTAO_QUALIDADE + '/%22BuscaSolicitacaoER%22';

    await axios.post(url, params)
        .then(async (response) => {
            requestResponse = response;
        });

    return requestResponse;
}

export const separeReservedStock = async (op_codigo, er_codigo, ruas, lotes) => {    
    let requestResponse = [];

    const params = Global.formatRequestParamsBody({
        op_codigo: op_codigo,
        er_codigo: er_codigo,
        ruas     : ruas,
        lotes    : lotes,
    });

    const url = (await Global.url()) + Global.Modules.GESTAO_QUALIDADE + '/%22SepararSolicitacaoER%22';

    await axios.post(url, params)
        .then(async (response) => {
            requestResponse = response;
        });

    return requestResponse;
}

export const transbordReservedStock = async (op_codigo, er_codigo) => {    
    let requestResponse = [];

    const params = Global.formatRequestParams({
        op_codigo: op_codigo,
        er_codigo: er_codigo,
    });

    const url = (await Global.url()) + Global.Modules.GESTAO_QUALIDADE + '/TransbordoSolicitacaoER' + params;

    await axios.get(url)
        .then(async (response) => {
            requestResponse = response;
        });

    return requestResponse;
}

export const finishReservedStock = async (op_codigo, er_codigo) => {    
    let requestResponse = [];

    const params = Global.formatRequestParams({
        op_codigo: op_codigo,
        er_codigo: er_codigo,
    });

    const url = (await Global.url()) + Global.Modules.GESTAO_QUALIDADE + '/AtenderSolicitacaoER' + params;

    await axios.get(url)
        .then(async (response) => {
            requestResponse = response;
        });

    return requestResponse;
}