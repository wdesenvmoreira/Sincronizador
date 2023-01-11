const jwt = require('jsonwebtoken')
//const jwtSecret = 'secreta'
const jwtSecret = require('../../config/config.json').secret
const ctrlStatusLD = require('../../controller/LD/controllerStatusLD')
const rotaStatusLD = (app) =>{
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

  app.get('/LD/Status',(req, res) => {
        res.render('LD/status')
    })

 
  app.get('/LD/Status/api/:id',async(req, res)=>{
        if(req.params.id === 'Todos'){
            let retorno = await ctrlStatusLD.findAll()
            console.log('retorno Todos: ', retorno)
            res.json(retorno)
        }else{
            let retorno = await ctrlStatusLD.findByStatus(req.params.id)
            console.log('retorno api status: ', retorno)
            res.json(retorno) 
        }
       
    }) 

 

    app.post('/LD/Status/Incluir', async(req, res) => {

        const dado = { ...req.body}
        const incluir = await ctrlStatusLD.create(dado)
            res.json(incluir)
        
        
    })

    app.post('/LD/Status/Alterar', async(req, res)=>{
        console.log('Rota alterando status: ', req.body)
        let alterar = await ctrlStatusLD.update(req.body.id, req.body)
        if(alterar){
            res.json(alterar)
        }else{
            res.send('Registro não alterado. ')
        }
    })

    app.delete('/LD/Status/delete/:id',async(req, res) => {
        const deletar = await ctrlStatusLD.deletar(req.params.id)
        if(deletar==1){          
           res.json(deletar) 
        }else{
            res.json(deletar.msg)
        }
        
    })

}
module.exports = rotaStatusLD