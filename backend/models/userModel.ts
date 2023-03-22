import mongoose from "mongoose"

interface UserDoc extends mongoose.Document {
  name: string
  email: string
  password: string  
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    }
  }
)

const User = mongoose.model<UserDoc>('User', userSchema)

export { User }