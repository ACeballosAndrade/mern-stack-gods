import User from '../models/User.js'
import Role from '../models/Role.js'
import jwt from 'jsonwebtoken'
import {SECRET} from '../config.js'

export const signup = async (req, res) => {
    const {username, email, password, roles} = req.body

    const nuevoUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    })

    if(roles){
        const foundRoles = await Role.find({name: {$in: roles}})
        nuevoUser.roles = foundRoles.map(role => role._id)
    }else{
        const role = await Role.findOne({name: "admin"})
        nuevoUser.roles = [role._id]
    }

    const savedUser = await nuevoUser.save()

    const token = jwt.sign({id: savedUser._id}, SECRET, {
        expiresIn: 86400 //24 Horas
    })
    res.status(200).json({name: savedUser.username, token})
}


export const signin = async (req, res) => {
    
    const userFound = await User.findOne({email: req.body.email}).populate("roles")

    if(!userFound) return res.status(400).json({message: "User not found"})


    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    if(!matchPassword){
        return res.status(401).json({token: null, message: 'Invalid password'})
    }else{
        const token = jwt.sign({id: userFound._id}, SECRET, {
            expiresIn: 86400
        }) 
        res.json({name: userFound.username, token})
    }

    


}