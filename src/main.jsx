import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import 'modern-normalize';
import './main.css';
import App from './components/app/app.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            border: '1px solid var(--bg-color)',
            padding: '4px 12px',
            color: 'var(--bg-color)',
            backgroundColor: 'var(--txt-color)',
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>
);
