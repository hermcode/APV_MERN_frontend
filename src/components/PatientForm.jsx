import React, { useEffect, useState } from 'react'
import usePatients from '../hooks/usePatients'
import FormAlert from './FormAlert'

const PatientForm = () => {

  const { patient, savePatient } = usePatients()

  /** States ========================================================== */
  
  const [ name, setName ] = useState('')
  const [ owner, setOwner ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ date, setDate ] = useState('')
  const [ symptoms, setSymptoms ] = useState('')
  const [ id, setId ] = useState(null)
  
  const [ alert, setAlert ] = useState({})
  
  /** Functions ========================================================== */
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validacion del formulario (No asincrono)
    if([name, owner, email, date, symptoms].includes('')) {
      setAlert({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }
    
    savePatient({name, owner, email, date, symptoms, id})
    setAlert({
      msg: 'Guardado correctamente'
    })
    setName('')
    setOwner('')
    setEmail('')
    setDate('')
    setSymptoms('')
    setId('')
  }

  useEffect(() => {
    if(patient?._id) {
      setName(patient.name)
      setOwner(patient.owner)
      setEmail(patient.email)
      setDate(patient.date)
      setSymptoms(patient.symptoms)
      setId(patient._id)
    }
  }, [patient])
  
  const { msg } = alert

  return (
    <>
      <p className='text-lg text-center mb-5'>Añade a tus pacientes y <span className='text-indigo-600'>Administralos</span></p>

      <form className="bg-white rounded-xl md:shadow-lg p-10 lg:mt-0" onSubmit={ handleSubmit }>
        <div className='mb-5'>
          <label htmlFor='pet' className="text-grayishblack block text-xl font-bold">Nombre mascota:</label>
          <input 
            id='name'
            type="text" 
            placeholder="Ingresa el nombre de la mascota" 
            className="border w-full p-3 mt-3 bg-gray-50 rounded-md"
            value={name}
            onChange = { e => setName(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor='owner' className="text-grayishblack block text-xl font-bold">Nombre del propietario:</label>
          <input 
            id='owner'
            type="text" 
            placeholder="Ingresa el nombre del propietario" 
            className="border w-full p-3 mt-3 bg-gray-50 rounded-md"
            value={owner}
            onChange = { e => setOwner(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor='email' className="text-grayishblack block text-xl font-bold">Correo electrónico del propietario:</label>
          <input 
            id='email'
            type="email" 
            placeholder="Ingresa el email del propietario" 
            className="border w-full p-3 mt-3 bg-gray-50 rounded-md"
            value={email}
            onChange = { e => setEmail(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor='date' className="text-grayishblack block text-xl font-bold">Fecha de alta:</label>
          <input 
            id='date'
            type="date" 
            asp-format="{0:yyyy/MM/dd}"
            className="border w-full p-3 mt-3 bg-gray-50 rounded-md"
            value={date}
            onChange = { e => setDate(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor='symptoms' className="text-grayishblack block text-xl font-bold">Síntomas:</label>
          <textarea 
            id='symptoms'
            placeholder='Describe los síntomas de la mascota'
            className="border w-full p-3 mt-3 bg-gray-50 rounded-md"
            value={symptoms}
            onChange = { e => setSymptoms(e.target.value)}
          />
        </div>

        <input 
          type="submit" 
          value={ id ? 'Guardar cambios' : "Agregar paciente" } 
          className="w-full bg-indigo-700 text-white font-bold py-4 rounded-md hover:cursor-pointer hover:bg-indigo-800 transition-colors"
        />

        { msg && <FormAlert alert={ alert } />}
      </form>
    </>
  )
}

export default PatientForm