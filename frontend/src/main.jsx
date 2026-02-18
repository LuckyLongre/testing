import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { UserProvider } from './components/providers/UserProvider';
import App from './App';


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <UserProvider>
        <App />
      </UserProvider>
  </StrictMode>
);
