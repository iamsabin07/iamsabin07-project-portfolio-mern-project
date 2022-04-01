import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom";


import Navbar from './components/Navbar/Navbar.js';
import Homepage from './components/Homepage/Homepage.js';
import Auth from './components/Auth/Auth.js';
import PostDetails from './components/PostDetails/PostDetails.jsx';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    
    return(
    <BrowserRouter>
      <Container maxWidth = "xl">
        <Navbar />
        <Routes>
            <Route path = "/" exact element={<Navigate replace to = "/posts?page=1" />} />
            <Route path = "/posts" exact element = {<Homepage />} />
            <Route path = "/posts/search" exact element = {<Homepage />} />
            <Route path = "/posts/:id" element = {<PostDetails />} />
            <Route path = "/auth" exact element={(!user ? <Auth /> : <Navigate replace to ="/posts" />)} />   
        </Routes>
    </Container>
    </BrowserRouter>
    );
}

export default App;