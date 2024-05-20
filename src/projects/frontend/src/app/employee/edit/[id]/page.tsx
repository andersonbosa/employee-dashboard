import { EditEmployeeModulePage } from '@/modules/employee/pages/edit/[id]/page'


interface IEditEmployeePageParams {
  params: {
    id: string
  }
}

const EditEmployeePage = ({ params }: IEditEmployeePageParams): React.ReactElement => {
  return <>
    <EditEmployeeModulePage employeeId={params.id} />
  </>
}

export default EditEmployeePage