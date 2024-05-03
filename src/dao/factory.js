const mongoose = require('mongoose');
const { persistence, mongoConnectionLink } = require('../config/config');


let CartsDao; 
let ItemsDao;
let UsersDao; 
let TicketsDao; 

switch(persistence){
    case 'MONGO':
        mongoose.connect(mongoConnectionLink).then(()=>{
            console.log('connected to atlas.')
        })
        CartsDao = require('./dbManagers/carts.dao')
        ItemsDao = require('./dbManagers/items.dao')
        UsersDao = require('./dbManagers/users.dao')
        TicketsDao = require('./dbManagers/tickets.dao')
    break;

    case 'MEMORY':
        CartsDao = require('./memory/carts.memory')
        ItemsDao = require('./memory/items.memory')
        UsersDao = require('./memory/users.memory')
        TicketsDao = require('./memory/tickets.memory')
    break;
}

module.exports = {
    CartsDao,
    ItemsDao,
    UsersDao,
    TicketsDao
}
