import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <>
        <main className='container mx-auto lg:grid lg:grid-cols-2 lg:gap-10 px-10 main-section items-center'>
          <Outlet />
        </main>
    </>
  )
}

export default AuthLayout