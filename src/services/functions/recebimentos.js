import * as Global from '../global';
const axios = require('axios');

export const getAllNotes = async (filters) => {
    let requestResponse = [];

    const params = Global.formatRequestParamsBody({
        filters: filters,
    });

    const url = (await Global.url()) + Global.Modules.GESTAO_QUALIDADE + '/%22BuscaInspecaoRecebimento%22';

    await axios.post(url, params)
        .then(async (response) => {
            requestResponse = response;
        });

    return requestResponse;
}

export const getAllNotesItens = async (nfe_codigo) => {
    let requestResponse = [];

    const params = Global.formatRequestParams({
        nfe_codigo: nfe_codigo,
    });

    const url = (await Global.url()) + Global.Modules.GESTAO_QUALIDADE + '/BuscaItensInspecaoRecebimento' + params;

    await axios.get(url)
        .then(async (response) => {
            requestResponse = response;
        });

    return requestResponse;
}

export const getAllNotesChecklist = async (nfe_codigo, infe_codigo) => {
    let requestResponse = [];

    const params = Global.formatRequestParams({
        nfe_codigo : nfe_codigo,
        infe_codigo: infe_codigo,
    });

    const url = (await Global.url()) + Global.Modules.GESTAO_QUALIDADE + '/BuscaItensInspecaoRecebimentoCheckList' + params;

    await axios.get(url)
        .then(async (response) => {
            requestResponse = response;
        });

    return requestResponse;
}

export const getAllNotesRefugo = async (nfe_codigo, nfe_serie, pes_codigo, infe_codigo) => {
    let requestResponse = [];

    const params = Global.formatRequestParams({
        infe_codigo: infe_codigo,
        nfe_codigo : nfe_codigo,
        pes_codigo : pes_codigo,
        nfe_serie  : nfe_serie,
    });

    const url = (await Global.url()) + Global.Modules.GESTAO_QUALIDADE + '/BuscaMotivosRefugo' + params;

    await axios.get(url)
        .then(async (response) => {
            requestResponse = response;
        });

    return requestResponse;
}

export const saveInspecao = async (nfe_codigo, nfe_serie, pes_codigo, infe_codigo, pc_codigo, perguntas, refugos, rua_codigo) => {
    let requestResponse = [];

    const params = Global.formatRequestParamsBody({
        nfe_codigo : nfe_codigo,
        nfe_serie  : nfe_serie,
        pes_codigo : pes_codigo,
        infe_codigo: infe_codigo,
        pc_codigo  : pc_codigo,
        perguntas  : perguntas,
        refugos    : refugos,
        rua_codigo : rua_codigo,
    });

    const url = (await Global.url()) + Global.Modules.GESTAO_QUALIDADE + '/%22SalvarInspecaoRecebimento%22/';

    await axios.post(url, params)
        .then(async (response) => {
            requestResponse = response;
        });

    return requestResponse;
}

export const getAllProductAddress = async (emp_codigo, pc_codigo, pcf_codigo) => {
    let requestResponse = [];

    const params = Global.formatRequestParams({
        emp_codigo: emp_codigo,
        pc_codigo : pc_codigo,
        pcf_codigo: pcf_codigo,
    });

    const url = (await Global.url()) + Global.Modules.GESTAO_QUALIDADE + '/BuscarRuas' + params;

    await axios.get(url)
        .then(async (response) => {
            requestResponse = response;
        });

    return requestResponse;
}

export const concludeNote = async (nfe_codigo, nfe_serie, pes_codigo) => {
    let requestResponse = [];

    const params = Global.formatRequestParams({
        nfe_codigo : nfe_codigo,
        nfe_serie  : nfe_serie,
        pes_codigo : pes_codigo,
    });

    const url = (await Global.url()) + Global.Modules.GESTAO_QUALIDADE + '/ConcluirNotaFiscal' + params;

    await axios.get(url)
        .then(async (response) => {
            requestResponse = response;
        });

    return requestResponse;
}