import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import App from './App.jsx'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter client={queryClient}>
        <App />
      </BrowserRouter>
    </QueryClientProvider>


  </StrictMode>,
)
