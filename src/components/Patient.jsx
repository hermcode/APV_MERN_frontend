import React from 'react'
import usePatients from '../hooks/usePatients'
import { RiDeleteBin6Line } from 'react-icons/ri'

const Patient = ({ patient }) => {

  const { editPatient, deletePatient } = usePatients()

  /** Functions ================================================================ */
  
  const formatDate = (date) => {
    const newDate = new Date(`${date.split('T')[0]}T05:00:00.000+00:00`)
    return new Intl.DateTimeFormat('es-MX', { dateStyle: 'long'}).format(newDate)
  }

  return (
    <div className='mx-5 my-5 p-10 rounded-xl shadow-md bg-white'>
      <p className='uppercase font-semibold'>Mascota: <span className='normal-case font-normal'>{patient.name}</span></p>
      <p className='uppercase font-semibold'>Propietario: <span className='normal-case font-normal'>{patient.owner}</span></p>
      <p className='uppercase font-semibold'>Email: <span className='normal-case font-normal'>{patient.email}</span></p>
      <p className='uppercase font-semibold'>Fecha: <span className='normal-case font-normal'>{formatDate(patient.date)}</span></p>
      <p className='uppercase font-semibold'>Síntomas: <span className='normal-case font-normal'>{patient.symptoms}</span></p>

      <div className='flex justify-between'>
        <button 
          className='py-2 px-10 uppercase bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold mt-5'
          onClick={() => editPatient(patient)}
        >Editar</button>
        <button 
          className='p-2 w-11 h-11 flex items-center justify-center uppercase text-black hover:bg-red-600 hover:text-white rounded-full  font-semibold mt-5'
          onClick={() => deletePatient(patient._id)}
          title="Eliminar"
        >
          <RiDeleteBin6Line fontSize={22}/>
        </button>
      </div>
    </div>
  )
}

export default Patient