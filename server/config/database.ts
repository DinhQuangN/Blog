import mongoose from 'mongoose';

mongoose.set('strictQuery', false);
mongoose
	.connect(`${process.env.MONGO_DB}`, {
		retryWrites: true,
		w: 'majority'
	})
	.then(() => console.log('DB connected success'))
	.catch(err => console.log(err));
