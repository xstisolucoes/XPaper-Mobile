import * as Global from '../global';
const axios = require('axios');

export const getAllInspections = async (filters) => {
    let requestResponse = [];

    const params = Global.formatRequestParamsBody({
        filters: filters,
    });

    const url = (await Global.url()) + Global.Modules.GESTAO_QUALIDADE + '/%22BuscaInspecaoVeicular%22';

    await axios.post(url, params)
        .then(async (response) => {
            requestResponse = response;
        });

    return requestResponse;
}

export const getInspectionNotas = async (iv_codigo) => {
    let requestResponse = [];

    const params = Global.formatRequestParams({
        iv_codigo: iv_codigo,
    });

    const url = (await Global.url()) + Global.Modules.GESTAO_QUALIDADE + '/BuscaInspecaoVeicularNotasFiscais' + params;

    await axios.get(url)
        .then(async (response) => {
            requestResponse = response;
        });

    return requestResponse;
}

export const getInspectionChecklist = async (iv_codigo) => {
    let requestResponse = [];

    const params = Global.formatRequestParams({
        iv_codigo: iv_codigo,
    });

    const url = (await Global.url()) + Global.Modules.GESTAO_QUALIDADE + '/BuscaInspecaoVeicularCheckList' + params;

    await axios.get(url)
        .then(async (response) => {
            requestResponse = response;
        });

    return requestResponse;
}

export const saveInspection = async (iv_codigo, iv_status, iv_assinatura_responsavel, iv_assinatura_motorista, iv_checklist) => {
    let requestResponse = [];

    const params = Global.formatRequestParamsBody({
        iv_codigo                : iv_codigo,
        iv_status                : iv_status,
        iv_assinatura_responsavel: iv_assinatura_responsavel,
        iv_assinatura_motorista  : iv_assinatura_motorista,
        iv_checklist             : iv_checklist,
    });

    const url = (await Global.url()) + Global.Modules.GESTAO_QUALIDADE + '/%22SalvarInspecaoVeicular%22/';

    await axios.post(url, params)
        .then(async (response) => {
            requestResponse = response;
        });

    return requestResponse;
}