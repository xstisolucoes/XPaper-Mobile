import { default as Model } from './model';

class Solicitacao extends Model {
    _primary_key = 'sol_codigo';

    _fields = [
        'sol_codigo',
        'sol_setor_solicitado',
        'sol_data_solicitacao',
        'sol_solicitante',
        'sol_status',
        'sol_setor_para',
        'sol_descricao_solicitacao',
        'sol_data_atendimento',
        'sol_justificativa',
        'sol_maquina',
        'pes_razao',
        'pes_fantasia',
        'set_descricao',
    ];

    constructor(values = {}) {
        super();
        this._parse(values);
    }
}

export default Solicitacao;