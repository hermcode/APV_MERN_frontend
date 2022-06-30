import React, { useEffect } from 'react'
import axiosClient from '../config/axios'
import usePatients from '../hooks/usePatients'
import Patient from './Patient'
import Spinner from './Spinner'

const PatientList = () => {

  const { patients, loading, setPatients, setLoading } = usePatients()

  useEffect(() => {
    const getPatients = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token')
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
        const { data } = await axiosClient(`/patients`, config)
        setPatients(data)
        setLoading(false)
      } catch (error) {
        console.log(error.response.data.msg);
        setLoading(false)
      }
    }

    getPatients()

  }, [])

  if(loading) return <Spinner />

  return (
    <>
      { patients?.length > 0 
        ? (
          <>
            <h2 className='text-center text-3xl font-semibold'>Tus pacientes</h2>
            <p className='text-center mt-3 text-lg'>Administra tus <span className='text-indigo-600 font-medium'>pacientes</span></p>

            {
              patients.map((patient) => (
                <Patient 
                  key={patient._id} 
                  patient={patient}
                />
              ))
            }
          </>
        )
        : (
          <>
            <h2 className='text-center text-3xl font-semibold mt-10'>No hay pacientes</h2>
            <p className='text-center mt-3 text-lg'>Comienza agregando <span className='text-indigo-600 font-medium'>nuevos</span> pacientes</p>
          </>
        )
      }
    </>
  )
}

export default PatientList