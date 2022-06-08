import * as React from 'react';
import { default as ThemeContextProvider } from './themes';
import * as Theme from './themes';

import { default as ConfigurationsProvider } from './configurations';
import * as Configurations from './configurations';

import { default as SolicitacoesContextProvider } from './solicitacoes';
import * as Solicitacoes from './solicitacoes';

import { default as RecebimentosNotasContextProvider } from './recebimentos_notas';
import * as RecebimentosNotas from './recebimentos_notas';

import { default as RecebimentosNotasItensContextProvider } from './recebimentos_notas_itens';
import * as RecebimentosNotasItens from './recebimentos_notas_itens';

import { default as RecebimentosNotasChecklistContextProvider } from './recebimentos_notas_checklist';
import * as RecebimentosNotasChecklist from './recebimentos_notas_checklist';

import { default as RecebimentosNotasRefugoContextProvider } from './recebimentos_notas_refugos';
import * as RecebimentosNotasRefugo from './recebimentos_notas_refugos';

import { default as ProductAddressContextProvider } from './product_address';
import * as ProductAddress from './product_address';

import { default as EstoqueReservadoContextProvider } from './reserved_stock';
import * as EstoqueReservado from './reserved_stock';

import { default as InspecoesVeicularesContextProvider } from './inspecoes_veiculares';
import * as InspecoesVeiculares from './inspecoes_veiculares';

import { default as InspecoesVeicularesNotasContextProvider } from './inspecoes_veiculares_notas';
import * as InspecoesVeicularesNotas from './inspecoes_veiculares_notas';

import { default as InspecoesVeicularesChecklistContextProvider } from './inspecoes_veiculares_checklist';
import * as InspecoesVeicularesChecklist from './inspecoes_veiculares_checklist';

import { default as EstoqueProdutosContextProvider } from './estoque_produtos';
import * as EstoqueProdutos from './estoque_produtos';

import { default as UserContextProvider } from './user';
import * as User from './user';

class GlobalContext extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ThemeContextProvider>
                <ConfigurationsProvider>
                    <UserContextProvider>
                        <SolicitacoesContextProvider>
                            <RecebimentosNotasContextProvider>
                                <RecebimentosNotasItensContextProvider>
                                    <RecebimentosNotasChecklistContextProvider>
                                        <RecebimentosNotasRefugoContextProvider>
                                            <ProductAddressContextProvider>
                                                <EstoqueReservadoContextProvider>
                                                    <InspecoesVeicularesContextProvider>
                                                        <InspecoesVeicularesNotasContextProvider>
                                                            <InspecoesVeicularesChecklistContextProvider>
                                                                <EstoqueProdutosContextProvider>
                                                                    {this.props.children}
                                                                </EstoqueProdutosContextProvider>
                                                            </InspecoesVeicularesChecklistContextProvider>
                                                        </InspecoesVeicularesNotasContextProvider>
                                                    </InspecoesVeicularesContextProvider>
                                                </EstoqueReservadoContextProvider>
                                            </ProductAddressContextProvider>
                                        </RecebimentosNotasRefugoContextProvider>
                                    </RecebimentosNotasChecklistContextProvider>
                                </RecebimentosNotasItensContextProvider>
                            </RecebimentosNotasContextProvider>
                        </SolicitacoesContextProvider>
                    </UserContextProvider>
                </ConfigurationsProvider>
            </ThemeContextProvider>);
    }
}

export default GlobalContext;
export {
    Theme,
    Configurations,
    Solicitacoes,
    RecebimentosNotas,
    RecebimentosNotasItens,
    RecebimentosNotasChecklist,
    RecebimentosNotasRefugo,
    ProductAddress,
    EstoqueReservado,
    InspecoesVeiculares,
    InspecoesVeicularesNotas,
    InspecoesVeicularesChecklist,
    EstoqueProdutos,
    User
};