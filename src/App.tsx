import { Route } from 'wouter'
import './App.css'
// import { Login } from './pages/login'
import { Dashboard } from './pages/dashboard/dashboard'
import { Toaster } from 'sonner'
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <>
      <Toaster richColors />
      <Route path="/" component={LandingPage} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
    </>
  )
}

export default App
