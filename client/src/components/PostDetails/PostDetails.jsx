import React, {useEffect} from "react";
import { Card, Paper, Typography, CircularProgress, Divider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import { useNavigate, useParams, Link } from "react-router-dom";

import { getPost, getPostsBySearch } from "../../actions/posts";
import CommentSection from "./CommentSection";
import useStyles from './styles';

const PostDetails = () =>{
    const {post, posts, isLoading} = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const {id} = useParams();

    useEffect(() =>{
        dispatch(getPost(id));
    }, [id]);

    useEffect(() =>{
      if(post){
      dispatch(getPostsBySearch({search: post.name}));
      }
    }, [post]);

    if(!post) return null;
    
    if (isLoading) {
        return (
          <Paper elevation={6} className={classes.loadingPaper}>
            <CircularProgress size="7em" />
          </Paper>
        );
      }

    const recommendedPosts = posts.filter(({_id}) => _id !== post._id)

    const openPost = (_id) => navigate(`/posts/${_id}`);

    return(
      <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
       <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <br/>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <br/>
          <Typography gutterBottom variant="body1" color="textSecondary" component="h2">Languages Used: {post.tags.map((tag) => `${tag} `)}</Typography>
          <br />
         
          <Typography gutterBottom variant="body1" component="p"><strong>Overview: </strong>{post.message}</Typography>
          <br />
          {post.links &&(<Typography gutterBottom variant="body1" component="p">Source Code: < a href = {post.links} target="_blank"> {post.links}</a></Typography>)}
          
         
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post = {post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
      {recommendedPosts.length &&(
        <div className= {classes.section}>
          <Typography gutterBottom variant = "h5"> More from {post.name}:</Typography>
          <Divider />
          <div className= {classes.recommendedPosts}>
              {recommendedPosts.map(({title, message, name, likes, selectedFile, _id})=>(
                <div>
                  <div style = {{margin: '20px', cursor: "pointer"}} onClick = {() => openPost(_id)} key = {_id}>
                  <Card className= {classes.card2} raised elevation ={6}>
                  <Typography gutterBottom variant="h6" align="center">{title}</Typography>
                  <img src={selectedFile} width="100%" height = "100%" />
                  </Card>
                   </div> 
                   
                  </div>
              ))}
          </div>
        </div>
      )}
      </Paper>
    );
}

export default PostDetails;