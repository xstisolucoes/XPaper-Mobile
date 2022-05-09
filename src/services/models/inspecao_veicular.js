import { default as Model } from './model';

class InspecaoVeicular extends Model {
    _primary_key = 'iv_codigo';

    _fields = [
        'iv_codigo',
        'iv_motorista_razao',
        'iv_motorista_cnh',
        'iv_motorista_cnh_validade',
        'iv_caminhao_placa',
        'iv_carreta_placa',
        'iv_transportadora_razao',
        'iv_data_cadastro',
        'iv_data_inspecao',
        'iv_status',
        'iv_assinatura_expedicao',
        'iv_assinatura_motorista',
    ];

    constructor(values = {}) {
        super();
        this._parse(values);
    }
}

export default InspecaoVeicular;