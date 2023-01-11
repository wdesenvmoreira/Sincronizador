--PEDIDOS NO PERIODO
-- Total faturado de um período
-- Total vendido de um período
-- Filtar por:
--    - UF
--    - Consultor
--    - Cliente
--    - Grupo de clientes
--    - Produto
--    - Cor do produto


-- Script lista os valors de dos pedidos de vendas de um periodo com cliente, uf do cliente, grupo do cliente e consultor,
-- listando os itens detalhado por suas diferenciações  variação, acabamento e cor com os valores dos itens.
select
 docfat.empresa_docfat as empresa,
 docfat.cliente_docfat as "Codigo Cliente",
-- extract (Month from  docfat.dtemissao_docfat) as mes,
 docfat.codigo_docfat as "Codigo Pedido",
 extract(day from docfat.dtemissao_docfat) || '/'||extract(month from docfat.dtemissao_docfat) ||'/'||extract(year from docfat.dtemissao_docfat) as "Emissao ",
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

order by 1,2,3,4


