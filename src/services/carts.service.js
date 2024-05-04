const MailingService = require("../services/mailing.service");

const mailingService = new MailingService()

class CartService {
    constructor(dao, itemsService, ticketService){
        this.dao = dao; 
        this.itemsService = itemsService; 
        this.ticketService = ticketService; 
    }

    async getAll(){
       return await this.dao.getAll();
    }

    async getById(id){    
        const cart = await this.dao.getById(id)
        if(!cart){
            throw  { message:`There's no card by id ${id}`, status:400 }
        }
        return cart;
    }

    async create(){
        const cart = {items:[]}
        return await this.dao.create(cart);
    }

    async update(id, toy){
        await this.getById(id);
        return await this.dao.update(id, toy);
    }

    async delete(id){

        await this.dao.getById(id);
        return await this.dao.delete(id);
    }

    /** cart content specific methods */

    async addItem(id, itemId){
        
        const cart = await this.getById(id);
        const index = cart.items.findIndex(i=>i.item._id == itemId)

        if(index >= 0){
            cart.items[index].quantity+=1;  
        }else{
            cart.items.push({item: itemId, quantity:1})
        }

        await this.update(id,cart)
        return cart;
    }

    async deleteItemById(cartId, itemID){

        const cart = await this.getById(cartId);
        await this.itemsService.getById(itemID) //called just for the validation

        const newContent = cart.items.filter(item=>item.item._id != itemID)
        await this.update(cartId, {items: newContent })

        return this.getById(cartId);
    }

    async updateCartItems(cartId, content){
        await this.getById(cartId);
        await this.update(cartId, {items: content })
        return this.getById(cartId);
    }

    async updateItemQuantity(cartId, itemId, quantity){

        const cart = await this.getById(cartId);
        await this.itemsService.getById(itemId)

        if(!quantity || isNaN(quantity) || quantity < 0){
            throw {message:'Quantity is not valid', status: 400}
        }

        const itemInCartIndex = cart.items.findIndex(i=>i.item._id == itemId)
        if(itemInCartIndex < 0){
            throw {message:`Item ${itemId} does not exist in cart`, status: 400}
        }
        cart.items[itemInCartIndex].quantity = parseInt(quantity);

        await this.update(cartId, cart)
        return this.getById(cartId);
    }

    async deleteAllItems(cartId){
        await this.getById(cartId);
        await this.update(cartId, {items: [] })
        return this.getById(cartId);
    }

    async purchase(cartId, userEmail){
        const cart = await this.getById(cartId);
        
        const notPurchasedIds = []
        let totalAmount = 0; 
        //for (const item of cart.items) {
        for (let i = 0; i < cart.items.length; i++) {
            const item = cart.items[i];
            const remainder = item.item.stock - item.quantity;
            if(remainder >= 0){
                await this.itemsService.update(item.item._id, {...item.item, stock:remainder } )
                await this.deleteItemById(cartId, item.item._id.toString())
                totalAmount+= item.quantity * item.item.price;
            }else{
                notPurchasedIds.push(item.item._id);
            }
        }; 

        if(totalAmount > 0){
            await this.ticketService.generate(userEmail, totalAmount); 
            //await mailingService.sendPurchaseMail(req.user.email);
        }

        return notPurchasedIds;
    }

}


module.exports = CartService;