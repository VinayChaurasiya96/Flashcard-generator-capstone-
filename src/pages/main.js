import Header from "../components/header";
import CreateFlashcard from "./createFlashcard";
import MyFlashcard from "./myFlashcard";

import {Routes, Route} from "react-router-dom";
import FlashCardView from "./flashCardView";
import "../index.css";

import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "../components/404NotFound";

const Main = () => {
  // form data handling and set to local storage
  const callbackAddData = (data1, data2) => {
    var flashItem = {
      id: 1,
      group: data1,
      terms: data2,
    };

    var flashCards = [];
    var storageData = JSON.parse(localStorage.getItem("flashCard"));

    if (storageData) {
      var lastFlashCardData = storageData[storageData.length - 1];
      flashItem.id = lastFlashCardData.id + 1;
      flashCards.push(...storageData, flashItem);
    } else {
      flashCards.push(flashItem);
    }

    localStorage.setItem("flashCard", JSON.stringify(flashCards));
    toast.success("Created Successfully!");
  };

  return (
    <>
      <Header />
      {/*  routings */}
      <div className="container mx-auto">
        <Routes>
          <Route
            path="/myflashcard/:cardId/:termId"
            element={<FlashCardView />}
          />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/"
            exact
            element={<CreateFlashcard callbackAddData={callbackAddData} />}
          />
          <Route path="/myflashcard" exact element={<MyFlashcard />} />
        </Routes>
      </div>
    </>
  );
};

export default Main;
