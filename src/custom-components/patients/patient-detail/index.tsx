import { useParams } from 'react-router-dom'
import PatientDetails from './PatientDetails'
const PatientDetailsPage = () => {
    const {id} = useParams()
    console.log("Patient ID:", id);
  return (
    <div>
        <PatientDetails/>
    </div>
  )
}

export default PatientDetailsPage