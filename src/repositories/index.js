const { CartsDao, ItemsDao, UsersDao, TicketsDao } = require("../dao/factory");
const CartService = require("../services/carts.service");
const ItemsService = require("../services/items.service");
const TicketService = require("../services/ticket.service");
const UsersService = require("../services/user.service");

const itemsService = new ItemsService(new ItemsDao());
const usersService = new UsersService(new UsersDao());
const ticketsService = new TicketService(new TicketsDao())
const cartsService = new CartService(new CartsDao(), itemsService, ticketsService);

module.exports = {
    itemsService,
    cartsService,
    usersService,
    ticketsService
}