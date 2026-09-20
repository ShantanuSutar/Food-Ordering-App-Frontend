import { Route, Routes } from 'react-router-dom'
import { AdminRoute } from './AdminRoute'
import CustomerRoute from './CustomerRoute'

export const Routers = () => {
  return (
    <Routes>
        <Route path='/admin/restaurant/*' element={<AdminRoute />} />
        <Route path='/*' element={<CustomerRoute />} />
    </Routes>
  )
}
