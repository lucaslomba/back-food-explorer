const knex = require("../database/knex")
const DiskStorage = require("../providers/DiskStorage")

class DishsController {
    async create(request, response){
        const { name, category, price, description, ingredients } = request.body
        const ingredientsArray = ingredients.split(',');
        const avatarFilename = request.file.filename
        const user_id = request.user.id

        const [dish_id] = await knex("dishs").insert({
            name,
            category,
            price,
            description,
            user_id
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
}

module.exports = DishsController