import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import Navbar from './Navbar';

const EditProfile = ({ currentUser }) => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/api/getUseById/${id}`)
      .then((response) => {
        setUser(response.data);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setPassword(response.data.password);

      })
      .catch((err) => console.log(err));
  }, [id]);
  const nav = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('image', image);
    formData.append('bio', bio);
      
    axios
      .put(`http://127.0.0.1:5000/api/user/${currentUser._id}`, formData)
      .then((response) => {
        console.log("================================", formData);
        console.log(response.data);
        setUser(response.data);
        nav("/")
      })
      .catch((err) => console.log(err));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="gradient-custom-2">
      <Navbar currentUser={currentUser} />
      {user && (

        <form onSubmit={handleSubmit}>

          <div>
            {/* <div class="d-flex justify-content-center mb-4">
              <img src={user.image}
                class="rounded-circle" alt="example placeholder" style="width: 200px;" />
            </div> */}
            
          </div>

          <div class="row mb-4">
            <div class="col">
              <div class="form-outline">
              <label class="form-label" for="form3Example1">First name</label>
                <input type="text" value={firstName}
                  onChange={(e) => setFirstName(e.target.value)} class="form-control" />
                
              </div>
            </div>
            <div class="col">
              <div class="form-outline">
              <label class="form-label" for="form3Example2">Last name</label>
                <input type="text" value={lastName}
                  onChange={(e) => setLastName(e.target.value)} class="form-control" />
                
              </div>
            </div>
          </div>


          <div class="form-outline mb-4">
          <label class="form-label" for="form3Example3">Email address</label>
            <input type="email" value={email}
              onChange={(e) => setEmail(e.target.value)} class="form-control" />
          </div>

          <div class="form-outline mb-4">
          <label class="form-label" for="form3Example3">Bio</label>
            <textarea name="" id="" cols="10" rows="05" onChange={(e) => setBio(e.target.value)} class="form-control" ></textarea>
              
              </div>

          <div class="form-outline mb-4">
          <label class="form-label" for="form3Example4">Password</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} class="form-control" />   
          </div>

          <div class="d-flex mb-5">
              <div class="btn btn-warning btn-rounded">
                <label class="form-label text-white m-1" for="customFile2">Choose file</label>
                <input type="file"  onChange={(e) => handleImageChange(e)}
                  accept="image/*" />
              </div>
            </div>


          <button type="submit" class="btn btn-dark  mb-4">Update</button>



        </form>
      )}




      {/* {user && (
        <form onSubmit={handleSubmit}>
          <img
            src={user.image}
            
            alt={`${user.firstName} ${user.lastName}`}
          />

          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
                    <label>Password</label>
          <input
            type="password"
            
            onChange={(e) => setPassword(e.target.value)}

          />

                    <input
                        id="file-input"
                        onChange={(e) => handleImageChange(e)}
                        accept="image/*"
                        type="file"
                        className="d-none"
                    />
                    <label htmlFor="file-input" className="btn btn-primary btn-md ms-4 px-4 b-post">
                        Upload Image
                    </label>
          

          <button type="submit">Update</button>
        </form>
      )}

      <button>
        <Link to ={`/Profile/${currentUser._id}`}>Back to profile</Link>
        </button> */}
    </div>
  )
}
export default EditProfile
