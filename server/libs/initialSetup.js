import Role from '../models/Role.js'

export const createRoles = async () => {

    const count = await Role.estimatedDocumentCount()

    try {
        if(count > 0)return;

        const values = await Promise.all([
            new Role({name: 'user'}).save(),
            new Role({name: 'moderator'}).save(),
            new Role({name: 'admin'}).save()
        ])
    
    } catch (error) {
        console.log(error)
    }
    }