import { default as Model } from './model';

class RecebimentoNota extends Model {
    _primary_key = 'nfe_numero';

    _fields = [
        'nfe_numero',
        'nfe_serie',
        'pes_codigo',
        'nfe_data_entrada',
        'nfe_inspecao_concluida',
        'pes_fantasia',
        'pes_razao',
        'nfe_inspecao_status',
        'infe_count',
    ];

    constructor(values = {}) {
        super();
        this._parse(values);
    }
}

export default RecebimentoNota;