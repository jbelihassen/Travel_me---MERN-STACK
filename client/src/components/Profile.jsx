import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import AddPost from './AddPost'
import Navbar from './Navbar'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import { Avatar, CardHeader, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const Profile = ({ currentUser }) => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/getUseById/" + id)
      .then(response => setUser(response.data))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    if (user) {
      axios.get("http://127.0.0.1:5000/api/posts")
        .then(res => {
          console.log("Server Response ============ ", res.data)
          const userPosts = res.data.filter(post => post.creator === user._id)
          setPosts(userPosts)
        })
        .catch(err => console.log(err))
    }
  }, [user])
  const deletePost = (id) => {
    axios.delete(`http://127.0.0.1:5000/api/deletePost/${id}`)
      .then(res => {
        console.log("Post deleted ✅✅", res.data)
        setPosts(posts.filter((post) => post._id !== id))
      })
      .catch(err => console.log(err))
  }
  if (!user) {
    return <div>Loading...</div>
  }
  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear().toString();
    return `${day}/${month}/${year}`;
  };
  const isCurrentUserProfile = currentUser && currentUser._id === user._id
  return (
    <div className="gradient-custom-2" >

      <Navbar currentUser={currentUser} />
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">

          <MDBCol lg="9" xl="9">
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundImage: 'url(https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg)', height: '200px' }}>

                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  {user && (
                    <div>
                      <MDBCardImage src={user.image} alt={user.firstName} className="mt-4 mb-2 img-thumbnail  rounded-circle" fluid style={{ width: '150px', zIndex: '1' }} />
                      <div className="ms-3" style={{ marginTop: '130px' }}>
                        <MDBTypography tag="h5">{user.firstName}</MDBTypography>
                        <MDBCardText>{user.email}</MDBCardText>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}> */}
              <div className="d-flex justify-content-end text-center py-1">
                {/* <div>
                    <MDBCardText className="mb-1 h5">253</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Photos</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">1026</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">478</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                  </div> */}
              </div>
              {/* </div> */}

              {/* Edit Profile link */}



              <MDBCardBody className="text-black p-4">
                <div className="mb-5">

                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                    <p className="lead fw-normal mb-1">{user.firstName} {user.lastName}</p>
                    <div className="d-flex justify-content-end m-2">

                      {isCurrentUserProfile && (
                        // <MDBBtn outline color="dark" style={{ height: '36px', overflow: 'visible' }}>
                        <Link to={`/Edit/profile/${currentUser._id}`}><EditIcon color="action" /></Link>
                        // </MDBBtn>
                      )}
                    </div>
                    <MDBCardText className="font-italic mb-1">  Web Developer</MDBCardText>
                    <MDBCardText className="font-italic mb-1"></MDBCardText>
                    <MDBCardText className="font-italic mb-0">Photographer</MDBCardText>
                  </div>
                </div>

                {isCurrentUserProfile && (<AddPost currentUser={currentUser} />)}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBCardText className="lead fw-normal mb-0">Recent photos</MDBCardText>
                  <MDBCardText className="mb-0"><a href="#!" className="text-muted">Show all</a></MDBCardText>
                </div>
                {posts.length > 0 ? (
                  <ul>
                    {posts.map(post => (
                      <div key={post._id}>
                        <CardHeader
                          avatar={
                            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">

                            </Avatar>
                          }
                          action={
                            <IconButton aria-label="settings">
                              {/* <MoreVert /> */}
                            </IconButton>
                          }
                          title={post.creatorFirstName}

                          subheader={formatDate(post.createdAt)}
                        />
                        <p className="m-3">{post.description}</p>
                        <MDBRow>

                          <MDBCol className="mb-2">
                            <MDBCardImage src={post.image}
                              alt={post._id} className="w-100 rounded-3" />
                          </MDBCol>
                        </MDBRow>

                        {post.likeCount}Likes
                        {isCurrentUserProfile && (
                        <IconButton color="danger" aria-label="upload picture" component="label">
                          <input hidden onClick={() => { deletePost(post._id) }} type="submit" />
                          <DeleteIcon />
                        </IconButton>
                         )}
                        <hr />
                      </div>
                    ))}
                  </ul>
                ) : (
                  <p>No posts yet</p>
                )}


              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>

  )
}

export default Profile