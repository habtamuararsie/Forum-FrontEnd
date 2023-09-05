import React from 'react'
import Footer from '../Components/Footer/Footer'
import Header1 from '../Header/Header1'
import Header from '../Components/Header/Header'
import { Outlet } from 'react-router-dom';

function SharedLayout() {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
   
    </>
  );
}

export default SharedLayout