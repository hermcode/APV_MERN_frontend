import React, { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import FormAlert from '../components/FormAlert'
import axiosClient from '../config/axios'

const NewPassword = () => {

  const [password, setPassword] = useState('')
  const [ alert, setAlert ] = useState({})
  const [ validToken , setValidToken ] = useState(false)
  const [ passwordModified, setPasswordModified ] = useState(false)
  
  // const params = useParams()
  const { token } = useParams()

  useEffect(() => {
    const checkToken = async () => {
      try {
        await axiosClient(`/veterinarians/restore-password/${token}`)
        setValidToken(true)
        
      } catch (error) {
        setValidToken(false)
        setAlert({
          msg: 'Hubo un error con el enlace',
          error: true
        })
      }
    }

    checkToken()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(password.length < 6) {
      setAlert({
        msg: 'La contraseña debe tener al menos 6 caracteres',
        error: true
      })
      return
    }

    try {
      const url = `/veterinarians/restore-password/${token}`
      const { data } = await axiosClient.post(url, { password })

      setAlert({
        msg: data.msg,
        error: false
      })

      setPasswordModified(true)

    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })

      setPasswordModified(false)
    }
  }

  const { msg } = alert

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-4xl md:text-6xl mt-20 lg:mt-0">Reestablece tu {""}<span className="text-grayishblack">Contraseña</span></h1>
      </div>
      <div className="bg-white rounded-xl md:shadow-lg md:p-10 mt-10 lg:mt-0">

        {!validToken 
          ? <FormAlert alert={alert} className='mt-0'/>
          : <form action="" className="mt-20 md:mt-0 form" onSubmit={ handleSubmit }>
              <div className="mt-5">
                <label className="text-grayishblack text-xl font-bold">Nueva Contraseña</label>
                <input
                  type="password"
                  placeholder="Ingresa tu nueva contraseña"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-md"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>


              <input
                type="submit" 
                value="Guardar nueva contraseña" 
                className="w-full bg-indigo-700 text-white font-bold py-4 rounded-md mt-7 hover:cursor-pointer hover:bg-indigo-800" 
              />

              { msg && <FormAlert alert={alert} className='mt-0'/> }

              { passwordModified && 
                  <div className="mt-5 text-center">
                    <span className="text-gray-500">Tu contraseña se actualizó correctamente </span> 
                    <Link className="text-indigo-600 hover:underline" to="/">Inicia Sesión</Link>
                  </div>
              }
              
            </form>
        }
      </div>
    </>
  )
}

export default NewPassword