import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		name: {
			required: [true, 'Nama harus diisi'],
			type: String,
		},
		destination: {
			required: [true, 'Tujuan harus diisi'],
			type: String,
		},
		contacts: {
			required: [true, 'Nomor hp setidaknya 1'],
			type: [String],
			validate: [(value) => value.length > 0, 'No outputs'],
		},
		isStart: {
			type: Boolean,
			default: true,
		},
		isArrived: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

export const User = mongoose.model('User', userSchema);
