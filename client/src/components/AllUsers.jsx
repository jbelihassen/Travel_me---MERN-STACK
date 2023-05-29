import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AllUsers = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const navigationTo = async () => {
      if (!localStorage.getItem('userLogedIn')) {
        navigate('/login');
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem('userLogedIn')));
        setIsLoaded(true);
      }
    };
    navigationTo();
  }, []);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/api/users')
      .then((res) => {
        console.log('Server Response ', res.data);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {users &&
        users.map((user) =>
          user._id !== currentUser._id ? (
            <div key={user._id} className="card" style={{ marginBottom: '20px' }}>
              <div className="container" style={{ backgroundColor: '#ede4e9', display: 'flex' }}>
                <div>
                  <img src={user.image} style={{ width: '200px', height: '200px' }} alt="" />
                </div>
                <div
                  className="container"
                  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}
                >
                  <Link to={`/profile/${user._id}`}>
                    <h4>{user.firstName}</h4>
                  </Link>
                </div>
              </div>
            </div>
          ) :"",
        )}
    </div>
  );
};

export default AllUsers;
