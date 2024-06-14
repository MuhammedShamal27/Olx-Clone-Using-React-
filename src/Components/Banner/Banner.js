import React, { useState } from 'react';

import './Banner.css';
import Arrow from '../../assets/Arrow'

function Banner() {

  const [showCategories,setShowCategories] =useState(false);

  const toogleCategories =() =>{
    setShowCategories(!showCategories)
  }
  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu" onClick={toogleCategories}>
            <span>ALL CATEGORIES</span>
            <Arrow className={showCategories ? 'rotate' : ''}/> 
          </div>
          <div className={`otherQuickOptions ${showCategories ?  `show` :''}`}>
            <span>Cars</span>
            <span>Motorcy...</span>
            <span>Mobile Ph...</span>
            <span>For Sale:Houses & Apart...</span>
            <span>Scoot...</span>
            <span>Commercial & Other Ve...</span>
            <span>For Rent: House & Apart...</span>
          </div>
        </div>
        <div className="banner">
          <img
            src="../../../Images/banner copy.png"
            alt=""
          />
        </div>
      </div>
      
    </div>
  );
}

export default Banner;
