import React from "react";
import {useEffect} from "react";
import {useState} from "react";

import {Formik, Field, Form, ErrorMessage, FieldArray} from "formik";
import * as Yup from "yup";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";

const CreateFlashcard = ({callbackAddData}) => {
  const [groupName, setGroupName] = useState({});
  const [addMore, setAddMore] = useState([]);
  const [groupImage, setGroupImage] = useState("");

  useEffect(() => {
    if (groupImage === "") {
      delete groupName.image;
    }
  }, [groupImage, groupName.image]);

  // convert file to base64 string
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // image validation
  async function validateImage(e) {
    var File;

    // 965*724 = 2MB
    if (e.target.files[0].size > 965 * 724) {
      toast.warn("Image should be less than 2MB");
    } else {
      File = await toBase64(e.target.files[0]);
    }

    return File;
  }
  // handling groupName data
  const onChangeHandler1 = async (e) => {
    var {name, value} = e.target;

    if (e.target.name === "image") {
      const myImage = await validateImage(e);
      setGroupImage(myImage || "");
      value = myImage;
    }
    setGroupName({...groupName, [name]: value});
  };

  //handling add more data
  const onChangeHandler = async (e, index) => {
    const list = [...addMore];

    if (e.target.name === "image") {
      const myImage = await validateImage(e);
      if (myImage) {
        e.target.closest(".img-feild-main").classList.add("d-none");
      } else {
        e.target.closest(".img-feild-main").classList.remove("d-none");
      }
      const imageElement = e.target
        .closest(".img-feild-main")
        .nextSibling.getElementsByTagName("img")[0];
      imageElement.src = myImage || "";
      list.push({
        image_base: myImage || "",
        id: index,
      });
    }

    setAddMore(list);
  };

  // delete image function
  const removeImage = (index, e) => {
    if (e) {
      const imageElement = e.target
        .closest(".img_box")
        .getElementsByTagName("img")[0];
      e.target.closest(".img_box").previousSibling.classList.remove("d-none");
      imageElement.src = "";
    }
    addMore.splice(index, 1);
    setAddMore([...addMore]);
  };

  // change group image state
  const OnDeleteGroupImage = () => {
    setGroupImage("");
  };

  //submit form function
  const onSubmitHandler = (data) => {
    document.getElementsByTagName("form")[0].reset();

    const groupData = {
      image: groupImage,
      groupName: data.groupName,
      description: data.description,
    };
    const termsdata = [];
    data.terms.forEach((term, i) => {
      const termData = {
        image_base: addMore.find((a) => a.id === i)?.image_base || "",
        defination: term.def,
        name: term.name,
      };
      termsdata.push(termData);
    });

    callbackAddData(groupData, termsdata);

    setGroupImage("");
    setAddMore([]);
    document
      .getElementById("selectedImg0")
      .parentElement.classList.remove("d-none");
  };

  // function for focus input element
  const handleFocus = (index, e) => {
    var inputElement = e.target
      .closest(".listItem")
      .querySelector(`[name="terms.${index}.name"]`);
    inputElement.focus();
  };

  return (
    <>
      {/* group section */}

      <div className="mt-8">
        <ToastContainer position="top-center" theme="light" />
        <Formik
          initialValues={{
            groupName: "",
            description: "",
            terms: [{def: "", name: ""}],
          }}
          onSubmit={(values) => {
            onSubmitHandler(values);
          }}
          validationSchema={Yup.object().shape({
            groupName: Yup.string().required("Group Name is Required"),
            description: Yup.string().required("Description is Required"),
            terms: Yup.array().of(
              Yup.object().shape({
                def: Yup.string().required("Defination is Required"),
                name: Yup.string().required("Term Name is Required"),
              })
            ),
          })}
        >
          {({values}) => (
            <Form data-testid="flascard-form">
              <div
                className="bg-white px-6 py-5  rounded-lg create_group"
                data-testid="group-error-element"
              >
                <div className="lg:flex lg:items-center">
                  <div className="">
                    <label className="label-design">Create Group*</label>
                    <Field
                      className=" w-full text-gray-900 text-sm border-slate-200  focus:ring-0 active:ring-0 rounded-lg lg:w-96 p-2 bg-gray-50 border"
                      type="text"
                      name="groupName"
                      placeholder="group name"
                    />
                  </div>

                  {groupImage === "" ? (
                    <label
                      htmlFor="selectedImgs"
                      style={{marginTop: "1.9rem"}}
                      className=" img-feild-main  border  text-blue-700 hover:bg-blue-700 hover:text-white transition-all ease-in-out"
                    >
                      <span>
                        <i className="fa-solid fa-file-arrow-up"></i> Upload
                        image
                      </span>
                      <div></div>
                      <input
                        onChange={onChangeHandler1}
                        type="file"
                        name="image"
                        className="w-full img-feild hidden"
                        id="selectedImgs"
                        accept="image/png, image/gif, image/jpeg"
                      />
                    </label>
                  ) : (
                    <div className="img_box max-w-[200px] relative ">
                      <div className="image_view ml-10">
                        <img className="img-border-5" src={groupImage} alt="" />
                      </div>
                      <div className="image-controls h-full absolute top-0 ">
                        <label htmlFor="selectedImgs">
                          <i className="fa-regular fa-pen-to-square"></i>
                          <input
                            onChange={onChangeHandler1}
                            type="file"
                            name="image"
                            className="w-full img-feild hidden"
                            id="selectedImgs"
                            accept="image/png, image/gif, image/jpeg"
                          />
                        </label>
                        <button name="delete" onClick={OnDeleteGroupImage}>
                          <i className="fa-regular fa-trash-can"></i>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <ErrorMessage
                  name="groupName"
                  component="div"
                  className="text-red-500 pos-static"
                />
                <div className="mt-4 pos-relative">
                  <label className="label-design">Add Description</label>
                  <Field
                    placeholder="this is description"
                    name="description"
                    as="textarea"
                    className=" w-full border-slate-200  resize-none rounded-lg lg:w-3/4 lg:h-40 p-2 bg-gray-50 border  text-gray-900 text-sm"
                  ></Field>
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 pos-static"
                  />
                </div>
              </div>

              {/*terms section*/}
              <FieldArray name="terms">
                {({insert, remove, push}) => (
                  <div className="bg-white px-5 mt-5 relative pt-5 rounded-lg term_box_inner">
                    {values.terms.length > 0 &&
                      values.terms.map((term, index) => (
                        <div
                          className="lg:flex lg:space-x-10 lg:items-center relative  mb-8 listItem"
                          key={index}
                        >
                          <div className="flex flex-col">
                            <div className="flex items-center ">
                              <p className="termsfield-count absolute -left-10">
                                {index + 1}
                              </p>
                              <label
                                className="label-design"
                                htmlFor={`terms.${index}.name`}
                              >
                                Enter Term*
                              </label>
                            </div>

                            <Field
                              data-testid="termName"
                              name={`terms.${index}.name`}
                              type="text"
                              className="border-slate-200 rounded-lg p-2 bg-gray-50 border  text-gray-900 text-sm"
                            />
                            <ErrorMessage
                              name={`terms.${index}.name`}
                              component="div"
                              className="text-red-500"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label
                              className="label-design"
                              htmlFor={`terms.${index}.def`}
                            >
                              Enter Defination*
                            </label>
                            <Field
                              data-testid="termDesc"
                              name={`terms.${index}.def`}
                              type="text"
                              as="textarea"
                              className=" border-slate-200 h-10  rounded-lg focus:h-24 p-2 lg:w-96  resize-none transition-all ease-in-out bg-gray-50 border duration-500  text-gray-900 text-sm   "
                            />
                            <ErrorMessage
                              name={`terms.${index}.def`}
                              component="div"
                              className="text-red-500"
                            />
                          </div>

                          <div className="flex flex-col">
                            <label className="label-design mob_hide">
                              &nbsp;
                            </label>
                            <label
                              htmlFor={`selectedImg${index}`}
                              className="p-block-0-7 img-feild-main border-blue-700  border lg:px-6 lg:py-2.5 px-1 py-2 text-blue-700 rounded-lg hover:bg-blue-700 hover:text-white transition-all ease-in-out"
                            >
                              <span>Select image</span>
                              <input
                                onChange={(e) => onChangeHandler(e, index)}
                                id={`selectedImg${index}`}
                                className=" w-full img-feild   hidden  "
                                type="file"
                                name="image"
                                accept="image/png, image/gif, image/jpeg"
                              />
                            </label>

                            <div className="img_box max-w-[150px]">
                              <label htmlFor={`selectedImg${index}`}>
                                <img className="img-border-5" src="" alt="" />
                              </label>
                              <div className="image-controls term-action">
                                <div
                                  className="remove_image__btn"
                                  onClick={(e) => removeImage(index, e)}
                                >
                                  <i className="fa-solid fa-xmark"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                          {index > 0 && (
                            <div className="update-term">
                              <div className="image-controls">
                                <div
                                  className="del-img"
                                  onClick={() => {
                                    removeImage(index);
                                    remove(index);
                                  }}
                                >
                                  <i className="fa-regular fa-trash-can"></i>
                                </div>
                                <label
                                  className="focus-input"
                                  onClick={(e) => handleFocus(index, e)}
                                >
                                  <i className="fa-regular fa-pen-to-square"></i>
                                </label>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    <div className="text-center">
                      <button
                        type="button"
                        className=" text-blue-700 mx-auto block lg:mx-0 font-bold pb-10"
                        onClick={() => push({name: "", def: ""})}
                      >
                        +Add More
                      </button>
                    </div>
                  </div>
                )}
              </FieldArray>
              <div className="submit-btn">
                <Button variant="contained" type="submit">
                  Create
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default CreateFlashcard;
