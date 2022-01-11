import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom'
import { QueryClientProvider } from 'react-query';
import queryClient from './react-query-client'
import { ReactQueryDevtools } from 'react-query/devtools'

import useToken from './useToken'
import tokenContext from './tokenContext';

import Navbar from './components/PostFolder/Navbar'
import SingleClass from './components/ClassFolder/SingleClass'
import SignUp from './components/AuthenticationFolder/SignUp'
import Login from './components/AuthenticationFolder/Login'
import HomePage from './components/HomePage'
import Home from './components/Home'


function App() {
  const [token, setToken] = useToken()
  return (
    <Router>
      <tokenContext.Provider value={{ token, setToken }}>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Routes>
            <Route exact path='/' element={token ? <Navigate to='/home' /> : <HomePage />} />
            <Route path='/home' element={!token ? <Navigate to='/' /> : <Home />} />
            <Route path='/signup' element={token ? <Navigate to='/home' /> : <SignUp />} />
            <Route path='/login' element={token ? <Navigate to='/home' /> : <Login />} />
            <Route path='/class/:class_id' element={!token ? <Navigate to='/home' /> : <SingleClass />} />
          </Routes>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </tokenContext.Provider>
    </Router>
  );
}

export default App;
