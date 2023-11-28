import Jwt from "jsonwebtoken"

export const generateToken = (id) =>{
  return Jwt.sign({id: id, user: true}, process.env.JWT_KEY)
}