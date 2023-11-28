import Jwt from 'jsonwebtoken';
import { User } from '../model/user';

export const tokenCheck = async(req, res, next) => {
	let token;

	if (req.headers.authorization.startsWith('Bearer')) {
		try {
			token = req.headers.authorization.split(' ')[1]

      if(token){
        const decoded = Jwt.verify(
          token, process.env.JWT_KEY
        )
        req.verivied = true
        next()
      }
		} catch (error) {
			throw new Error('Token tidak tersedia! tidak dapat akses');
		}
	}else{
    throw Error('Token tidak ditemukan!')
  }
};
