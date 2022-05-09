import { default as Model } from './model';

class ProdutoRua extends Model {
    _primary_key = 're_codigo';

    _fields = [
        're_codigo',
        'emp_codigo',
        're_nome',
        'cr_quantidade',
        're_quantidade',
    ];

    constructor(values = {}) {
        super();
        this._parse(values);
    }
}

export default ProdutoRua;