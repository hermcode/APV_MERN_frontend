import { useState } from 'react'
import { Link } from 'react-router-dom'
import FormAlert from '../components/FormAlert'
import axiosClient from '../config/axios'

const ForgotPassword = () => {

    const [email, setEmail] = useState('')
    const [ alert , setAlert ] = useState({})

    const handleSubmit = async e => {

        e.preventDefault()

        if(email === ''){ 
            setAlert({ msg: 'Hay campos vacios', error: true})
            return
        }

        try {
            const { data } = await axiosClient.post('/veterinarians/restore-password', { email })
            setAlert({
                msg: data.msg,
                error: false
            })
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
            <h1 className="text-indigo-600 font-black text-4xl md:text-6xl mt-20 lg:mt-0">Recupera el Acceso a tu {""}<span className="text-grayishblack">Cuenta</span></h1>
        </div>
        <div className="bg-white md:shadow-lg md:p-10 mt-10 lg:mt-0">
            <form action="" className="mt-20 md:mt-0 form" onSubmit={handleSubmit}>
                <div>
                    <label className="text-grayishblack block text-xl font-bold">Correo electrónico</label>
                    <input 
                        type="email" 
                        placeholder="Ingresa tu correo electrónico" 
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-md"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <input type="submit" value="Enviar correo de recuperación" className="w-full bg-indigo-700 text-white font-bold py-4 rounded-md mt-7 hover:cursor-pointer hover:bg-indigo-800"/>

                <div className="mt-5 text-center">

                    <span className="text-gray-500">¿Ya tienes una cuenta? </span> 
                    <Link className="text-indigo-600 hover:underline" to="/">Inicia Sesión</Link>
                    <span>{" "}o{" "}</span>
                    <Link className="text-indigo-600 hover:underline" to="/register">Crea una cuenta</Link>
                    { msg && <FormAlert alert={ alert }/> }

                </div>
                
            </form>
        </div>
      </>
    )
  }
  
  export default ForgotPassword