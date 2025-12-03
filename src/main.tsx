import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.ts'
import { RouterProvider } from 'react-router'
import router from './router/router.tsx'
import { PersistGate } from 'redux-persist/integration/react'
import 'react-confirm-alert/src/react-confirm-alert.css';
import { UserLocationProvider } from './context/UserLocationContext.tsx'
import {  LoadScript } from "@react-google-maps/api";
import LoadingPage from './pages/LoadingPage.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <UserLocationProvider>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      loadingElement={<LoadingPage></LoadingPage>}
      >
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        
    <RouterProvider router={router} />

      </PersistGate>
    </Provider>
</LoadScript>
    </UserLocationProvider>
    
  </StrictMode>,
)
