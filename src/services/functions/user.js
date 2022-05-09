import * as Global from '../global';

const axios = require('axios');

export const buscaPermissoes = async (usu_codigo) => {    
    let requestResponse = [];

    const params = Global.formatRequestParams({
        usu_codigo: usu_codigo,
    });

    const url = (await Global.url()) + Global.Modules.GESTAO_QUALIDADE + '/BuscaPermissoesUsuario' + params;

    await axios.get(url)
        .then(async (response) => {
            requestResponse = response;
        });

    return requestResponse;
}

export const tryLogin = async (email, password) => {    
    let requestResponse = [];

    const params = Global.formatRequestParams({
        email   : email,
        password: password,
    });

    const url = (await Global.url()) + Global.Modules.GESTAO_QUALIDADE + '/LoginMobile' + params;

    await axios.get(url)
        .then(async (response) => {
            requestResponse = response;
        });

    return requestResponse;
}