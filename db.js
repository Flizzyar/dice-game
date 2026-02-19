import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const { MONGO_USER, MONGO_PASS, MONGO_CLUSTER, MONGO_DB } = process.env

        const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_CLUSTER}/${MONGO_DB}?retryWrites=true&w=majority`

        await mongoose.connect(uri)

        console.log('MongoDB Atlas connected')
    } catch (error) {
        console.error('MongoDB connection failed:', error.message)
        process.exit(1)
    }
}

export default connectDB
