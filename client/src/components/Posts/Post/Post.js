import React,{useEffect} from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography} from "@material-ui/core";
import ButtonBase from "@material-ui/core/ButtonBase";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import LinkIcon from '@material-ui/icons/Link';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deletePost, likePost } from "../../../actions/posts.js";
import useStyles from './styles.js';


const Post = ( {post, setCurrentId} ) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();

    const Likes = () => {
        if (post.likes.length > 0) {
          return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return (
        <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>
        );
      };
      
      const openPost = (e) =>{
        navigate(`/posts/${post._id}`);
      };

      const handleDelete =() => {
        dispatch(deletePost(post._id));
        navigate('/');
      };
    return(
        <Card className={classes.card}>
  
              <CardMedia className = {classes.media} onClick ={openPost} image= {post.selectedFile} title = {post.title}/>
              <div className={classes.overlay}>
              <Typography variant ="h6"> {post.name} </Typography>
              <Typography variant ="body2"> {moment(post.createdAt).fromNow()} </Typography>
              </div>
              {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
              <div className={classes.overlay2}>
                  <Button style ={{color: 'white'}} size = "small" onClick = {()=>setCurrentId(post._id)}>
                      <MoreHorizIcon fontSize = "medium" />
                  </Button>
              </div>
              )}
              <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}>
              <div className= {classes.details}>
                  <Typography variant = "body2" color = "textSecondary">
                      {post.tags.map((tag) => `#${tag} ` )}
                  </Typography>
              </div>
              <Typography  className = {classes.title} variant = "h5" gutterBottom>
                      {post.title}
              </Typography>
              <CardContent>
              <Typography variant = "body2" color="textSecondary" component = "p">
                    {`${post.message.substring(0,150)}...`}
              </Typography>
              </CardContent>
              </ButtonBase>
            <CardActions className = {classes.cardActions}>
            <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
             <Likes />
            </Button>
            {post.links &&( 
            <a href = {post.links} target ="_blank">
            <Button size="small" color="primary">
                 <LinkIcon fontSize="large" /> 
                 </Button></a>)}
           
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <Button size="small" color="secondary" onClick={handleDelete}>
                 <DeleteIcon fontSize="small" /> Delete
                 </Button>
                )}   
            </CardActions>
        </Card>
   );
}
export default Post;