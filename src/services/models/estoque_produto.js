import { default as Model } from './model';

class EstoqueProduto extends Model {
    _primary_key = 'pc_codigo';

    _fields = [
        'pc_codigo',
        'pc_descricao_completa',
        'pc_descricao',
        'pc_medidas',
        'pc_composicao',
        'pc_vincos',
        'pc_quantidade',
        'pc_ruas',
        'pc_status',
    ];

    constructor(values = {}) {
        super();
        this._parse(values);
    }
}

export default EstoqueProduto;