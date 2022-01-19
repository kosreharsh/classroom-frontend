import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom'
import { QueryClientProvider } from 'react-query';
import queryClient from './constants/react-query-client'
import { ReactQueryDevtools } from 'react-query/devtools'

// import useToken from './hooks/useToken'
import useUser from './hooks/useUser';

import userContext from './Contexts/userContext'
// import tokenContext from './Contexts/tokenContext'

import HomePage from './components/HomePage'
import Navbar from './components/Navbar'
import SignUp from './components/AuthenticationFolder/SignUp'
import Login from './components/AuthenticationFolder/Login'
import Home from './components/Home'
import SingleClass from './components/ClassFolder/SingleClass'
import PostList from './components/PostFolder/PostList';
import AssignedTask from './components/AssignmentFolder/AssignedTask'
import AssignedTasksList from './components/AssignmentFolder/AssignedTasksList';
import Quiz from './components/QuizFolder/Quiz';
import QuizzesList from './components/QuizFolder/QuizzesList';


function App() {
  // const [token, setToken] = useToken()
  const [user, setUser] = useUser()

  return (
    <Router>
      {/* <tokenContext.Provider value={{ token, setToken }} >
      </tokenContext.Provider> */}
      <userContext.Provider value={{ user, setUser }}>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Routes>
            <Route exact path='/' element={user ? <Navigate to='/home' /> : <HomePage />} />
            <Route path='/home' element={!user ? <Navigate to='/' /> : <Home />} />
            <Route path='/signup' element={user ? <Navigate to='/home' /> : <SignUp />} />
            <Route path='/login' element={user ? <Navigate to='/home' /> : <Login />} />
            <Route path='/class/:class_id' element={!user ? <Navigate to='/' /> : <SingleClass />} >
              <Route path='' element={<PostList />} />
              <Route path='tasks/*' element={<AssignedTasksList />}>
                <Route path=':id' element={<AssignedTask />} />
              </Route>
              <Route path='quiz/*' element={<QuizzesList />}>
                <Route path=':quiz_id' element={<Quiz />} />
              </Route>
            </Route>
          </Routes>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </userContext.Provider>

    </Router>
  );
}

export default App;
