import { Route } from 'wouter'
import './App.css'
// import { Login } from './pages/login'
import { Toaster } from 'sonner'
import { Dashboard } from './pages/dashboard/page'
import { Home } from './pages/home/page'
// import LandingPage from './pages/LandingPage';

function App() {
  return (
    <>
      <Toaster richColors />
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      {/* <Route path="/login" component={Login} /> */}
      {/* <Route path="/dashboard" component={Dashboard} /> */}
    </>
  )
}

export default App
