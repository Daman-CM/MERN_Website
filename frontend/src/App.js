//In this route app component, inside this we make a react router to make a home page route
//In the Home Route we show the Home component(found in the pages folder)
//Browser Router wraps everywhere we want to use the router
//Routes wraps all individual routes
//Route create a single routes
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

// pages and components
import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
     <BrowserRouter>
      <Navbar/>
      <div className="pages">
        <Routes>
          <Route  path="/" element = {user ? <Home/>: <Navigate to={"/login"}/>}/>
          <Route  path= "/login"  element = {!user ? <Login/>:<Navigate to={"/"}/>}/>
          <Route  path= "/signup"  element = {!user ? <Signup/>:<Navigate to={"/"}/>} />
        </Routes>
      </div>
     </BrowserRouter>
    </div>
  );
}

export default App;
