import mongoose from 'mongoose';

const connectDB = (url) => {
    mongoose.set('strictQuery', true); //use to work with seach functinality
    mongoose.connect(url)
    .then(() => console.log('MongoDb connected'))
    .catch((err) => console.log(err));
}

export default connectDB