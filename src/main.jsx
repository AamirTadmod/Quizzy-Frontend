import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import rootReducer from './reducer/index.js'
import { BrowserRouter } from 'react-router-dom'

export const store = configureStore({
  reducer: rootReducer,
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {/* Updated Toaster to match the clean IPQuest UI */}
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#ffffff',
              color: '#1e3a8a',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              fontWeight: '500'
            },
          }}
        />
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)