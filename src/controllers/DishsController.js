class DishsController {
    async create(request, response){
        const { name, category, price, description, ingredients } = request.body
        const user_id = request.user.id

        console.log(name, category, price, description, ingredients)
        console.log(user_id)

        return response.json()
    }
}

module.exports = DishsController