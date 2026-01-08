import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { StringTuneProvider } from './components/string-tune'
import theme from './styles/themes/theme'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StringTuneProvider modules={['parallax']}>
        <App />
      </StringTuneProvider>
    </ThemeProvider>
  </StrictMode>,
)
