import React from "react";
import html2canvas from "html2canvas"
import jspdf from "jspdf"
import { useReactToPrint } from 'react-to-print'



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
import { ToastContainer, toast } from 'react-toastify';

const Shares = ({rootElementId,downloadFileName, cardRef, downloadTitle}) => {
 
 const downloadFileDocument = () => {
    const input = document.getElementById(rootElementId);
    html2canvas(input).then((canvas)=>{
      const imgData = canvas.toDataURL("image/png")
      const pdf  = new jspdf({
        orientation: "landscape",
        unit: "in",
        format: [14, 5.5]
      })
      pdf.addImage(imgData, "JPEG", 1, 1)
      pdf.save(`${downloadFileName}`)
    })
  };


  // copy url function
  const copyUrl =()=>{

      // Get the text field
  var copyText = document.getElementById("copy_url");

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

   // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);

  // Alert the copied text
  toast.success("Link Copied!");
  } 



  //  // print web page
  //  function printInfo(ele) {
  //     let printContents = ele.innerHTML;
  //     let originalContents = document.body.innerHTML;
  //     document.body.innerHTML = printContents;
  //     window.print();
  //   document.body.innerHTML = originalContents; 
  //   }
  //   const handlePrint = () => {
  //     const printElement = document.getElementById(rootElementId);
  //     printInfo(printElement);
  //   }
  

   // function for converting card into pdf to print 

   const printCard = useReactToPrint({
    content: () => cardRef.current,
    documentTitle: downloadTitle,
})

var pageURL = window.location.href;


  return (
    <div className=" text-gray-600 text-center hover:text-green-600   ">
      <ToastContainer  autoClose={1000}/>
      <div className="mb-2 w-full bg-white  py-1 font-bold rounded action_btn">
        
        <Popup modal 
          nested 
          trigger={<button><i className="fa-solid fa-share"></i> Share</button>} position="left"
        >
      {close => (
       <div className="modal">

       <button className=" model-close close" onClick={close}>
          X
        </button>
          <div className="share-block-left">
            <p>Share</p>
            <div className="copy_url_inner">
            <input id="copy_url" value={pageURL}  onChange={()=>{}} />
            <span onClick={copyUrl}><i className="fa-solid fa-copy"></i></span>
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
            <LinkedinShareButton url={pageURL}>>
              <LinkedinIcon round={true} />
            </LinkedinShareButton>
            <WhatsappShareButton url={pageURL}>
              <WhatsappIcon round={true} />
            </WhatsappShareButton>
            <TwitterShareButton url={pageURL}>>
              <TwitterIcon round={true} />
            </TwitterShareButton>
            <EmailShareButton url={pageURL}>>
              <EmailIcon round={true} />
            </EmailShareButton>
          </div>
          </div>
      )}
        </Popup>
        <br />
      </div>
      <div onClick={downloadFileDocument} className="mb-2 w-full bg-white  py-1 font-bold rounded action_btn">
        <button  className="">
        <i className="fa-solid fa-download"></i> Download
        </button>
        <br />
      </div>
      <div onClick={printCard} className="w-full bg-white  py-1 font-bold  rounded   action_btn">
        <button  className=""><i className="fa-solid fa-print"></i> Print</button>
      </div>
    </div>
  );
};

export default Shares;
