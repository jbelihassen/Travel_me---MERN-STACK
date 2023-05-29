import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import AddPost from '../components/AddPost';
import Feed from '../components/Feed';
import Rightbar from '../components/Rigthbar';
import Sidebar from '../components/Sidebar';

const Dashboard = ({ currentUser, refresh }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const config = {
      headers: {
        authorization: localStorage.getItem('token'),
      },

    };

    axios
      .get('http://localhost:5000/api/posts', config)
      .then((res) => {
        setPosts(res.data);
        // console.log(res.data.pirates);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  const navigate = useNavigate();

  // LOGOUT
  const logoutHandler = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  const addNewPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };
  return (
    <div>
      <div >

        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar />

          <Box sx={{ width: 700 }}     >
            <AddPost currentUser={currentUser} onAddPost={addNewPost} />
            <Feed onAddPost={addNewPost} posts={posts} isLoading={isLoading} />
          </Box>

          <Rightbar currentUser={currentUser} />
        </Stack>
      </div>

      <button onClick={logoutHandler}>Logout</button>

    </div>
  );
};

export default Dashboard;
