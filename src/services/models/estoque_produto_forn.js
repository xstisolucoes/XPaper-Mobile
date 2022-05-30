import { default as Model } from './model';

class EstoqueProdutoForn extends Model {
    _primary_key = 'pc_codigo';

    _fields = [
        'pc_codigo',
        'pcf_codigo',
        'pcf_status',
        'pes_razao',
        'pes_fantasia',
        'pcf_quantidade',
        'pcf_ruas',
    ];

    constructor(values = {}) {
        super();
        this._parse(values);
    }
}

export default EstoqueProdutoForn;