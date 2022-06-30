import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import FormAlert from "../components/FormAlert"
import axiosClient from '../config/axios'

const ConfirmAccount = () => {

  const [ confirmedAccount, setConfirmedAccount] = useState(false)
  const [ loading, setLoading ] = useState(true)
  const [ alert, setAlert ] = useState({})

  const params = useParams()
  const { token } = params


  
  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const { data } = await axiosClient(`/veterinarians/confirm/${token}`)

        setConfirmedAccount(true)
        setAlert({
          msg: data.msg,
          error: false
        })
      } catch (error) {
        setConfirmedAccount(false)
        setAlert({
          msg: error.response.data.msg,
          error: true
        })
      }

      setLoading(false)
    }
    confirmAccount()
  }, [])

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-4xl md:text-6xl mt-20 lg:mt-0">Confirma tu cuenta y comienza a administrar a{" "}<span className="text-grayishblack">tus Pacientes</span></h1>
      </div>
      <div className="bg-white rounded-xl md:shadow-lg md:p-10 mt-10 lg:mt-0">
        {!loading && 
          <FormAlert 
            alert={alert}
            className='mt-0'
          />
        }
        {
          confirmedAccount && (
            <div className="mt-5 text-center">
              <span className="text-gray-500">Tu cuenta ya está confirmada </span> 
              <Link className="text-indigo-600 hover:underline" to="/">Inicia Sesión</Link>
            </div>
          )
        }
      </div>
    </>
  )
}

export default ConfirmAccount