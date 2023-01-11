// Import csv-writer
const csvwriter = require('csv-writer');

  
var createCsvWriter = csvwriter.createObjectCsvWriter

const exportar = (local, nome, cabecalho, dados) =>{


    // Passing the column names intp the module
    const csvWriter = createCsvWriter({
    
        // Output csv file name is geek_data
        path: local+nome,
        header: cabecalho
    });
    // Writerecords function to add records
    csvWriter
    .writeRecords(dados)
    .then(()=> console.log('Data uploaded into csv successfully'));
}

const extrair3 = async ()=>{
    let dados = []
    let sql = ` select
    docfat.cliente_docfat as CLIENTE,
    p.razaosocial_pessoa as NOME,
    sum(docfat.vlrliquido_docfat) as VALOR
    from documento_fatura docfat
      left join pessoa p on (p.codigo_pessoa = docfat.cliente_docfat)
    where docfat.dtsaida_docfat between '04/15/2022' and  '10/16/2022'
  group by 1,2` 
    
    console.log('sql consulta banco: ', sql)
    
    try {
        dados = await ctrlFirebird.consultar(sql)
        return dados
    } catch (error) {
        console.log('Erro na consulta firebird: ', error)
        return error
    }
    
}




  

  
// Values for each column through an array
const results = [
  {
    id: '7058',
    name: 'Sravan Kumar Gottumukkala',
    age: 22
  }, {
    id: '7004',
    name: 'Sudheer',
    age: 29
  }, {
    id: '7059',
    name: 'Radha',
    age: 45
  },{
    id: '7060',
    name: 'vani',
    age: 34
  }
    
];

module.exports = { exportar, extrair3}