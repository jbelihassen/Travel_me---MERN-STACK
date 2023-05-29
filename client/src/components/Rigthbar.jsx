import {
    Avatar,
    AvatarGroup,
    Box,
    Divider,
    ImageList,
    ImageListItem,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from "@mui/material";
import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

const Rightbar = (currentUser) => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        axios.get("http://127.0.0.1:5000/api/users")
            .then(res => {
                console.log("Server Response ", res.data)
                setUsers(res.data)
            })
            .catch(err => console.log(err))
    }, []);
    return (
        <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
            <Box position="fixed" width={300}>

                <List>


                    <Typography variant="h5" fontWeight={400} mt={2}>
                        The Travelers
                    </Typography>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

                        {users &&
                            users.map((user) =>
                                user._id !== currentUser._id ? (

                                    <div key={user._id} >
                                        <ListItem alignItems="flex-start"    sx={{ display: 'flex' ,   alignItems:'center'}} >
                                            <ListItemAvatar>
                                                <Avatar alt="Remy Sharp" src={user.image} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={<Link to={`/profile/${user._id}`}                style={{ textDecoration: 'none', color: 'GoldenRod' }} >  {user.firstName} {user.lastName}       </Link>}
                                                // secondary={
                                                //     <React.Fragment>
                                                //         <Typography
                                                //             sx={{ display: 'inline' }}
                                                //             component="span"
                                                //             variant="body2"
                                                //             color="text.primary"
                                                //         >

                                                //         </Typography>
                                                //         {/* {"I'll be in your neighborhood doing errands this…"} */}
                                                //     </React.Fragment>
                                                // }
                                            />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />

                                    </div>

                                ) : null
                            )}

                    </List>

                </List>
            </Box>
        </Box>
    );
};

export default Rightbar;
