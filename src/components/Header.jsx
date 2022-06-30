import { Link } from "react-router-dom"
import useAuth from '../hooks/useAuth'
import usePatients from "../hooks/usePatients"

const Header = () => {

  const { signOut } = useAuth()
  const { setPatient } = usePatients()

  const handleSignOut = () => {
    setPatient('')
    signOut()
  }
  
  return (
    <header className="py-5 bg-indigo-600 text-white">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <p className="font-bold text-2xl text-center">Administrador de Veterinaria</p>
        <nav className="items-center flex flex-col lg:flex-row mt-5 lg:mt-0 gap-3 lg:gap-7">
          <Link to="/admin" className="uppercase font-bold hover:underline">Pacientes</Link>
          <Link to="/admin/profile" className="uppercase font-bold hover:underline">Perfil</Link>

          <button 
            type="button" 
            className="uppercase font-bold hover:underline"
            onClick={handleSignOut}
          >Cerrar Sesión</button>
        </nav>
      </div>
    </header>
  )
}

export default Header