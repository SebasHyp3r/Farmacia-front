import { Route } from 'wouter'
import './App.css'
import { Login } from './pages/login'
import { Dashboard } from './pages/dashboard'
import { Toaster } from 'sonner'

function App() {

  return (
    <>
      <Toaster richColors/>
      <Route path="/dashboard" component={Dashboard} />

    </>
  )
}

export default App
