const knex = require('../database/connection') // Onde connection é o arquivo de conexão dentro da pasta database
const bcrypt = require('bcryptjs')
//const flash = require('connect-flash')
const localStrategy = require('passport-local').Strategy 
const passport = require('passport')
const ctrlFirebird = require('.//controllerFirebird')

const extrair = async ()=>{
    let dados = []
    let sql = `select
    docfat.empresa_docfat as "Empresa",
    docfat.codigo_docfat as "Codigo Cancelamento",
    pedidov.codigo_docfat as "Pedido Cancelado",
     extract(day from docfat.dtemissao_docfat) || '/'||extract(month from docfat.dtemissao_docfat) ||'/'||extract(year from docfat.dtemissao_docfat) as "Emissao Cancelamento",
     extract(day from pedidov.dtemissao_docfat) || '/'||extract(month from pedidov.dtemissao_docfat) ||'/'||extract(year from pedidov.dtemissao_docfat) as "Emissao Pedido",
     pcliente.razaosocial_pessoa as "Nome Cliente",
     grupocliente.codigo_grupo as "Codigo Grupo",
     grupocliente.descricao_grupo as "Grupo Cliente",
     ufcliente.sigla_uf as "UF Cliente",
     pconsultor.codigo_pessoa as "Codigo Consultor",
     pconsultor.razaosocial_pessoa as "Nome Consultor",
     did.autoinc_docitemdet as "ID Detalhamento",
     did.item_docitemdet as "Item",
     did.variacao_docitemdet as "Variacao",
     varitem.descricao_variacao as "Descricao Variacao",
     did.acabamento_docitemdet as "Acabamento",
     acabitem.descricao_acabamento as "Descricao Acabamento",
     did.cor_docitemdet as "Cor",
     coritem.descricao_cor as "Descricao Cor",
     did.qtdechapas_docitemdet as "Qtd de Itens",
     did.vlrunitariobruto_docitemdet as "Vlr Bruto Unit Item",
     did.vlrtotalbruto_docitemdet as "Vlr Total Bruto",
     did.vlrunitarioliquido_docitemdet as "Vlr Liq Unit Item",
     did.vlrtotalliquido_docitemdet as "Vlr Total Liq"
    from documento_devolucaocancela doccanc
    left join documento_fatura docfat on (docfat.codigo_docfat = doccanc.documento_docdev)
    left join documento_item_detalhe did on (did.autoinc_docitemdet = doccanc.autoincitemdetdoc_docdev)
    left join documento_fatura pedidov on (pedidov.codigo_docfat = did.documento_docitemdet)
     left join pessoa pcliente on (pcliente.codigo_pessoa = docfat.cliente_docfat)
        left join documento_comissao doccom on (doccom.documento_doccom = pedidov.codigo_docfat)
        left join pessoa pconsultor on (pconsultor.codigo_pessoa = doccom.pessoa_doccom)
        left join grupo grupocliente on (grupocliente.codigo_grupo = pcliente.grupo_pessoa)
        left join pessoa_endereco pcliend on (pcliend.pessoa_pessoa_end = pcliente.codigo_pessoa)
        left join cidade cidadecliente on (cidadecliente.codigo_cidade = pcliend.cidade_pessoa_end)
        left join uf ufcliente on (ufcliente.codigo_uf = cidadecliente.uf_cidade)
        left join variacao varitem on (varitem.codigo_variacao = did.variacao_docitemdet)
        left join acabamento acabitem on (acabitem.codigo_acabamento = did.acabamento_docitemdet)
        left join cor coritem on (coritem.codigo_cor = did.cor_docitemdet)
    where  docfat.dtemissao_docfat between '12/01/2022 00:00:00' and '12/02/2022 23:59:59:999'  --cancelamentos emitidos entre
    and pedidov.dtemissao_docfat between '09/23/2022 00:00:00' and '12/02/2022 23:59:59:999'   --pedidos emitidos entre
    and docfat.opcao_docfat = 2
    and docfat.entrega_docfat = 'N'`
    
    console.log('sql consulta banco: ', sql)
    
    try {
        dados = await ctrlFirebird.consultar(sql)
        return dados
    } catch (error) {
        console.log('Erro na consulta firebird: ', error)
        return error
    }
    
}
const extrair2 = async ()=>{
    let dados = []
    let sql = `
    select
    ENTREGA.empresa_docfat as empresa,
   -- extract (Month from  ENTREGA.dtemissao_docfat) as mes,
    PEDIDO.codigo_docfat as "Pedido",
    ENTREGA.codigo_docfat as "Codigo Entrega",
    ENTREGA.dtsaida_docfat as "Saida",
    PEDIDO.dtemissao_docfat as "Emissao Pedido",
    ENTREGA.cliente_docfat as "Codigo Cliente",
    pcliente.razaosocial_pessoa as "Nome Cliente",
    grupocliente.codigo_grupo as "Codigo Grupo",
    grupocliente.descricao_grupo as "Grupo Cliente",
    ufcliente.sigla_uf as "UF Cliente",
    pconsultor.codigo_pessoa as "Codigo Consultor",
    pconsultor.razaosocial_pessoa as "Nome Consultor",
    did.autoinc_docitemdet as "ID Detalhamento",
    did.item_docitemdet as "Item",
    did.qtdechapas_docitemdet as "Qtd de Itens",
    did.qtdefaturado_docitemdet as "Qtd Itens Faturados",
    did.qtdedevolvido_docitemdet as "Qtd Itens Devolvido",
    did.qtdecancelado_docitemdet as "Qtd Itens Cancelados",
    did.variacao_docitemdet as "Variacao",
    varitem.descricao_variacao as "Descricao Variacao",
    did.acabamento_docitemdet as "Acabamento",
    acabitem.descricao_acabamento "Descricao Acabamento",
    did.cor_docitemdet as "Cor",
    coritem.descricao_cor as "Descricao Cor",
    did.vlrunitariobruto_docitemdet as "Vlr Bruto Unit Item",
    did.vlrtotalbruto_docitemdet as "Vlr Total Bruto",
    did.vlrunitarioliquido_docitemdet as "Vlr Liq Unit Item",
    did.vlrtotalliquido_docitemdet as "Vlr Total Liq",
    did.vlrtotaldest_docitemdet as "Desconto do Item",
    ENTREGA.vlrbruto_docfat as "Valor Bruto Entrega",
    PEDIDO.vlrbruto_docfat as "Valor Bruto PEDIDO",
    ENTREGA.vlrliquido_docfat as  "Valor Liquido Entrega",
    ENTREGA.vlrdescontototal_docfat as "Valor Desconto Entrega"
   
    from documento_fatura ENTREGA
   
   
       left join pessoa pcliente on (pcliente.codigo_pessoa = ENTREGA.cliente_docfat)
   
   
       left join grupo grupocliente on (grupocliente.codigo_grupo = pcliente.grupo_pessoa)
       left join pessoa_endereco pcliend on (pcliend.pessoa_pessoa_end = pcliente.codigo_pessoa)
       left join cidade cidadecliente on (cidadecliente.codigo_cidade = pcliend.cidade_pessoa_end)
       left join uf ufcliente on (ufcliente.codigo_uf = cidadecliente.uf_cidade)
   
       left join documento_entrega docentrega on (docentrega.documento_docent = ENTREGA.codigo_docfat)
   
       left join documento_fatura PEDIDO on (pedido.codigo_docfat = docentrega.autoincdoc_docent)
       left join documento_comissao doccom on (doccom.documento_doccom = PEDIDO.codigo_docfat)
       left join pessoa pconsultor on (pconsultor.codigo_pessoa = doccom.pessoa_doccom)
       left join documento_item_detalhe did on (did.documento_docitemdet = PEDIDO.codigo_docfat)
       left join variacao varitem on (varitem.codigo_variacao = did.variacao_docitemdet)
       left join acabamento acabitem on (acabitem.codigo_acabamento = did.acabamento_docitemdet)
       left join cor coritem on (coritem.codigo_cor = did.cor_docitemdet)
   where  -- docfat.dtemissao_docfat between '12/01/2022 00:00:00' and '12/31/2022 23:59:59:999'
       ENTREGA.dtsaida_docfat >= '12/01/2022 00:00:00:000'
       and ENTREGA.dtsaida_docfat <= '12/02/2022 23:59:59:999'
       and ENTREGA.entrega_docfat = 'S'
       and ENTREGA.tipo_docfat = 1
       and ENTREGA.opcao_docfat in(1,3)
       and pcliend.tipoendereco_pessoa_end = 1
       and not ENTREGA.status_docfat = 1
       and ENTREGA.efetivacaovendaordem_docfat = 'N'
   
   order by 1,2,3`
    
    console.log('sql consulta banco: ', sql)
    
    try {
        dados = await ctrlFirebird.consultar(sql)
        return dados
    } catch (error) {
        console.log('Erro na consulta firebird: ', error)
        return error
    }
    
}

const extrair3 = async ()=>{
    let dados = []
    let sql = `select
    docfat.empresa_docfat as empresa,
    docfat.cliente_docfat as "Codigo Cliente",
    docfat.codigo_docfat as "Codigo Pedido",
    extract(day from docfat.dtemissao_docfat) || '/'||extract(month from docfat.dtemissao_docfat) ||'/'||extract(year from docfat.dtemissao_docfat) as "Emissao",
    pcliente.razaosocial_pessoa as "Nome Cliente",
    grupocliente.codigo_grupo as "Codigo Grupo",
    grupocliente.descricao_grupo as "Grupo Cliente",
    ufcliente.sigla_uf as "UF Cliente",
    pconsultor.codigo_pessoa as "Codigo Consultor",
    pconsultor.razaosocial_pessoa as "Nome Consultor",
    did.autoinc_docitemdet as "ID Detalhamento",
    did.item_docitemdet as "Item",
    did.qtdechapas_docitemdet as "Qtd de Itens",
    did.qtdefaturado_docitemdet as "Qtd Itens Faturados",
    did.qtdedevolvido_docitemdet as "Qtd Itens Devolvido",
    did.qtdecancelado_docitemdet as "Qtd Itens Cancelados",
    did.variacao_docitemdet,
    varitem.descricao_variacao,
    did.acabamento_docitemdet,
    acabitem.descricao_acabamento,
    did.cor_docitemdet,
    coritem.descricao_cor,
    did.vlrunitariobruto_docitemdet as "Vlr Bruto Unit Item",
    did.vlrtotalbruto_docitemdet as "Vlr Total Bruto",
    did.vlrunitarioliquido_docitemdet as "Vlr Liq Unit Item",
    did.vlrtotalliquido_docitemdet as "Vlr Total Liq",
    did.vlrtotaldest_docitemdet,
    docfat.vlrbruto_docfat as Bruto,
    docfat.vlrliquido_docfat as Liquido,
    docfat.vlrdescontototal_docfat as Desconto
   
    from documento_fatura docfat
   
       left join documento_item_detalhe did on (did.documento_docitemdet = docfat.codigo_docfat)
       left join pessoa pcliente on (pcliente.codigo_pessoa = docfat.cliente_docfat)
       left join documento_comissao doccom on (doccom.documento_doccom = docfat.codigo_docfat)
       left join pessoa pconsultor on (pconsultor.codigo_pessoa = doccom.pessoa_doccom)
       left join grupo grupocliente on (grupocliente.codigo_grupo = pcliente.grupo_pessoa)
       left join pessoa_endereco pcliend on (pcliend.pessoa_pessoa_end = pcliente.codigo_pessoa)
       left join cidade cidadecliente on (cidadecliente.codigo_cidade = pcliend.cidade_pessoa_end)
       left join uf ufcliente on (ufcliente.codigo_uf = cidadecliente.uf_cidade)
       left join variacao varitem on (varitem.codigo_variacao = did.variacao_docitemdet)
       left join acabamento acabitem on (acabitem.codigo_acabamento = did.acabamento_docitemdet)
       left join cor coritem on (coritem.codigo_cor = did.cor_docitemdet)
   
   where  -- docfat.dtemissao_docfat between '12/01/2022 00:00:00' and '12/31/2022 23:59:59:999'
       docfat.dtemissao_docfat >= '12/01/2022 00:00:00:000'
       and docfat.dtemissao_docfat <= '12/02/2022 23:59:59:999'
       and docfat.entrega_docfat = 'N'
       and docfat.tipo_docfat = 1
       and docfat.opcao_docfat in(1,3)
       and pcliend.tipoendereco_pessoa_end = 1
       and not docfat.status_docfat = 1
   
   order by 1,2,3,4` 
    
    console.log('sql consulta banco: ', sql)
    
    try {
        dados = await ctrlFirebird.consultar(sql)
        return dados
    } catch (error) {
        console.log('Erro na consulta firebird: ', error)
        return error
    }
    
}


module.exports = { extrair, extrair2, extrair3}