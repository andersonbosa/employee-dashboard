import { mongoose } from '../services/mongoose-client.service'


const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  admissionDate: {
    // type: Date || String,
    type: String,
    default: Date.now,
    // FIXME tem que ser possível usar a string e o schema fazer a validação de se o valor é
    // passível de ser convertido para um Date válido
    //   validate: {
    //     validator: (value: any) => {
    //       return new Date(value) instanceof Date || value instanceof Date
    //     },
    //     message: '"admissionDate" must be a valid date'
    //   }
  },
})

export const Employee = mongoose.model('Employee', employeeSchema)

