const jwt = require('jsonwebtoken')
//const jwtSecret = 'secreta'
const jwtSecret = require('../config/config.json').secret
const ctrlExtrair = require('..//controller/controllerExtrair')
const ctrlExportar = require('..//controller/controllerExportar')
const rotaExtrair = (app) =>{
    app.use(async(req, res, next)=>{

        const token = req.session.token;

        if(token){
            try {
                const payload = jwt.verify(token, jwtSecret)
                if(payload.edicao = 1){
                  next();  
                }else{
                    console.log('Não possui permissão para acessar esta pagina. Retornando para : ',req.headers.host+'\\'+req.path)
                   res.redirect(req.headers.host+'\\'+req.path);
                }
                
            } catch (error) {
                res.render('login',{message: 'Erro ao acessar. Acesse novamente.'});
            }
        }else{
           
            res.render('login',{message: 'Realize o login.'})
        }
    });



    app.get('/extrair/1',async(req, res)=>{

        let totais = []
        let retorno 

        let dados  = await ctrlExtrair.extrair()
        console.log('dados na rota Extrair: ', dados)

        // for (let index = 0; index < dados.length; index++) {
        //     const element = dados[index].cod_analitico;
        //     retorno = await ctrlSaldoItensLD.SaldoItem(element)
        //     totais.push(retorno)
        // }

       
        res.json(dados)

}) 
app.get('/extrair/2',async(req, res)=>{

    let dados  = await ctrlExtrair.extrair2()
    console.log('dados na rota Extrair: ', dados)

    let cabecalho = []
    for (let index = 0; index < 1; index++) {
        const element = Object.keys(dados[0])
        for(let index = 0; index < element.length; index++){
            cabecalho.push({id:element[index], title:element[index]})
        }
  
        
    }
        
    const nome = 'Faturados.csv'
    const local = './exports/'
   
   ctrlExportar.exportar(local, nome, cabecalho, dados);
}) 
app.get('/extrair/3',async(req, res)=>{

    let dados  = await ctrlExtrair.extrair()
    console.log('dados na rota Extrair: ', dados)

    let cabecalho = []
    for (let index = 0; index < 1; index++) {
        const element = Object.keys(dados[0])
        for(let index = 0; index < element.length; index++){
            cabecalho.push({id:element[index], title:element[index]})
        }
  
        
    }
        
    const nome = 'Cancelados.csv'
    const local = './exports/'
   
   ctrlExportar.exportar(local, nome, cabecalho, dados);

})

app.get('/extrair/4',async(req, res)=>{

   let dados  = await ctrlExtrair.extrair3()
    console.log('dados na rota Extrair: ', dados)

    let cabecalho = []
    for (let index = 0; index < 1; index++) {
        const element = Object.keys(dados[0])
        for(let index = 0; index < element.length; index++){
            cabecalho.push({id:element[index], title:element[index]})
        }
  
        
    }
        
    const nome = 'PedidosVenda.csv'
    const local = './exports/'
   
   ctrlExportar.exportar(local, nome, cabecalho, dados);


}) 



}

module.exports = rotaExtrair