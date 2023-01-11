const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken')
//const jwtSecret = 'secreta'
const jwtSecret = require('../config/config.json').secret
const bcrypt = require('bcryptjs');
const crtlUsuario = require('../controller/controllerUsuarios')
const rotasAuth = (app) => {

    app.get('/logout', async(req, res) =>{
       req.session.destroy(null);
       req.logout(()=>{res.redirect('/')})
       

})
}


module.exports = rotasAuth;