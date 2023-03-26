import React from 'react'
import defaultImage from '../../Assets/images/no-image.png';

const TermBox = ({termItem}) => {
  return (
    
        <div  className="term_box flex bg-white ">
          <div className="child">
            
            <img className="image-box" src={termItem.image_base || defaultImage} alt="img" />
            <p className="definination-box break-all ">{termItem.defination}</p>
          </div>
      
    </div>
  )
}

export default TermBox