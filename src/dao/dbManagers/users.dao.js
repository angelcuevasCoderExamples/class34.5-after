const userModel = require("../models/user")


class UsersDao {

    async getAll(){
        return await userModel.find().lean()
    }

    async getById(id){
        return await userModel.findOne({_id:id}).populate('items.item').lean()
    }

    async getByProperty(property, name){
        let opts = {}
        opts[property] = name; 
        let result = await userModel.findOne(opts).lean()
        return result; 
    }

    async create(item){
        return await userModel.create(item)
    }

    async update(id, item){ 
        return await userModel.updateOne({_id:id}, item)
    } 

    async delete(id){
        return await userModel.deleteOne({_id:id})
    }
}

module.exports = UsersDao;