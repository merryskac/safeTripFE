import { generateToken } from '../config/token/token.js';
import { User } from '../model/user.js';
import { UserToken } from '../model/userToken.js';
import Jwt from 'jsonwebtoken';

export const createNewSession = async (req, res) => {
	try {
		const session = await User.create({
			name: req.body.name,
			contacts: req.body.contacts,
			isStart: req.body.isStart,
			isArrived: req.body.isArrived,
			destination: req.body.destination,
		});

		const tokenize = generateToken(session.id);

		const userToken = await UserToken.create({
			user: session._id,
			token: tokenize,
		});

		return res.json({ user: session, userToken });
	} catch (error) {
		return res.json(error);
	}
};

export const tokenCheck = async (req, res) => {
	try{
		console.log(req.body)
		const token = req.body.token
		if(!token){
			return res.json({
				message: 'Token not found!'
			})
		}
		const verify = Jwt.verify(token, process.env.JWT_KEY)
		console.log(verify)
		return res.json(verify)

	}catch(error){
		return res.json(error)
	}
};
