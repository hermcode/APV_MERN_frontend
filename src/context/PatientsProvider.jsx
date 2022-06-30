import { createContext, useState } from "react";
import axiosClient from "../config/axios";

const PatientsContext = createContext()

export const PatientsProvider = ({ children }) => {

  const [patients, setPatients] = useState([])
  const [patient, setPatient] = useState({})
  const [loading, setLoading] = useState(false)
  
  const savePatient = async (patient) => {

    const token = localStorage.getItem('token')
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }

    if (patient.id) {
      try {
        setLoading(true)
        const { data: { msg } } = await axiosClient.put(`/patients/${patient.id}`, patient, config)
        const updatedPatients = patients.map(el => el._id === msg._id ? msg : el)
        setPatients(updatedPatients)
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
      return
    }

    try {
      const { data } = await axiosClient.post('/patients', patient, config)
      const { createdAt, updatedAt, __v, ...storedPatient } = data
      setPatients([storedPatient, ...patients])
    } catch (error) {
      console.log(error.response.data.msg);
    }
  }

  const editPatient = (patient) => {
    setPatient(patient)
  }

  const deletePatient = async (id) => {
    const confirmResponse = confirm('¿Confirmas que deseas eliminar?')

    if (confirmResponse) {
      setLoading(true)
      try {
        const token = localStorage.getItem('token')
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
        const { data } = await axiosClient.delete(`/patients/${id}`, config)
        const updatedPatients = patients.filter( el => el._id !== id)
        setPatients(updatedPatients)
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    }
  }

  return (
    <PatientsContext.Provider
      value={{
        patient,
        patients,
        loading,
        savePatient,
        editPatient,
        deletePatient,
        setLoading,
        setPatient,
        setPatients
      }}
    >
      {children}
    </PatientsContext.Provider>
  )
}

export default PatientsContext