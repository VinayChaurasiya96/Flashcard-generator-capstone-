import React from "react";
import {Link} from "react-router-dom";

import Button from "@mui/material/Button";
import defaultImage from "../../Assets/images/pngwing.com.png";

const MyFlashcard = () => {
  const FlashcardDeta = JSON.parse(localStorage.getItem("flashCard"));

  return (
    <>
      <div className=" cards-main mt-6 grid items-center justify-center md:grid-cols-3 grid-cols-1">
        {!FlashcardDeta && <p>No Card Found.</p>}
        {FlashcardDeta?.map((card, index) => (
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
    </>
  );
};

export default MyFlashcard;
