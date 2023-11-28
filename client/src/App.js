import logo from './logo.svg';
import './App.css';
import Form from './screens/Form';
import Input from './components/Input';
import Dashboard from './screens/Dashboard/Dashboard';

function App() {
  return (
    <div className = "bg-[#F2FFE9] h-screen flex justify-center items-center"> 
      {/* <Form/> */}
      <Dashboard/>
    </div>
  );
}

export default App;
