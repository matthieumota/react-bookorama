import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './Home.tsx'
import About from './About.tsx'
import BookSingle from './BookSingle.tsx'
import { UserProvider } from './UserContext.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, Component: Home },
      { path: 'a-propos', element: <About /> },
      { path: 'livre/:id', element: <BookSingle /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>,
)
