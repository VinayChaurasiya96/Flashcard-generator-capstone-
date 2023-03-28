import React from 'react'
import {Link} from "react-router-dom";

import {AiOutlineCaretLeft, AiOutlineCaretRight} from "react-icons/ai";


const TermPagination = ({currentTerm, allTerms, cardId}) => {
    const current_Term = parseInt(currentTerm);
    return (
      <div className="flex justify-center items-center gap-16 mb-10 mt-10 font-bold text-gray-400 ">
        <div className="hover:text-green-600 text-1xl cursor-pointer">
          {current_Term > 1 ? (
            <Link to={`/myflashcard/${cardId}/term${current_Term - 1}`}>
               <i className="fa-solid fa-angle-left"></i>
            </Link>
          ) : (
            <span>
               <i className="fa-solid fa-angle-left"></i>
            </span>
          )}
        </div>
        <h5>
          {current_Term}/{allTerms.length}
        </h5>
        <div className="hover:text-green-600 text-1xl cursor-pointer">
          {current_Term !== allTerms.length ? (
            <Link to={`/myflashcard/${cardId}/term${current_Term + 1}`}>
              <i className="fa-solid fa-angle-right"></i>
            </Link>
          ) : (
            <span>
              <i className="fa-solid fa-angle-right"></i>
            </span>
          )}
        </div>
      </div>
    );
}

export default TermPagination