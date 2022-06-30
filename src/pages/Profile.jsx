import { useState } from "react"
import ChangePasswordForm from "../components/ChangePasswordForm"
import EditProfileForm from "../components/EditProfileForm"

const Profile = () => {

  /** States ============================================ */

  const [activeBtn, setActiveBtn] = useState('edit-profile')

  return (
    <div>
      <div className="flex justify-center gap-4 ">
        <button
          className={`border-b-4 ${activeBtn === 'edit-profile' ? 'border-indigo-600' : 'border-transparent'} font-bold text-sm lg:text-lg md:text-lg px-6 py-2 hover:bg-gray-200 `}
          onClick={() => setActiveBtn('edit-profile')}
          >Editar perfil</button>
        <button
          className={`border-b-4 ${activeBtn === 'change-password' ? 'border-indigo-600' : 'border-transparent'} font-bold text-sm lg:text-lg md:text-lg px-6 py-2  hover:bg-gray-200`}
          onClick={() => setActiveBtn('change-password')}
        >Cambiar contraseña</button>
      </div>

      <div className="mx-4">
        { activeBtn === 'edit-profile' 
          ? <EditProfileForm />
          : <ChangePasswordForm />
        }
      </div>

    </div>
  )
}

export default Profile