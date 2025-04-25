import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Example } from './Example'
import { GroupGrid } from './Group'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Example />
    <br/>
    <GroupGrid/>
  </StrictMode>,
)
