import logo from './logo.svg';
import './App.css';
import Form from './screens/Form';
import Input from './components/Input';
import Dashboard from './screens/Dashboard/Dashboard';
import {Routes,Route} from 'react-router-dom';


function App() {
  return (
    <Routes>
      <Route path='/users/signup' element={<Form isSignIn = {false}/>}/>
      <Route path='/users/signin' element={<Form isSignIn = {true}/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
  );
}

export default App;
