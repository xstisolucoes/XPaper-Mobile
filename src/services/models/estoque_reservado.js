import { default as Model } from './model';

class EstoqueReservado extends Model {
    _primary_key = 'er_codigo';

    _fields = [
        'op_codigo',
        'ser_fila',
        'er_codigo',
        'pc_codigo',
        'pcf_codigo',
        'ser_processo',
        'ser_data_solicitacao',
        'referencia',
        'fantasia',
        'pc_medidas',
        'compos_descricao',
        'ser_data_solicitacao',
        'ser_quantidade',
        'ruas',
        'ser_status',
        'set_descricao',
    ];

    constructor(values = {}) {
        super();
        this._parse(values);
    }
}

export default EstoqueReservado;