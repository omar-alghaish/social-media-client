import React, { useEffect, useState } from 'react'
import postApi from '../../api/modules/postApi'
import { useParams } from 'react-router-dom'
import { Stack, Typography } from '@mui/material'
import Post from './Post'
import MainContainer from './MainContainer'

const PostsByHashtag = () => {
    const {tag} = useParams()
    const [data, setData] = useState()
    console.log(tag)
  
   useEffect(() => {
      const getPosts = async ()=>{
        const { response, error } = await postApi.getPostsByHashtag(tag);
        console.log(response) 
        setData(response) 
    }
       getPosts()
   }, [])
   
  return (
    <MainContainer>
        <Typography component="h1" variant=''>#{tag}</Typography>
{data?.data.map((post)=>(
    <Post data={post}/>
))}
    </MainContainer>
  )
}

export default PostsByHashtag