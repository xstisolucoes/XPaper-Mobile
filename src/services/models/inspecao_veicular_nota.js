import { default as Model } from './model';

class InspecaoVeicularNota extends Model {
    _primary_key = 'iv_codigo';

    _fields = [
        'iv_codigo',
        'ivnfs_codigo',
        'nfs_codigo',
        'nfs_cliente',
    ];

    constructor(values = {}) {
        super();
        this._parse(values);
    }
}

export default InspecaoVeicularNota;