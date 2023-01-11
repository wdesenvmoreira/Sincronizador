var express = require('express')
var app = express()
var firebird = require('node-firebird')

const conexao = () => {
    var options = {};

    options.host = '192.168.0.105';
    options.port = 3050;
   // options.database = 'E:/Tek-System/Ant/DADOSMC_Homologacao.FDB';
     options.database = 'D:/TEK-SYSTEM/DADOS/DADOSMC.FDB';
    options.user = 'sysdba';
    options.password = 'Masterkey';
    options.lowercase_keys = false; // set to true to lowercase keys
    options.role = null; // default
    options.pageSize = 4096;

    return options
}

module.exports = conexao()