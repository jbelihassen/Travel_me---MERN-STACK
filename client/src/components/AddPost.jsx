import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';

const AddPost = ({ onAddPost }) => {
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null)
    const [currentUser, setCurrentUser] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
        const navigationTo = async () => {
            if (!localStorage.getItem('userLogedIn')) {
                navigate("/login");
            }
            else {
                setCurrentUser(await JSON.parse(localStorage.getItem('userLogedIn')));
                setIsLoaded(true);
            }
        }
        navigationTo();
    }, []);
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(currentUser._id)

        const formData = new FormData();
        formData.append('description', description);
        formData.append('creator', currentUser._id);
        formData.append('creatorFirstName', currentUser.firstName);
        formData.append('creatorLastName', currentUser.lastName);
        formData.append('image', image);

        const config = {
            headers: {
                authorization: localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data', // set content type as multipart/form-data
            },
        };

        axios.post('http://localhost:5000/api/newPost', formData, config)
            .then((res) => {
                console.log(currentUser.post)
                console.log(res);
                currentUser.post.push(res.data._id)
                console.log(currentUser.post)
                setDescription("")
                onAddPost(res.data);

            })
            .catch((err) => console.log(err));

    }
    const ImageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const theme = createTheme();
    return (
        <>
            {currentUser && (
                <Card sx={{ margin: 5, pb: 2 }}>
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',

                                }}
                            >

                                <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>

                                    <TextField

                                        margin="normal"
                                        required
                                        fullWidth
                                        label={"Share your thoughts " + currentUser.firstName}
                                        name="description"
                                        value={description}
                                        autoFocus
                                        color="warning"
                                        onChange={(e) => setDescription(e.target.value)}
                                    />

                                    <Stack direction="row" alignItems="center" spacing={53}>

                                        <IconButton color="dark" aria-label="upload picture" style={{ color: 'GoldenRod', fontSize: 50 }} component="label">
                                            <input hidden accept="image/*" type="file" onChange={(e) => ImageHandler(e)} />
                                            <PhotoCamera />
                                        </IconButton>
                                        <Button style={{ backgroundColor: 'GoldenRod', color: 'white' }} variant="contained" component="label" >
                                            Post
                                            <input hidden type="submit" />
                                        </Button>
                                    </Stack>
                                </Box>
                            </Box>

                        </Container>
                    </ThemeProvider>
                </Card>
            )}
        </>
    );
};

export default AddPost;