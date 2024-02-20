const knex = require("../database/knex")
const DiskStorage = require("../providers/DiskStorage")

class DishsController {
    async create(request, response){
        const { name, category, price, description, ingredients } = request.body
        const ingredientsArray = ingredients.split(',');
        const avatarFilename = request.file.filename
        const user_id = request.user.id

        const diskStorage = new DiskStorage
        const filename = await diskStorage.saveFile(avatarFilename)

        const [dish_id] = await knex("dishs").insert({
            name,
            category,
            price,
            description,
            user_id,
            filename
        })

        const ingredientsInsert = ingredientsArray.map(ingredient => {
            return {
                dish_id,
                name: ingredient
            }
        })

        await knex("ingredients").insert(ingredientsInsert)

        return response.json()
    }

    async show(request, response){
        const { id } = request.params

        const dish = await knex("dishs").where({ id }).first()
        const ingredients = await knex("ingredients").where({ dish_id: id }).orderBy("name")

        return response.json({
            ...dish,
            ingredients
        })
    }

    async update(request, response){
        const { name, category, price, description, ingredients } = request.body
        const ingredientsArray = ingredients.split(',');
        const { id } = request.params
        const avatarFilename = request.file ? request.file.filename : ''

        const dish = await knex("dishs")
            .where({ id }).first()

        if(avatarFilename){
            const diskStorage = new DiskStorage

            if(dish.filename){
                await diskStorage.deleteFile(dish.filename)
            }

            const filename = await diskStorage.saveFile(avatarFilename)
            dish.filename = filename
        }

        dish.name = name
        dish.category = category
        dish.price = price
        dish.description = description

        await knex("dishs").update(dish).where({ id })

        await knex("ingredients").where({ dish_id: id }).delete();

        const ingredientsInsert = ingredientsArray.map(ingredient => {
            return {
                dish_id: id,
                name: ingredient
            }
        })

        await knex("ingredients").insert(ingredientsInsert)

        return response.json()
    }

    async index(request, response){
        const { type, search } = request.query

        let dishs = await knex("dishs").where({ category: type }).whereLike("name", `%${search}%`).orderBy("name")

        return response.json(dishs)
    }

    async delete(request, response){
        const { id } = request.params

        await knex("dishs").where({ id }).delete();

        return response.json()
    }
}

module.exports = DishsController