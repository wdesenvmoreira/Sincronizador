--FATURAMENTO NO PERIODO
/*
Um pedido de venda quando é faturado gera uma entrega. O pedido pode ser faturado mais de uma vez
geranda para cadas faturamento uma outra entrega.
O item detalhe é vinculado ao pedido de venda. porem a entrega possui o vinculo com item detalhe.
Quando é feita a consulta buscando o id item detalhe todas as entregas deste id são informadas.
Outro campos que podem interferir é a data da entrega
Neste banco na busca houve mais de uma entrega porem todas na mesma data. então pude fazer um somatório
e gerar um único registro para as entregas. Já para outros bancos precisaremos revisar.
*/
select
      did.autoinc_docitemdet as "ID",
     entrega.codigo_docfat as "Codigo Pedido",
     sum(did.vlrtotalbruto_docitemdet) as "Valor",
     entrega.dtsaida_docfat  as "Data",
     ufcliente.sigla_uf as "UF",
     pconsultor.codigo_pessoa as "Codigo Consultor",
     pconsultor.razaosocial_pessoa as "Nome Consultor",
     entrega.cliente_docfat as "Codigo Cliente",
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
 from documento_fatura ENTREGA
    left join pessoa pcliente on (pcliente.codigo_pessoa = ENTREGA.cliente_docfat)
    left join grupo grupocliente on (grupocliente.codigo_grupo = pcliente.grupo_pessoa)
    left join pessoa_endereco pcliend on (pcliend.pessoa_pessoa_end = pcliente.codigo_pessoa)
    left join cidade cidadecliente on (cidadecliente.codigo_cidade = pcliend.cidade_pessoa_end)
    left join uf ufcliente on (ufcliente.codigo_uf = cidadecliente.uf_cidade)
    left join documento_entrega docentrega on (docentrega.documento_docent = ENTREGA.codigo_docfat)
    left join documento_fatura PEDIDO on (pedido.codigo_docfat = docentrega.autoincdoc_docent)
    left join documento_comissao doccom on (doccom.documento_doccom = pedido.codigo_docfat and doccom.tipopessoa_doccom = 0 and doccom.principal_doccom = 'S')
    left join pessoa pconsultor on (pconsultor.codigo_pessoa = doccom.pessoa_doccom)
    left join documento_item_detalhe did on (did.documento_docitemdet = PEDIDO.codigo_docfat)
    left join variacao varitem on (varitem.codigo_variacao = did.variacao_docitemdet)
    left join acabamento acabitem on (acabitem.codigo_acabamento = did.acabamento_docitemdet)
    left join cor coritem on (coritem.codigo_cor = did.cor_docitemdet)
    left join item i on (i.codigo_item = did.item_docitemdet)
where
    ENTREGA.dtsaida_docfat >= '01/01/2022 00:00:00:000' and ENTREGA.dtsaida_docfat <= '12/31/2022 23:59:59:999'
    and ENTREGA.entrega_docfat = 'S'
    and pedido.tipo_docfat = 1
    and ENTREGA.opcao_docfat in(1,3)
    and pcliend.tipoendereco_pessoa_end = 1
    and not ENTREGA.status_docfat = 1
    and ENTREGA.efetivacaovendaordem_docfat = 'N'

group by  1,2, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19






