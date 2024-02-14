class DishsController {
    async create(request, response){
        const { title, description, tags, links } = request.body
        const user_id = request.user.id

        console.log(title)
        console.log(user_id)

        return response.json()
    }
}

module.exports = DishsController