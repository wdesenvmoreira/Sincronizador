const Knex =  require('knex')

//Inserindo itens na tabela 
exports.seed = async function (knex) {
   return await knex('scripts').insert([
      {script:`select
      docfat.codigo_docfat as PEDIDOS ,
      docfat.cliente_docfat as CLIENTE,
      docfat.tipo_docfat as TIPO_PEDIDO,
      docfat.dtsaida_docfat as SAIDA,
      docfat.vlrbruto_docfat as VLR_BRUTO,
      docfat.vlrliquido_docfat as VLR_LIQUIDO,
      docfat.empresa_docfat as EMPRESA
      from documento_fatura docfat
      where docfat.dtsaida_docfat between '04/15/2022' and  '05/16/2022'
      order by docfat.empresa_docfat, docfat.cliente_docfat` , 
      titulo:'Faturamento Ultimos 30', 
      usuario:'Sistema', 
      inclusao:'01/01/2023',
      alteracao: '', 
      modulo:'Faturamento',
      status: 1}
      
   ])

           
            
}