import {BrowserRouter as Router, Routes, Route}  from 'react-router-dom'

import Login from './layout/Login'
import Layout from './layout/Layout'
import Home from './pages/Home'
import LoginForm from './pages/LoginForm';
import NewClient from './pages/NewClient'
import EditClient from './pages/EditClient'
import ViewClient from './pages/ViewClient';

const App = () => {
  return (
    
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}>
          <Route index element={<LoginForm/>}/>
        </Route>

        <Route path='/clients' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='new' element={<NewClient/>}/>
          <Route path='edit/:id' element={<EditClient/>}/>
          <Route path=':id' element={<ViewClient/>}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;