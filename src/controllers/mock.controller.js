const {cartsService, itemsService } = require('../repositories')
const { generateItems } = require('../utils/faker')

class MocksController {
    static async getUsers(req, res){
        try {
            let mockItems = []

            for (let i = 0; i < 100; i++) {
                let item = generateItems() //a.k.a products 
                mockItems.push(item)
            }
            res.send({
                status: 'success',
                payload: mockItems
            }) 
        } catch (error) {
            res.status(error.status || 500).send({status:'error', error: error.message })
        }
    }
}

module.exports = MocksController;