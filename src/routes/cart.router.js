const {Router}= require('express');
const CartsController = require('../controllers/carts.controller');
const getToken = require('../middlewares/getToken.middleware');
const checkRole = require('../middlewares/checkRole.middleware');

const router = Router();

router.post('/', CartsController.create)

router.get('/:id', CartsController.getById)

router.post('/:id/item/:iid', getToken, checkRole('user'), CartsController.addItem)

/** nuevos */
router.delete('/:id/item/:iid', CartsController.deleteItem)

router.put('/:id/item/:iid', CartsController.updateItemQuantity)

router.put('/:id', CartsController.updateItems)

router.delete('/:id', CartsController.deleteAllItems)

router.get('/:id/purchase', getToken, CartsController.purchase)


module.exports = router; 