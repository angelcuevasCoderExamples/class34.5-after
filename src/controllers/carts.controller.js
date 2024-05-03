const { cartsService } = require("../repositories");

class CartsController {

    static async create(req, res){  
        try {
            await cartsService.create();
            res.send({status:'success'})
        } catch (error) {
            return res.status(error.status || 500).send({status:'error', error:error.message})
        }
    }

    static async getById(req, res){
        try {
            const id = req.params.id; 
            const cart = await cartsService.getById(id)
            res.send({status:'success', items: cart.items})
        } catch (error) {
            return res.status(error.status || 500).send({status:'error', error:error.message})
        }
    }
    /** cart content specific methods */
    
    static async addItem(req, res){ 
        
        const id = req.params.id; 
        const itemId = req.params.iid; 
        
        try {
            const result = await cartsService.addItem(id, itemId)
            res.send({status:'success', payload: result})
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).send({status:'error', error:error.message})
        }

    }

    static async deleteItem(req, res){
        const {id, iid} = req.params; 
        try {
            const result = await cartsService.deleteItemById(id, iid)
            res.send(result)
        } catch (error) {
            return res.status(error.status || 500).send({status:'error', error:error.message})
        }
    }

    static async updateItemQuantity(req, res){
        const {id, iid} = req.params;
        const quantity = req.body.quantity
        
        try {
            const result = await cartsService.updateItemQuantity(id, iid, quantity)
            res.send(result)
        } catch (error) {
            return res.status(error.status || 500).send({status:'error', error: error.message})
        }
    }

    static async updateItems(req, res){
        const {id} = req.params;
    
        try {
            const result = await cartsService.updateCartItems(id, req.body)
            res.send(result)
        } catch (error) {
            return res.status(error.status || 500).send({status:'error', error: error.message})
        }
    }

    static async deleteAllItems(req, res){
        const {id} = req.params; 
        try {
            const result = await cartsService.deleteAllItems(id)
            res.send(result)
        } catch (error) {
            return res.status(error.status || 500).send({status:'error', error:error.message})
        }
    }

    static async purchase(req, res){
        const {id} = req.params; 
        try {
            const remainderItems = await cartsService.purchase(id, req.user.email)
           
            
            res.send({status:'success', payload: remainderItems})
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).send({status:'error', error:error.message})
        }
    }
}

module.exports = CartsController; 