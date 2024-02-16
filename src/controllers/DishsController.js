const knex = require("../database/knex")

class DishsController {
    async create(request, response){
        const { name, category, price, description, ingredients } = request.body
        const user_id = request.user.id

        const [dish_id] = await knex("dishs").insert({
            name,
            category,
            price,
            description,
            user_id
        })

        const ingredientsInsert = ingredients.map(ingredient => {
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