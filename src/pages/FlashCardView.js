import React from "react";
import {useParams, NavLink} from "react-router-dom";
import "reactjs-popup/dist/index.css";
import Shares from "../components/flashcardView/shares";
import TermBox from "../components/flashcardView/termBox";
 import Backbtn from "../components/flashcardView/backbtn";
 import TermPagination from "../components/flashcardView/termPagination";
 import defaultImage from '../Assets/images/no-image.png';
 import { useRef } from 'react';

const FlashCardView = () => {

  // const componentRef = useRef();
  const params = useParams();
  const {cardId, termId} = params;
  const cardRef = useRef();

  const card_Id = cardId.replace("card", "");

  const term_Id = termId.replace("term", "");
  const FlashcardData = JSON.parse(localStorage.getItem("flashCard"));
  const currentCard = FlashcardData.filter(
    (item) => item.id === parseInt(card_Id)
  )[0];

    var termObject = currentCard.terms[parseInt(term_Id) - 1];

  return (
    <>
      <div className="pdf_wrapper" style={{width:0, height: 0, overflow: 'auto'}}>
      <div id="pdfDownload" className='pdfDownload' style={{width:'1100px',  opacity:0, pointerEvents:'none', margin: '30px'}}>
        <table style={{width : '100%',  borderRadius: '5px'}} id="downloadFilePage">
          <tbody>
            <tr>
              <td style={{width:'50%'}}><img src={termObject.image_base || defaultImage} style={{width:'100%'}} /></td>
              <td style={{width:'50%', verticalAlign: 'baseline', paddingLeft: '20px'}}>{termObject.defination}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
      <div className="flashCardViewMain" >
        <div className="flex items-center gap-4 font-bold ">
          <span>
            <Backbtn />
          </span>
          <h4 className="font-bold truncate  ">
            {" "}
            {currentCard.group.groupName}
          </h4>
        </div>

        {currentCard.group.description && (
          <p className="ml-12">{currentCard.group.description}</p>
        )}
        <div className="box-main flex gap-4 ">
          <div className="left-box bg-white p-4 py-3 min-h-96 rounded-md">
            <p className="px-4 pb-2 flascard_title">Flashcards</p>
            <div className="border border-black mb-3 "></div>
            <ul className="terms_list px-2 break-all ">
              {currentCard.terms.map((termItem, index) => (
                <li className="font-bold truncate" key={index}>
                  <NavLink
                    className={({isActive}) =>
                      isActive ? "active" : "inactive"
                    }
                    to={`/myflashcard/${cardId}/term${index + 1}`}
                  >
                    {termItem.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="center-box" ref={cardRef}>
            <TermBox  termItem={termObject} />
          </div>

          {/* shares component for share, download and print of web page */}
          <div className="right-box">
            <Shares cardRef={cardRef} downloadTitle={currentCard.group.groupName} rootElementId = "downloadFilePage" downloadFileName = {currentCard.group.groupName} /> 
          </div>
        </div>
        <div className="bottom-section">
          <TermPagination
            currentTerm={parseInt(term_Id)}
            allTerms={currentCard.terms}
            cardId={cardId}
          />
        </div>
      </div>
    </>
  );
};
export default FlashCardView;
