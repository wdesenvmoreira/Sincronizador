--Cancelamentos NO PERIODO
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
and docfat.entrega_docfat = 'N'



