import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Pokemones from './Pokemones.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Pokemones />
  </StrictMode>,
)
