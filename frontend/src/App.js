// import logo from './logo.svg';
import './App.css';
import Register from './components/Register';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import {useAuth} from './context/Authorization';
import { ToastContainer } from 'react-toastify';
function App() {
  console.log("im here and there");
  const [authToken,setauthToken] = useAuth();
  console.log("this is token",authToken);
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path='/login' element = {!authToken?<Register/>:<Navigate to="/" replace/>} />
        <Route path='/' element = {authToken?<Home/>:<Navigate to="/login" replace/>} />
      </Routes>
    </Router>
  );
}

export default App;
