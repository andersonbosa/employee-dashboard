
export interface IEmployeeModel {
  _id: string
  name: string
  position: string
  department: string
  admissionDate: string | Date
}

export class Employee implements IEmployeeModel {
  _id: string
  name: string
  position: string
  department: string
  admissionDate: string | Date

  constructor(employee: IEmployeeModel) {
    this._id = employee._id
    this.name = employee.name
    this.position = employee.position
    this.department = employee.department
    this.admissionDate = employee.admissionDate
  }
}