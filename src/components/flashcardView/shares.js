import React from "react";
import html2canvas from "html2canvas";
import jspdf from "jspdf";
import {useReactToPrint} from "react-to-print";

import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
  TwitterIcon,
  EmailIcon,
} from "react-share";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import {ToastContainer, toast} from "react-toastify";

const Shares = ({rootElementId, downloadFileName, cardRef, downloadTitle}) => {
  // download card function
  const downloadFileDocument = () => {
    const input = document.getElementById(rootElementId);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jspdf({
        orientation: "landscape",
        unit: "in",
        format: [14, 5.5],
      });
      pdf.addImage(imgData, "JPEG", 1, 1);
      pdf.save(`${downloadFileName}`);
    });
  };

  // copy url function
  const copyUrl = (url) => {
    // Copy the text inside the text field
    navigator.clipboard.writeText(url);

    // Alert the copied text
    toast.success("Link Copied!");
  };

  // card print function

  const printCard = useReactToPrint({
    content: () => cardRef.current,
    documentTitle: downloadTitle,
  });

  var pageURL = window.location.href;

  return (
    <div className=" text-gray-600 text-center hover:text-green-600   ">
      <ToastContainer autoClose={1000} />
      <div className=" w-full">
        <Popup
          modal
          nested
          onOpen={() =>
            document.getElementsByTagName("body")[0].classList.add("Hidden")
          }
          onClose={() =>
            document.getElementsByTagName("body")[0].classList.remove("Hidden")
          }
          trigger={
            <button className="bg-white w-full py-1 rounded action_btn">
              <i className="fa-solid fa-share"></i> Shares
            </button>
          }
          position="left"
        >
          {(close) => (
            <div className="modal">
              <button className=" model-close close" onClick={close}>
                <i className="fa-solid fa-xmark"></i>
              </button>
              <div className="share-block-left">
                <p>Share</p>
                <div className="copy_url_inner">
                  <p id="copy_url">{pageURL}</p>
                  <span onClick={() => copyUrl(pageURL)}>
                    <i className="fa-solid fa-copy"></i>
                  </span>
                </div>
              </div>
              <div className="share-block-right">
                <p></p>
                <p></p>
              </div>
              <div>
                <FacebookShareButton url={pageURL}>
                  <FacebookIcon round={true} />
                </FacebookShareButton>
                <LinkedinShareButton url={pageURL}>
                  <LinkedinIcon round={true} />
                </LinkedinShareButton>
                <WhatsappShareButton url={pageURL}>
                  <WhatsappIcon round={true} />
                </WhatsappShareButton>
                <TwitterShareButton url={pageURL}>
                  <TwitterIcon round={true} />
                </TwitterShareButton>
                <EmailShareButton url={pageURL}>
                  <EmailIcon round={true} />
                </EmailShareButton>
              </div>
            </div>
          )}
        </Popup>
        <br />
      </div>
      <div
        onClick={downloadFileDocument}
        className="mb-2 w-full bg-white  py-1 font-bold rounded action_btn"
      >
        <button className="">
          <i className="fa-solid fa-download"></i> Download
        </button>
        <br />
      </div>
      <div
        onClick={printCard}
        className="w-full bg-white  py-1 font-bold  rounded   action_btn"
      >
        <button className="">
          <i className="fa-solid fa-print"></i> Print
        </button>
      </div>
    </div>
  );
};

export default Shares;
