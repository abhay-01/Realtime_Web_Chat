import logo from './logo.svg';
import './App.css';
import Form from './screens/Form';
import Input from './components/Input';
import Dashboard from './screens/Dashboard/Dashboard';


import {Routes,Route, Navigate} from 'react-router-dom';



//what is ProtectedRoutes?
// If the user is not authenticated, we will redirect them to the login page.
// If the user is authenticated, we will render the component that was passed in.
// and we will pass the props that were passed to the ProtectedRoute component to the component that was passed in.

const ProtectedRoute = ({children}) =>{

  const LoggedIn = localStorage.getItem("user:token") ? false : true;
  console.log("Loggedin-->",LoggedIn);


 if(!LoggedIn){
  console.log("Redirecting to signin");
   return <Navigate to = '/users/signin'/>
 }else if(LoggedIn && ['/users/signin','/users/signup'].includes(window.location.pathname)){
  console.log("Redirecting to dashboard");
   return <Navigate to = '/dashboard'/>
 }

  return children;
}

function App() {
  return (
    <Routes>
      <Route path='/users/signup' element={
        <ProtectedRoute>
          <Form isSignIn = {false}/>
        </ProtectedRoute>
      }/>
      <Route path='/users/signin' element={
        <ProtectedRoute>
          <Form isSignIn = {true}/>
        </ProtectedRoute>
      }/>
      <Route path='/dashboard' element={
        <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>
      }/>
    </Routes>
  );
}

export default App;
