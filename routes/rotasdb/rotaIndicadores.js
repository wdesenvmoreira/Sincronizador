const ctrlUsuarios = require('../controller/controllerUsuarios')
const ctrlUW = require('../controller/controllerUsuarioWbi')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const jwtSecret = 'secreta'

const rotaIndicadores = (app) =>{
    // app.use(async(req, res, next)=>{
    //         const token = req.session.token;
    //         if(token){
    //             try {
    //                 const payload = jwt.verify(token, jwtSecret)
    //                 if(payload.edicao = 1){
    //                   next();  
    //                 }else{
    //                     console.log('Não possui permissão para acessar esta pagina. Retornando para : ',req.headers.host+'\\'+req.path)
    //                    res.redirect(req.headers.host+'\\'+req.path);
    //                 }
                    
    //             } catch (error) {
    //                 res.render('login',{message: 'Erro ao acessar. Acesse novamente.'});
    //             }
    //         }else{
               
    //             res.render('login',{message: 'Realize o login.'})
    //         }
    //     });

    app.get('/indicadores/indicador', async(req,res)=>{
        let indicador = req.body.indicador;
        let dados = await ctrlIndicadores(config.sgbd, indicador)
        res.json(dados);
    })
}
module.exports = rotaIndicadores