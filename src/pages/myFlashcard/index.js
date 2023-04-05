import React, {useState} from "react";
import {Link} from "react-router-dom";

import Button from "@mui/material/Button";
import defaultImage from "../../assets/images/pngwing.com.png";

//lottie imports for animation
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../assets/animations/noDataFoundAnimation.json";

const MyFlashcard = () => {
  const FlashcardDeta = JSON.parse(localStorage.getItem("flashCard"));
  const [AllFlashcard, setAllFlashcard] = useState(6);

  // className for positioning show more and show less button
  const getClassName = () => {
    if (AllFlashcard > 6) {
      if (FlashcardDeta.length % 3 === 0) {
        return "right";
      } else if (FlashcardDeta.length % 3 === 2) {
        return "center";
      } else {
        return "left";
      }
    }
    return "";
  };
  return (
    <>
      <div className=" cards-main mt-6 grid items-center justify-center md:grid-cols-3 grid-cols-1">
        {!FlashcardDeta && (
          <>
            <div></div>
            <div className="text-center">
              <Lottie animationData={groovyWalkAnimation} loop={true} />
              <p>No Cards Found !</p>
            </div>
          </>
        )}
        {FlashcardDeta?.slice(0, AllFlashcard)?.map((card, index) => (
          <div key={index} className=" cards bg-white border-solid  relative">
            <div className="flex items-center justify-center mt-10">
              <div>
                <img
                  className={`w-24 h-24 bg-indigo-100 rounded-full  absolute ${
                    card.group.image ? "" : "p-4"
                  }`}
                  src={card.group.image || defaultImage}
                  alt="Img"
                />
              </div>
              <div className="mt-5 ">
                <h3 className="font-bold text-2xl ">{card.group.groupName} </h3>
              </div>
            </div>

            <div>
              <p className="px-4 card-para mt-2 mb-4  text-center  ">
                {card.group.description}
              </p>
            </div>
            <div className="flex text-center justify-center ">
              <div className="flex text-md font-bold text-gray-600 ">
                {card.terms.length === 1 ? (
                  ""
                ) : (
                  <>
                    <p className="mr-1  ">{card.terms.length} </p>
                    <p className="">Cards</p>
                  </>
                )}
              </div>
            </div>

            <Button
              variant="outlined"
              component={Link}
              to={`card${card.id}/term1`}
            >
              {card.terms.length === 1 ? (
                <p className="text-center">View Card</p>
              ) : (
                <p className=" text-center">View Cards</p>
              )}
            </Button>
          </div>
        ))}
      </div>
      {FlashcardDeta?.length > 6 && (
        <Button
          className={`seeAllBtn ${getClassName()}`}
          onClick={() =>
            setAllFlashcard(AllFlashcard === 6 ? FlashcardDeta.length : 6)
          }
        >
          {AllFlashcard === 6 ? "See all" : "See less"}
        </Button>
      )}
    </>
  );
};

export default MyFlashcard;
