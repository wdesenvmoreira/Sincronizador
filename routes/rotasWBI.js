const ctrlWBI = require('../controller/controllerWBI')
const jwt = require('jsonwebtoken')
//const jwtSecret = 'secreta'
const jwtSecret = require('../config/config.json').secret

const rotasWBI = (app) => {
    app.use(async(req, res, next)=>{
        const token = req.session.token;

        if(token){
            try {
                const payload = jwt.verify(token, jwtSecret)
                if(payload.edicao = 2){
                  next();  
                }else{
                    console.log('Não possui permissão para acessar esta pagina. Retornando para : ',req.headers.host+'\\'+req.path)
                   res.redirect(req.headers.host+'\\'+req.path);
                }
                
            } catch (error) {
                res.render('login',{message: 'Erro ao tentar verificar o token. '});
            }
        }else{
           
            res.render('login',{message: 'Realize o login. Não possui Token'})
        }
    });

    app.get('/wbi', (req, res) => {
        res.render('WBI/wbi')
    })

    app.get('/wbi/:ind', async(req, res) => {
        let indicadores 
       
        if(req.params.ind == 'todos'){
             indicadores = await ctrlWBI.findAll(req.params.ind)
        }else{                   
             indicadores = await ctrlWBI.findByWBI(req.params.ind)
             
        }
        res.json(indicadores)
    })

    app.post('/wbi/incluir', async(req, res) => {
        const wbi = { ...req.body}
        const incluir = await ctrlWBI.create(wbi)
        res.json(incluir)
        
    })

    app.post('/wbi/alterar', async(req, res)=>{
        let alterar = await ctrlWBI.update(req.body.id, req.body)
        if(alterar){
            res.json(alterar)
        }else{
            res.send('Registro não alterado. ')
        }
    })

    
    app.delete('/wbi/delete/:id',async(req, res) => {
        const deletar = await ctrlWBI.deletar(req.params.id)
        if(deletar==1){          
           res.json(deletar) 
        }else{
            res.json(deletar.msg)
        }
        
    })


}

module.exports = rotasWBI