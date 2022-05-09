import { default as Model } from './model';

class RecebimentoNotaRefugo extends Model {
    _primary_key = 'mo_codigo';

    _fields = [
        'mo_codigo',
        'mo_descricao',
        'infer_quantidade',
    ];

    constructor(values = {}) {
        super();
        this._parse(values);
    }
}

export default RecebimentoNotaRefugo;