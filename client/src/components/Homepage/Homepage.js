import React, {useState, useEffect} from "react";
import { Container, Grow, Grid, Paper, AppBar, Button, TextField} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import ChipInput from 'material-ui-chip-input';

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { getPosts, getPostsBySearch } from "../../actions/posts";
import Auth from '../Auth/Auth';
import Pagination from '../Pagination';
import useStyles from './styles';

function useQuery(){
    return new URLSearchParams(useLocation().search);
};

const Homepage = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 0;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const handleAdd = (tag) => setTags([...tags, tag]);
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

    const searchPost = () =>{
        if(search.trim() || tags.length>0) {
            dispatch(getPostsBySearch({search,tags: tags.join(',') }));
            navigate(`/posts/search?searchQuery = ${searchQuery.search ||'none'} &tags =${tags.join(',')}`);
        } else{
            navigate('/');
        }
    }
    
    return(
        <Grow in>
            <Container maxWidth = "xl">
                <Grid  container justifyContent="space-between" alignItems='stretch' spacing ={3} className={classes.gridContainer}>
                    <Grid item xs ={12} sm={6} md = {9}>
                    <Posts setCurrentId = {setCurrentId}/>
                    </Grid>
                    <Grid item xs ={12} sm={6} md = {3}>  
                    {(!user?.result?.name)&& (
                         <Auth />
                    )}

                    {(user?.result?.name)&& (
                        <AppBar className = {classes.appBarSearch} position = "static" color = "inherit">
                        <TextField 
                        name="search" 
                        variant="outlined" 
                        label="Search Programmer" 
                        fullWidth value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                        />
                            
                        <ChipInput
                            style = {{margin : '10px 0'}} 
                            value = {tags}
                            onAdd = {handleAdd}
                            onDelete ={handleDelete}
                            label = "Search Project by Language"
                            variant = "outlined"
                        />
                        <Button onClick ={searchPost} variant = "contained" className = {classes.searchButton} color = "primary">
                            Search
                        </Button>
                        </AppBar>
                        )}
                        
                        {(user?.result?.name)&& (              
                            <Form currentId = {currentId} setCurrentId = {setCurrentId}/> 
                        )}

{(!searchQuery && !tags.length) && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
                        </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}

export default Homepage;