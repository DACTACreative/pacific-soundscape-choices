import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AudioProvider } from './context/AudioContext'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <AudioProvider>
    <App />
  </AudioProvider>
);
