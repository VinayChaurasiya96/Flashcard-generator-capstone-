import React from "react";
import html2canvas from "html2canvas"
import jspdf from "jspdf"



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

const Shares = ({rootElementId,downloadFileName}) => {
 
 const downloadFileDocument = () => {
    const input = document.getElementById(rootElementId);
    html2canvas(input).then((canvas)=>{
      const imgData = canvas.toDataURL("image/png")
      const pdf  = new jspdf("p", "pt", "a4")
      pdf.addImage(imgData, "JPEG", 100, 100)
      pdf.save(`${downloadFileName}`)
    })
  };

   // print web page

  

  return (
    <div className=" text-gray-600 text-center hover:text-green-600   ">
      <div className="mb-2 w-full bg-white  py-1 font-bold rounded action_btn">
        <Popup trigger={<button><i class="fa-solid fa-share"></i> Share</button>} position="left">
          <div className="share-block-left">
            <p>Share</p>
            <p>Link: </p>
          </div>
          <div className="share-block-right">
            <p></p>
            <p></p>
          </div>
          <div>
            <FacebookShareButton url="http://localhost:3000/myflashcard/card3/term1">
              <FacebookIcon round={true} />
            </FacebookShareButton>
            <LinkedinShareButton>
              <LinkedinIcon round={true} />
            </LinkedinShareButton>
            <WhatsappShareButton url="http://localhost:3000/myflashcard/card3/term1">
              <WhatsappIcon round={true} />
            </WhatsappShareButton>
            <TwitterShareButton>
              <TwitterIcon round={true} />
            </TwitterShareButton>
            <EmailShareButton>
              <EmailIcon round={true} />
            </EmailShareButton>
          </div>
        </Popup>
        <br />
      </div>
      <div className="mb-2 w-full bg-white  py-1 font-bold rounded action_btn">
        <button onClick={downloadFileDocument} className="">
        <i class="fa-solid fa-download"></i> Download
        </button>
        <br />
      </div>
      <div className="w-full bg-white  py-1 font-bold  rounded   action_btn">
        <button   className=""><i class="fa-solid fa-print"></i> Print</button>
      </div>
    </div>
  );
};

export default Shares;
