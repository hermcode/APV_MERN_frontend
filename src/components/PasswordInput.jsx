import { useState } from 'react'

const PasswordInput = ({ passLabelText, name, placeholderText, passCheckboxId, passValue, setPassword}) => {

  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="">
      <label className="text-grayishblack text-xl font-bold">{passLabelText}</label>
      <input
        type={showPassword ? 'text' : 'password'}
        name={name}
        placeholder={placeholderText}
        className="border w-full p-3 mt-3 bg-gray-50 rounded-md"
        value={passValue}
        autoComplete="current-password"
        onChange={e => setPassword(e.target.value)}
      />
      <div className='mt-2'>
        <input
          type="checkbox"
          onChange={() => setShowPassword(!showPassword)}
          className="p-2"
          id={passCheckboxId}
        />
        <label htmlFor={passCheckboxId} className='ml-2'>Mostrar contraseña</label>
      </div>
    </div>
  )
}

export default PasswordInput