import { default as Model } from './model';

class RecebimentoNotaItem extends Model {
    _primary_key = 'pc_codigo';

    _fields = [
        'pc_codigo',
        'infe_descricao',
        'infe_quantidade',
        'infe_numero_nf',
        'infe_serie_nf',
        'pes_codigo',
        'infe_aprovado',
        'infe_codigo',
    ];

    constructor(values = {}) {
        super();
        this._parse(values);
    }
}

export default RecebimentoNotaItem;