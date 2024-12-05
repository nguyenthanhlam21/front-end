import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { LoadingProvider } from './contexts/loading.tsx'
import { ThemeProvider } from './contexts/theme.tsx'
import axios from 'axios'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


axios.defaults.baseURL = "http://localhost:8000";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <ThemeProvider>
        <App />
        <ToastContainer />
        </ThemeProvider>
      </LoadingProvider>
    </BrowserRouter>
  </StrictMode>,
)
