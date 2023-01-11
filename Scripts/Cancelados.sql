--Cancelamentos NO PERIODO
-- Total faturado de um per?odo
-- Total vendido de um per?odo
-- Filtar por:
--    - UF
--    - Consultor
--    - Cliente
--    - Grupo de clientes
--    - Produto
--    - Cor do produto


-- Script lista os valors de dos pedidos de vendas de um periodo com cliente, uf do cliente, grupo do cliente e consultor,
-- listando os itens detalhado por suas diferencia??es  varia??o, acabamento e cor com os valores dos itens.
select
     did.autoinc_docitemdet as "ID",
     docfat.codigo_docfat as "Codigo Pedido",
     did.vlrtotalbruto_docitemdet as "Valor",
     docfat.dtemissao_docfat  as "Data",
     ufcliente.sigla_uf as "UF",
--     pconsultor.codigo_pessoa as "Codigo Consultor",     -- Retira caso não for trabalhar com consultor na consulta
--     pconsultor.razaosocial_pessoa as "Nome Consultor",  -- Retira caso não for trabalhar com consultor na consulta
     docfat.cliente_docfat as "Codigo Cliente",
     pcliente.razaosocial_pessoa as "Nome Cliente",
     grupocliente.codigo_grupo as "Codigo Grupo",
     grupocliente.descricao_grupo as "Nome Grupo",
     did.item_docitemdet as "Produto",
     i.descricao_item as "Nome Produto",
     did.variacao_docitemdet as "Codigo Variacao",
     varitem.descricao_variacao as "Nome Variacao",
     did.acabamento_docitemdet as "Codigo Acabamento",
     acabitem.descricao_acabamento as "Nome Acabamento",
     did.cor_docitemdet as "Codigo Cor",
     coritem.descricao_cor as "Nome Cor"
from documento_devolucaocancela doccanc
    left join documento_fatura docfat on (docfat.codigo_docfat = doccanc.documento_docdev)
    left join documento_item_detalhe did on (did.autoinc_docitemdet = doccanc.autoincitemdetdoc_docdev)
    left join pessoa pcliente on (pcliente.codigo_pessoa = docfat.cliente_docfat)
   -- left join documento_comissao doccom on (doccom.documento_doccom = pedidov.codigo_docfat)
  --  left join pessoa pconsultor on (pconsultor.codigo_pessoa = doccom.pessoa_doccom)
    left join grupo grupocliente on (grupocliente.codigo_grupo = pcliente.grupo_pessoa)
    left join pessoa_endereco pcliend on (pcliend.pessoa_pessoa_end = pcliente.codigo_pessoa)
    left join cidade cidadecliente on (cidadecliente.codigo_cidade = pcliend.cidade_pessoa_end)
    left join uf ufcliente on (ufcliente.codigo_uf = cidadecliente.uf_cidade)
    left join variacao varitem on (varitem.codigo_variacao = did.variacao_docitemdet)
    left join acabamento acabitem on (acabitem.codigo_acabamento = did.acabamento_docitemdet)
    left join cor coritem on (coritem.codigo_cor = did.cor_docitemdet)
    left join item i on (i.codigo_item = did.item_docitemdet)
where  docfat.dtemissao_docfat between '01/01/2022 00:00:00' and '05/31/2022 23:59:59:999'  --cancelamentos emitidos entre
   and  pcliend.tipoendereco_pessoa_end = 1
   and docfat.opcao_docfat = 2
   and docfat.tipo_docfat = 1
   and docfat.entrega_docfat = 'N'
   and not docfat.status_docfat = 1




