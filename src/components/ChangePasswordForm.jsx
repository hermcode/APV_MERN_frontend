import React, { useState } from 'react'
import FormAlert from './FormAlert'
import PasswordInput from './PasswordInput'
import useAuth from '../hooks/useAuth'

const ChangePasswordForm = () => {

  const { savePassword } = useAuth()

  /** States ======================================================= */
  
  const [alert, setAlert] = useState({})
  const [newPass, setNewPass] = useState('')
  const [actualPass, setActualPass] = useState('')
  
  /** Functions ======================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault()

    if([newPass, actualPass].includes('')){
      setAlert({
        msg: 'Todos los campos son obligatorios',
        error: true
      })

      return
    }

    if(newPass.length < 6) {
      setAlert({
        msg: 'La contraseña debe tener al menos 6 caracteres',
        error: true
      })

      return
    }

    setAlert({})
    const response = await savePassword({newPass, actualPass})
    setAlert(response)

    setTimeout(() => {
      setAlert({})
    }, 5000 )
  }

  const { msg } = alert

  return (
    <div className='w-full lg:w-1/2 lg:mx-auto mt-5 bg-white p-10 shadow-md rounded-lg'>
      <div className='w-full'>
        <form onSubmit={handleSubmit}>
          <PasswordInput
            passLabelText={'Contraseña nueva'}
            name={'new_pass'}
            placeholderText={'Ingresa tu nueva contraseña'}
            passCheckboxId={'new_pass'}
            passValue={newPass}
            setPassword={setNewPass}
          />

          <div className='my-5'>
            <PasswordInput
              passLabelText={'Contraseña actual'}
              name={'actual_pass'}
              placeholderText={'Ingresa tu contraseña actual'}
              passCheckboxId={'actual_pass'}
              passValue={actualPass}
              setPassword={setActualPass}
            />
          </div>

          { /** Submit button */}
          <input
            type="submit"
            value='Guardar cambios'
            className="w-full bg-indigo-700 text-white font-bold py-4 rounded-md hover:cursor-pointer hover:bg-indigo-900 uppercase transition-colors"
          />

          {msg && <FormAlert alert={alert} />}

        </form>
      </div>
    </div>
  )
}

export default ChangePasswordForm