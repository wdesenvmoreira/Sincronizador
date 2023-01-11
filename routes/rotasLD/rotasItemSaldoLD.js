const jwt = require('jsonwebtoken')
//const jwtSecret = 'secreta'
const jwtSecret = require('../../config/config.json').secret
const ctrlSaldoItensLD = require('../../controller/LD/controllerSaldoItensLD')
const rotaItemSaldoLD = (app) =>{
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

  app.get('/LD/Saldo',(req, res) => {
        res.render('LD/itemSaldoLD')
    }) 

    app.get('/LD/Saldo/api/Itens/:codProduto',async(req, res)=>{

        let totais = []
        let retorno 

        let dados  = await ctrlSaldoItensLD.BuscarDados(req.params.codProduto)
        console.log('dados na rota: ', dados)

        for (let index = 0; index < dados.length; index++) {
            const element = dados[index].cod_analitico;
            retorno = await ctrlSaldoItensLD.SaldoItem(element)
            totais.push(retorno)
        }

       
        res.json(dados)

}) 

app.get('/LD/Saldo/api/ItemSaldo/:cod_analitico&:status',async(req, res)=>{
    console.log(req.params.cod_analitico, req.params.status)
    let dados  = await ctrlSaldoItensLD.SaldoItem(req.params.cod_analitico, req.params.status)
    console.log('dados na rota: ', dados)

    res.json(dados)

})

app.post('/LD/Saldo/api/ItemSaldo/Sair',async(req, res)=>{
    console.log('req.body: ',req.body.dados.quantidade)
    let cod_analitico = req.body.dados.cod_analitico
    let quantidade = req.body.dados.quantidade
    console.log('quantidade a ser estornada: ', quantidade)
    let retorno  = await ctrlSaldoItensLD.SaidaItem(cod_analitico, quantidade)
    console.log('Retorno da saída do item ', retorno)

    res.json(retorno)

}) 


 
//   app.get('/LD/Saldo/api/:id',async(req, res)=>{
//       console.log('dadosPesquisa:', dadosPesquisa)
//         if(req.params.id === 'Todos'){
//             let retorno = await ctrlStatusLD.findAll()
//             console.log('retorno Todos: ', retorno)
//             res.json(retorno)
//         }else{
//             let retorno = await ctrlStatusLD.findByStatus(req.params.id)
//             console.log('retorno api status: ', retorno)
//             res.json(retorno) 
//         }
       
//     }) 

 

//     app.post('/LD/Status/Incluir', async(req, res) => {

//         const dado = { ...req.body}
//         const incluir = await ctrlStatusLD.create(dado)
//             res.json(incluir)
        
        
//     })

//     app.post('/LD/Status/Alterar', async(req, res)=>{
//         console.log('Rota alterando status: ', req.body)
//         let alterar = await ctrlStatusLD.update(req.body.id, req.body)
//         if(alterar){
//             res.json(alterar)
//         }else{
//             res.send('Registro não alterado. ')
//         }
//     })

//     app.delete('/LD/Status/delete/:id',async(req, res) => {
//         const deletar = await ctrlStatusLD.deletar(req.params.id)
//         if(deletar==1){          
//            res.json(deletar) 
//         }else{
//             res.json(deletar.msg)
//         }
        
//     })
}

module.exports = rotaItemSaldoLD