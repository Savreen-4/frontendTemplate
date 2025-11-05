import {Route, Routes} from 'react-router-dom'
import {Registration} from './components/Registration'
import {Login} from './components/Login'
import {AuthLayout} from './AuthLayout'
import ResetLinkPage from './components/ResetLinkMessagePage'

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='login' element={<Login />} />
      <Route path='registration' element={<Registration />} />
      {/* <Route path='forgot-password' element={<ForgotPassword />} /> */}
      {/* <Route path='change-password' element={<ChangePassword />} /> */}
      <Route path='reset-link-sent' element={<ResetLinkPage />} />


      <Route index element={<Login />} />
    </Route>
  </Routes>
)

export {AuthPage}
