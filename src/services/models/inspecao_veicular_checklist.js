import { default as Model } from './model';

class InspecaoVeicularChecklist extends Model {
    _primary_key = 'iv_codigo';

    _fields = [
        'iv_codigo',
        'ic_codigo',
        'ic_lista',
        'ivcl_valor',
        'ic_texto',
        'ic_tipo',
    ];

    constructor(values = {}) {
        super();
        this._parse(values);
    }
}

export default InspecaoVeicularChecklist;