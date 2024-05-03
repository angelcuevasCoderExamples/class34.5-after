const MocksController =require("../controllers/mock.controller");

const { Router } = require("express");

const router = Router()

router.get('/', MocksController.getUsers)

module.exports = {
    mocksRouter: router
}