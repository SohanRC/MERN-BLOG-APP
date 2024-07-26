import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import { HomePage, AboutPage, ProjectPage, SignInPage, SignUpPage, DashboardPage } from "./pages/pages.js"
import { Provider } from "react-redux"
import { store, persistor } from './store/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import ThemeProvider from './components/ThemeProvider.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import AdminPrivateRoute from './components/AdminPrivateRoute.jsx'
import CreatePost from './components/CreatePost.jsx'
import PostPage from './pages/PostPage.jsx'
import EditPost from './components/EditPost.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route path='/' element={<HomePage />} />
            <Route path='about' element={<AboutPage />} />
            <Route path='projects' element={<ProjectPage />} />
            <Route path='signin' element={<SignInPage />} />
            <Route path='signup' element={<SignUpPage />} />
            <Route path='dashboard' element={
                <PrivateRoute>
                    <DashboardPage />
                </PrivateRoute>
            } />
            <Route path='create-post' element={
                <AdminPrivateRoute>
                    <CreatePost />
                </AdminPrivateRoute>
            } />
            <Route path='post/:postId' element={<PostPage />} />
            <Route path='edit-post/:postId' element={
                <AdminPrivateRoute>
                    <EditPost />
                </AdminPrivateRoute>
            } />
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider>
                <RouterProvider router={router}>
                </RouterProvider>
            </ThemeProvider>
        </PersistGate>
    </Provider>

)
