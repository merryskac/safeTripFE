import mongoose from 'mongoose';

const userToken = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'User is required'],
	},
	token: {
		required: [true, 'Token harus ada!'],
		type: String,
	},
});

export const UserToken= mongoose.model('UserToken', userToken)


