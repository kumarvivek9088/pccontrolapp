// import logo from './logo.svg';
import './App.css';
import Register from './components/Register';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element = {<Register/>} />
        <Route path='/' element = {<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;
