import { useState } from 'react'
import { Link } from 'react-router-dom'
import FormAlert from '../components/FormAlert'
import axiosClient from '../config/axios'

const Register = () => {

    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ repeatPassword, setRepeatPassword ] = useState('')
    const [ alert , setAlert ] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Form validation
        if( [name, email, password, repeatPassword].includes('')) {
            setAlert({ msg: 'Hay campos vacios', error: true})
            return
        }

        if(password.length < 6) {
            setAlert({ msg: 'El password debe tener al menos 6 caracteres', error: true})
            return
        }

        if(password !== repeatPassword ) {
            setAlert({ msg: 'Las passwords no son iguales', error: true})
            return
        }

        setAlert({})

        // Post veterinarian to the API
        try {
            await axiosClient.post('/veterinarians', { name, email, password })
            setAlert({msg: 'Cuenta creada correctamente, revisa tu email', error: false})
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
                <h1 className="text-indigo-600 font-black text-4xl md:text-6xl mt-20 lg:mt-0">Crea tu cuenta y Administra tus{" "}<span className="text-grayishblack">Pacientes</span></h1>
            </div>
            <div className="bg-white rounded-xl md:shadow-lg md:p-10 mt-10 lg:mt-0">
                <form action="" className="mt-20 md:mt-0 form" onSubmit={ handleSubmit }>
                    <div>
                        <label className="text-grayishblack block text-xl font-bold">Nombre</label>
                        <input 
                            type="text" 
                            placeholder="Ingresa tu nombre" 
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-md" 
                            value={name}
                            id='name'
                            onChange={ e => setName(e.target.value)}
                            autoComplete="off"
                        />
                    </div>
                    <div className="mt-5">
                        <label className="text-grayishblack block text-xl font-bold">Correo electrónico</label>
                        <input 
                            type="email" 
                            placeholder="Ingresa tu correo electrónico" 
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-md"
                            value={email}
                            onChange={ e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mt-5">
                        <label className="text-grayishblack text-xl font-bold">Contraseña</label>
                        <input 
                            type="password" 
                            placeholder="Ingresa tu contraseña" 
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-md"
                            value={password}
                            onChange={ e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mt-5">
                        <label className="text-grayishblack text-xl font-bold">Repetir contraseña</label>
                        <input 
                            type="password" 
                            placeholder="Repite tu contraseña" 
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-md"
                            value={repeatPassword}
                            onChange={ e => setRepeatPassword(e.target.value)}
                        />
                    </div>

                    
                    <input type="submit" value="Crear cuenta" className="w-full bg-indigo-700 text-white font-bold py-4 rounded-md mt-7 hover:cursor-pointer hover:bg-indigo-800"/>
                    
                    { msg && <FormAlert alert={ alert }/> }

                    <div className="mt-5 text-center">
                        <span className="text-gray-500">¿Ya tienes una cuenta? </span> 
                        <Link className="text-indigo-600 hover:underline" to="/">Inicia Sesión</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register