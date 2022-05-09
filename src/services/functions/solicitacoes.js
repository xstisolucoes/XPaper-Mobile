import * as Global from '../global';

const axios = require('axios');

export const getAll = async (filters) => {    
    let requestResponse = [];

    const params = Global.formatRequestParamsBody({
        filters: filters,
    });

    const url = (await Global.url()) + Global.Modules.GESTAO_QUALIDADE + '/%22BuscaSolicitacoes%22';

    await axios.post(url, params)
        .then(async (response) => {
            requestResponse = response;
        });

    return requestResponse;
}

export const atenderSolicitacao = async (solicitacao) => {
    let requestResponse = [];

    const params = Global.formatRequestParams({
        codigo: solicitacao['sol_codigo'],
        justificativa: solicitacao['sol_justificativa'],
    });

    const url = (await Global.url()) + Global.Modules.GESTAO_QUALIDADE + '/AtenderSolicitacao' + params;

    await axios.get(url)
        .then(async (response) => {
            requestResponse = response;
        });

    return requestResponse;
}