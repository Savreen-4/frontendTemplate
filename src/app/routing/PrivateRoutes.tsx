import { FC, lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import { MenuTestPage } from '../pages/MenuTestPage'
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils'
import { WithChildren } from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import { Companies } from '../pages/companies/Companies'
import { Drivers } from '../pages/drivers/Drivers'
import DashboardWrapper from '../pages/dashboard/DashboardWrapper'
import { DriverDetail } from '../pages/drivers/driverDetail'
import { CompanyDetail } from '../pages/companies/companyDetail'
import { VehicleType } from '../pages/vehicleTypes/VehicleTypes'
import { VehicleTypeForm } from '../pages/vehicleTypes/vehicleTypeForm'
import { CompanyJobs } from '../pages/companyJobs/ConnectedJobs'
import { DriverJobs } from '../pages/driverJobs/DriverJobs'
import ChangePasswordForm from '../pages/changePassword/ChangePassword'
import { CMSPage } from '../pages/CMS/cms'
import { ContactUs } from '../pages/ContactUS/ContactUs'

const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path="/*" element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<DashboardWrapper />} />

        <Route
          path="change-password*"
          element={
            <SuspensedView>
              <ChangePasswordForm />
            </SuspensedView>
          }
        />
        
        <Route
          path="cms*"
          element={
            <SuspensedView>
              <CMSPage />
            </SuspensedView>
          }
        />

<Route
          path="contactus*"
          element={
            <SuspensedView>
              <ContactUs />
            </SuspensedView>
          }
        />
        
        <Route
          path="vehicleTypes*"
          element={
            <SuspensedView>
              <VehicleType />
            </SuspensedView>
          }
        />

        <Route
          path="vehicleTypes/add"
          element={
            <SuspensedView>
              <VehicleTypeForm />
            </SuspensedView>
          }
        />

        <Route
          path="vehicleTypes/:id"
          element={
            <SuspensedView>
              <VehicleTypeForm />
            </SuspensedView>
          }
        />


        <Route
          path="companies*"
          element={
            <SuspensedView>
              <Companies />
            </SuspensedView>
          }
        />

        <Route
          path="companies/jobs/:id*"
          element={
            <SuspensedView>
              <CompanyJobs />
            </SuspensedView>
          }
        />


        <Route
          path="companies/:id"
          element={
            <SuspensedView>
              <CompanyDetail />
            </SuspensedView>
          }
        />

        <Route
          path="drivers*"
          element={
            <SuspensedView>
              <Drivers />
            </SuspensedView>
          }
        />

        <Route
          path="drivers/jobs/:id*"
          element={
            <SuspensedView>
              <DriverJobs />
            </SuspensedView>
          }
        />

        <Route
          path="drivers/:id"
          element={
            <SuspensedView>
              <DriverDetail />
            </SuspensedView>
          }
        />


        <Route
          path="builder"
          element={
            <SuspensedView>
              <BuilderPageWrapper />
            </SuspensedView>
          }
        />
        <Route path="menu-test" element={<MenuTestPage />} />
        <Route
          path="crafted/pages/profile/*"
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path="crafted/pages/wizards/*"
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path="crafted/widgets/*"
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path="crafted/account/*"
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />

        {/* Page Not Found */}
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
}

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export { PrivateRoutes }
