import PatientList from "../components/PatientList"
import PatientForm from "../components/PatientForm"
import { useState } from "react"

const ManagePatients = () => {

  const [ showForm, setShowForm ] = useState(false)
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <button
        type="button"
        onClick={() => setShowForm(!showForm)}
        className="bg-indigo-700 text-white font-bold py-4 rounded-md hover:cursor-pointer hover:bg-indigo-800 transition-colors mx-10 md:mx-0 lg:hidden"
      >{ showForm?  'Ocultar Formulario' : 'Mostrar Formulario'}</button>
      <div className={`${showForm? 'block':'hidden' } lg:block lg:w-2/5 mx-5`}>
        <PatientForm />
      </div>
      <div className="lg:w-3/5">
        <PatientList />
      </div>
    </div>
  )
}

export default ManagePatients