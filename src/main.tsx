import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App';

import './styles/reset.css';
import 'react-toastify/dist/ReactToastify.css';
import './styles/style.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
