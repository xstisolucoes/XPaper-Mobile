import { default as Model } from './model';

class RecebimentoNotaChecklist extends Model {
    _primary_key = 'p_codigo';

    _fields = [
        'p_codigo',
        'p_descricao',
        'p_tipo',
        'p_value',
        'sub_perguntas',
    ];

    constructor(values = {}) {
        super();
        this._parse(values);
    }
}

export default RecebimentoNotaChecklist;