import { createRoot } from 'react-dom/client'
// Axios
import axios from 'axios'
import { Chart, registerables } from 'chart.js'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter } from 'react-router-dom' // 👈 Import BrowserRouter
// Apps
import { MetronicI18nProvider } from './_metronic/i18n/Metronici18n'
import './_metronic/assets/fonticon/fonticon.css'
import './_metronic/assets/keenicons/duotone/style.css'
import './_metronic/assets/keenicons/outline/style.css'
import './_metronic/assets/keenicons/solid/style.css'
import './_metronic/assets/sass/style.scss'
import './_metronic/assets/sass/plugins.scss'
import './_metronic/assets/sass/style.react.scss'
import { AppRoutes } from './app/routing/AppRoutes'
import { AuthProvider, setupAxios } from './app/modules/auth'
import { Provider } from 'react-redux'
import { store } from './app/redux/store'
import Toster from './app/utlis/toaster'

setupAxios(axios)
Chart.register(...registerables)

const queryClient = new QueryClient()
const container = document.getElementById('root')

if (container) {
  createRoot(container).render(
    <Provider store={store}>
      <MetronicI18nProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter> {/* ✅ Wrap your routing here */}
              <AppRoutes />
              <Toster />
              {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </BrowserRouter>
          </QueryClientProvider>
        </AuthProvider>
      </MetronicI18nProvider>
    </Provider>
  );
}
