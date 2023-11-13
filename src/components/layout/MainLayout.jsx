import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../common/Sidebar'
import { Stack } from '@mui/material'
import BottomBar from '../common/BottomBar'
import { useDispatch, useSelector } from 'react-redux'
import userApi from '../../api/modules/userApi'
import { setUser } from '../../redux/features/userSlice'
import CreatePost from '../common/CreatePost'
import { io } from "socket.io-client";
import StoryForm from '../common/StoryForm'
import Story from '../common/Story'

const MainLayout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);




  useEffect(() => {
    const authUser = async () => {
      const { response, error } = await userApi.getInfo();
      if (response) dispatch(setUser(response));
      // if (err) dispatch(setUser(null));
      
    };

    authUser();
  }, [dispatch]);
  return (
    <Stack direction="row">
        <Sidebar />
        <BottomBar />
        <Outlet />
        <CreatePost />
        <StoryForm />
        {/* <Story /> */}
        
    </Stack>
  )
}

export default MainLayout