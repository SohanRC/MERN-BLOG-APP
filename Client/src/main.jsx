import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import {HomePage, AboutPage, ProjectPage, SignInPage, SignUpPage, DashboardPage} from "./pages/pages.js"

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route path='/' element={<HomePage />} />
            <Route path='about' element={<AboutPage />} />
            <Route path='projects' element={<ProjectPage />} />
            <Route path='signin' element={<SignInPage />} />
            <Route path='signup' element={<SignUpPage />} />
            <Route path='dashboard' element={<DashboardPage />} />
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}>

    </RouterProvider>
)
