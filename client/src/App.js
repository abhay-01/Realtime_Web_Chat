import logo from './logo.svg';
import './App.css';
import Form from './screens/Form';
import Input from './components/Input';
import Dashboard from './screens/Dashboard/Dashboard';


import { Routes, Route, Navigate } from 'react-router-dom';



//what is ProtectedRoutes?
// If the user is not authenticated, we will redirect them to the login page.
// If the user is authenticated, we will render the component that was passed in.
// and we will pass the props that were passed to the ProtectedRoute component to the component that was passed in.

const ProtectedRoute = ({ children,auth=false}) => {

  const LoggedIn = localStorage.getItem("user:token") !== null || false;
  console.log("Loggedin-->", LoggedIn);



  //auth here means if the user is authenticated or not 
  //if the user is not authenticated and the auth is true then we will redirect the user to the login page
  //if the user is authenticated and the auth is false then we will redirect the user to the dashboard page
  if (!LoggedIn && auth) {
    console.log("Redirecting to signin");
    return <Navigate to='/users/signin' />
  } else if (LoggedIn && ['/users/signin', '/users/signup'].includes(window.location.pathname)) {
    console.log("Redirecting to dashboard");
    return <Navigate to='/' />
  }

  return children;
}

function App() {
  return (
    <Routes>
      <Route path='/users/signup' element={
        <ProtectedRoute>
          <Form isSignIn={false} />
        </ProtectedRoute>
      } />
      <Route path='/users/signin' element={
        <ProtectedRoute>
          <Form isSignIn={true} />
        </ProtectedRoute>
      } />
      <Route path='/' element={
        <ProtectedRoute auth = {true}>
          <Dashboard />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;