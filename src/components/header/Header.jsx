import React from "react";
import {Link, useLocation } from "react-router-dom";


const Header = () => {

  const location = useLocation();

  const handleActive = (buttonRoute) => {
    if(buttonRoute === location.pathname){
      return 'active';
    }
    return ''
  }

  return (
    <>
      <div className="container mx-auto ">
       
        <h4 className=" font-bold  mt-8 mb-4 text-xl ">Create Flashcard</h4>
        <div className=" ">
          <div className=" flex items-centre mt-2  ">
            <div className={`nav_btn ${handleActive('/')}`}>
              <Link
                className="font-bold text-slate-500 "
                to="/"
              >
                Create New
              </Link>
            </div>
            <div className={`nav_btn ${handleActive('/myflashcard')}`}>
              <Link
                className="font-bold text-slate-500"
                to="/myflashcard"
              >
                My Flashcard
              </Link>
            </div>
          </div>
          <div className="mt-1 border border-gray-300 border-solid"></div>
        </div>
      </div>
    </>
  );
};

export default Header;
