const rotasUsuarios = require('./rotasUsuario')
const rotasUW = require('./rotasUsuario_Wbi')
const rotasWBI = require('./rotasWBI')
const rotasAuth = require('./routerAuth')
const rotasLogout = require('./rotasLogout')
const rotasPrincipal = require('./rotasPrincipal')
const rotasExtrair = require('./rotasExtrair')
// const rotasAPI = require('./rotasAPI/')
// const rotasIndicadores = require('./rotasIndicadores')
// const rotasAPIIndicadores = require('./rotasAPIIndicadores')
const config = require('../config/config.json')
// const rotasAPIAuth = require('../routes/routerAuthAPI')

// const rotasLD= require('./rotasLD/')
// const rotasItemRecolhimentoLD = require('./rotasLD/rotasItemRecolhimentoLD')
// const rotasItemSaldoLD = require('./rotasLD/rotasItemSaldoLD')
// const rotasStatusLD= require('./rotasLD/rotasStatus')


const jwt = require('jsonwebtoken');
//const jwtSecret = 'secreta'
const jwtSecret = require('../config/config.json').secret


const rotas = (app) =>{
    //rotasAPI(app)
    app.get('/', (req, res)=>{console.log('acesssando /')
        res.render('login', {message:''})
    })
    
    app.get('/extrair',(req, res)=>{
      
      res.render()
    })
    rotasLogout(app)
    
  //  rotasAPIAuth(app)
    
    rotasAuth(app)
  
   rotasPrincipal(app)
   rotasWBI(app)
   rotasUsuarios(app)
   rotasUW(app)
   rotasExtrair(app)
  
  //  rotasIndicadores(app)
  //  rotasAPIIndicadores(app)

  //  rotasLD(app)
  //  rotasItemRecolhimentoLD(app)
  //  rotasItemSaldoLD(app)
  //  rotasStatusLD(app)

}

module.exports = rotas