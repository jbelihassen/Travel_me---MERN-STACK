import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Auth from './Views/Auth';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './private/PrivateRoutes';
import Dashbord from './Views/Dashboard';
import Login from './components/Login';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import Navbar from './components/Navbar';
import io from "socket.io-client"
export const ShelterContext = React.createContext()
function App() {
  const [socket] = useState(() => io(":5000"))
  const [currentUser, setCurrentUser] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const config = {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    };
    // console.log(`Token => ${localStorage.getItem('token')}`);
    axios
      .get('http://localhost:5000/api/user/', config)
      .then((res) => {
        setCurrentUser(res.data);
        console.log('**** => ', res.data);
        setIsLoading(false);
      })
      .then(()=>socket.emit("change_made_user_connected",currentUser))
      .catch((err) => console.log('*** ==> ', err));
  }, [refresh]);

  const refresher = () => {
    setRefresh(!refresh);
  };
  useEffect(() => {

    socket.on("send_new_user_connected", data => setCurrentUser(data))
    return () => socket.disconnect(true)
  },[])

  return (
    <ShelterContext.Provider 
    value={[currentUser, setCurrentUser]}
    >
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:id" element={<Profile currentUser={currentUser}/>} />
          <Route path="/Edit/profile/:id" element={<EditProfile currentUser={currentUser}/>} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Navbar  currentUser={currentUser}/>
                <Dashbord
                  currentUser={currentUser}
                  isLoading={isLoading}
                  refresh={refresh}
                />
                
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
    </ShelterContext.Provider>
  );
}

export default App;
