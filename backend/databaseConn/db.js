import mongoose from "mongoose"

export const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_URI)
        console.log(`MongoDb Connected : ${conn.connection.host}`)
        
    } catch (error) {
        console.log('Error connecting mongoDB : ', error.message)
        process.exit(1)     //failure
    }
}