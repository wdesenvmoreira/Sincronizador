const ctrlindicadoresapi = require('../controller/controllerWBI')
//const ctrlIndicadores = require('../controller/controllerIndicadores')
const ctrlFirebird = require('../controller/controllerFirebird')
const ctrlUW = require('../controller/controllerUsuarioWbi')
const passport = require('passport')
const jwtSecret = require('../config/config.json').secret

const rotaApiIndicadores = (app) =>{


     app.get('/usuarios/usuario/:user', async(req, res) => {
        console.log('user: ',req.params.user)
         let usuario = await ctrlUsuarios.verificarUsuario(req.params.user)
         console.log('usuario por nome? ', usuario)

         res.json(usuario)
     })
    

     app.get('/indicadoresapi/users', async(req, res) => {
        let indicadores 
                console.log('entrou no users')
             indicadores = await ctrlFirebird.consultar();
    
        
        res.json(indicadores)
    })




}

module.exports = rotaApiIndicadores