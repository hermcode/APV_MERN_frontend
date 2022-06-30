import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth'
import FormAlert from './FormAlert';

const EditProfileForm = () => {

  const { auth, updateProfileData } = useAuth()

  /** States ================================================ */
  
  const [profile, setProfile] = useState({})
  const [alert, setAlert] = useState({})
  
  /** Functions ================================================ */
  
  const handleSubmit = async(e) => {
    e.preventDefault()

    const { name, email } = profile

    if([name, email].includes('')) {
      setAlert({
        msg: 'Nombre y Correo electrónico son obligatorios',
        error: true
      })

      setTimeout(() => {
        setAlert({})
      }, 5000)

      return
    }

    const result = await updateProfileData(profile)
    setAlert(result)
  }
  
  useEffect(() => {
    if(auth?._id) {
      setProfile(auth)
    }
  }, [auth])

  const {msg} = alert

  return (
    <div className='w-full lg:w-1/2 lg:mx-auto mt-5 bg-white p-10 shadow-md rounded-lg'>
      <div className='w-full'>
        <form onSubmit={handleSubmit}>
          <div className='mb-5'>
            <label htmlFor='name' className="text-grayishblack block text-xl font-bold">Nombre:</label>
            <input
              type="text"
              placeholder="Ingresa tu nombre"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-md"
              name='name'
              value={profile.name || ''}
              onChange={(e) => setProfile({
                ...profile,
                [e.target.name]: e.target.value
              })}
            />
          </div>
          <div className='mb-5'>
            <label htmlFor='email' className="text-grayishblack block text-xl font-bold">Correo electrónico:</label>
            <input
              type="text"
              placeholder="Ingresa tu correo electronico"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-md"
              name='email'
              value={profile.email || ''}
              onChange={(e) => setProfile({
                ...profile,
                [e.target.name]: e.target.value
              })}
            />
          </div>
          <div className='mb-5'>
            <label htmlFor='telephone' className="text-grayishblack block text-xl font-bold">Teléfono:</label>
            <input
              type="phone"
              placeholder="Ingresa tu número telefónico"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-md"
              name='telephone'
              value={profile.telephone || ''}
              onChange={(e) => setProfile({
                ...profile,
                [e.target.name]: e.target.value
              })}
            />
          </div>
          <div className='mb-5'>
            <label htmlFor='web' className="text-grayishblack block text-xl font-bold">Sitio web:</label>
            <input
              type="url"
              placeholder="http://tusitioweb.com"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-md"
              name='web'
              value={profile.web || ''}
              onChange={(e) => setProfile({
                ...profile,
                [e.target.name]: e.target.value
              })}
            />
          </div>

          { /** Submit button */}
          <input 
            type="submit" 
            value='Guardar cambios'
            className="w-full bg-indigo-700 text-white font-bold py-4 rounded-md hover:cursor-pointer hover:bg-indigo-900 uppercase transition-colors"
          />
        { msg && <FormAlert alert={alert} />}
          
        </form>
      </div>
    </div>
  )
}

export default EditProfileForm