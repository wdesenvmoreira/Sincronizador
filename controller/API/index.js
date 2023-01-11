
const { consulta } = require('../../module/dbFirebird/firebird')
const consultaBD = require('../controllerFirebird')
//const ctrlIndicadores = require('../controllerIndicadores')



const consultar = (id, dados)=>{
    data = consultaBD.consultar(`
    select
    docfat.codigo_docfat as PEDIDOS ,
    docfat.cliente_docfat as CLIENTE,
    docfat.tipo_docfat as TIPO_PEDIDO,
    docfat.dtsaida_docfat as SAIDA,
    docfat.vlrbruto_docfat as VLR_BRUTO,
    docfat.vlrliquido_docfat as VLR_LIQUIDO,
    docfat.empresa_docfat as EMPRESA
    from documento_fatura docfat
    where docfat.dtsaida_docfat between '04/15/2022' and  '05/16/2022'
    order by docfat.empresa_docfat, docfat.cliente_docfat`)
    return data
}

const consultarDadosIndicador = async (id)=>{
    let sql = await ctrlIndicadores.findSQLById(id);   
    console.log('sql apos busca no cadastro do indicador: ', sql)
    data= await consultaBD.consultar(sql.dados)
    console.log('retorno da busca: ', data)
    return data
}

const consultarDetalhamentoindicador = async (id)=>{
    //let sql = await ctrlIndicadores.findSQLById(id); 
    let sqltemp = ` select
    docfat.cliente_docfat as CLIENTE,
    p.razaosocial_pessoa as NOME,
    sum(docfat.vlrliquido_docfat) as VALOR
    from documento_fatura docfat
      left join pessoa p on (p.codigo_pessoa = docfat.cliente_docfat)
    where docfat.dtsaida_docfat between '04/15/2022' and  '05/16/2022'
  group by 1,2`  
    let data = await consultaBD.consultar(sqltemp)
    
    return data
}
const consultarDetalhamentocliente = async (id)=>{
  //let sql = await ctrlIndicadores.findSQLById(id); 
  let sqltemp = `select
  docfat.codigo_docfat as PEDIDO,
  docfat.tipo_docfat as "CODIGO TIPO",
  (case docfat.tipo_docfat
        when 1 then 'Pedido'
        when 2 then 'Assistência'
        when 3 then 'Consignação'
        when 4 then 'Pedido de Industrialização'
        else 'Não Identificado'
  end) TIPO, 
  docfat.dtemissao_docfat as EMISSAO,
  docfat.dtsaida_docfat,
  docfat.cliente_docfat as CLIENTE,
  p.razaosocial_pessoa as NOME,
  docfat.vlrliquido_docfat as VALOR
  from documento_fatura docfat
    left join pessoa p on (p.codigo_pessoa = docfat.cliente_docfat)
  where docfat.dtsaida_docfat between '04/15/2022' and  '05/16/2022'
  and docfat.cliente_docfat = ${id}
  order by docfat.codigo_docfat `  
  let data = await consultaBD.consultar(sqltemp)
  
  return data
}



//module.exports = consultar
module.exports = { consultar, consultarDadosIndicador, consultarDetalhamentoindicador,consultarDetalhamentocliente }

