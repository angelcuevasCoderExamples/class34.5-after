const { itemsService } = require('../repositories/index');
const CustomError = require('../utils/errorHandling/CustomError');
const ErrorTypes = require('../utils/errorHandling/ErrorTypes');

class ItemsController {
    static async getAll(req, res){
        let query = req.query; 
    
        try {
            let {docs,...rest} = await itemsService.getAll(query)    
            res.send({status:'success', payload: docs, ...rest})
        } catch (error) {
            res.status(error.status || 500).send({status:'error', error: error.message })
        }
    
    }

    static async getById(req, res){

        try {
            let item = await itemsService.getById(req.params.id)
            res.send({item: item})
        } catch (error) {
            res.status(error.status || 500).send({status:'error', error: error.message })
        }
    
        
    }

    static async create(req, res, next){
        try {
            const {description, category} = req.body; 
            if(!description || !category){
                throw new CustomError({
                    name:"missing properties creating item",
                    cause: 'missing properties', 
                    message: 'Some propertties were missing or invalid', 
                    code: ErrorTypes.INVALID_TYPE_ERROR
                })
            }
    
            await itemsService.create(req.body)
            const items = await itemsService.getAll();
            req.io.emit('list updated',{items:items})

            req.logger.info(`item creeted successfully by user ${req.user.email}`)
            res.send({status:'success', details: items})
        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next){
        const id = req.params.id
    
        try {

            const result = await itemsService.update(id, req.body);
            
            req.logger.info(`item creeted successfully by user ${req.user.email}`)
            res.send({status:'success', details: result})
        } catch (error) {
            next(error)
            //res.status(error.status || 500).send({status:'error', error: error.message })
        }
    
    }

    static async delete(req, res, next){
        const id = req.params.id; 
        try {
            const result = await itemsService.delete(id);
            res.send({status:'success', details: result})        
        }catch (error) {
            next(error)
            //res.status(error.status || 500).send({status:'error', error: error.message })
        }
    
    }
}

module.exports = ItemsController; 