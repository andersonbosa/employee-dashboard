import { mongoose } from '../services/mongoose-client.service'


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // quando for buscar, informa que não queremos este campo na resposta
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})


export const User = mongoose.model('User', userSchema)
