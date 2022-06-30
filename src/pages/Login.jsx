import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import FormAlert from '../components/FormAlert'
import axiosClient from '../config/axios'
import PasswordInput from '../components/PasswordInput'

const Login = () => {

  const { setAuth } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if ([email, password].includes('')) {
      setAlert({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    setAlert({})

    try {
      const { data } = await axiosClient.post('/veterinarians/login', { email, password })

      localStorage.setItem('token', data.token)
      setAuth(data)
      navigate('/admin')
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alert

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-4xl md:text-6xl mt-20 lg:mt-0">Inicia Sesión y Administra tus {""}<span className="text-grayishblack">Pacientes</span></h1>
      </div>
      <div className=" rounded-xl bg-white md:shadow-lg p-10 mt-10 lg:mt-0">
        <form className=" lg:mt-0 form" onSubmit={handleSubmit}>
          <div>
            <label className="text-grayishblack block text-xl font-bold">Correo electrónico</label>
            <input
              type="email"
              placeholder="Ingresa tu correo electrónico"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-md"
              autoComplete="on"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <PasswordInput
              passLabelText={'Contraseña'}
              name={'password'}
              placeholderText={'Ingresa tu contraseña'}
              passCheckboxId={'password'}
              passValue={password}
              setPassword={setPassword}
            />
          </div>
          <div className="mt-1 float-right hover:cursor-pointer hover:underline text-indigo-600">
            <Link to="/forgot-password" >Olvidé mi contraseña</Link>
          </div>
          <input type="submit" value="Iniciar Sesión" className="w-full bg-indigo-700 text-white font-bold py-4 rounded-md mt-7 hover:cursor-pointer hover:bg-indigo-800 transition-colors" />

          {msg && <FormAlert alert={alert} />}

          <div className="mt-5 text-center">
            <span className="text-gray-500">¿No tienes una cuenta? </span>
            <Link className="text-indigo-600 hover:underline" to="/register">Regístrate</Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login