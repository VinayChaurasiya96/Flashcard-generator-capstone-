import React from 'react'
import {Link} from "react-router-dom";
import {TbArrowNarrowLeft} from "react-icons/tb";

const Backbtn = () => {
  return (
    <div>
        <div className="text-gray-600 hover:text-green-600 ">
        <Link to="/myflashcard " className="text-3xl">
          <TbArrowNarrowLeft />
        </Link>
      </div>
    </div>
  )
}

export default Backbtn