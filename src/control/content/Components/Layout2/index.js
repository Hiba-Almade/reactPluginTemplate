import React, { useEffect, useState } from "react";
import useForm from "../../hooks/form";
import ThumbnailUI from "../../shared/ThumbnailUI";
import VideoUi from "../../shared/VideoUi";
import "./style.less";
function index(props) {
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [thumbnailImage2, setThumbnailImage2] = useState(null);
  const [uploadType, setUploadType] = useState("image");
  const [videoURL, setVideoURL] = useState("");

  useEffect(() => {
    handelImage({ thumbnailImage, thumbnailImage2, videoURL });
  }, [thumbnailImage, thumbnailImage2, videoURL]);

  // submit form function
  function submitForm(values) {
    console.log("forms values ->", values);
  }

  // use hooks to make our life easier
  const { handleChange, handleSubmit, handelImage, getOldData } = useForm(submitForm);
  useEffect(() => {
    if(props.data){
    getOldData(props.data);
    setThumbnailImage(props.data.thumbnailImage)
    setThumbnailImage2(props.data.thumbnailImage2)
    setVideoURL(props.data.videoURL);
    setUploadType(props.data.mediaType);
    }
  },[props])

  function handleChangeInputType(e) {
    setUploadType(e.target.value);
    handleChange(e);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Page Details</h1>
        <div className="layOutContainer slide-in">
          <ThumbnailUI
            index={1}
            recommended={"Recommended: 675 x 1200"}
            thumbnailImage={thumbnailImage}
            setThumbnailImage={setThumbnailImage}
            imageTag={"Background Image"}
            classList={"vertical-rectangle thumbnail"}
            aspectRatio={"9x16"}
          />
          <div className="row">
            <div className="col-md-3">
              <label className="lable">Enable Full Screen</label>
            </div>
            <div className="col-md-9">
              <input
                type="checkBox"
                className="checkBox"
                name="enableFullScreen"
                id="enableFullScreen"
                onChange={handleChange}
                defaultChecked={props.data.enableFullScreen?true:false}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <label className="lable">Main Media Type</label>
            </div>
            <div className="col-md-9">
              <input
                className="checkBox"
                type="radio"
                name="mediaType"
                value="image"
                onChange={handleChangeInputType}
                defaultChecked={props.data.mediaType!="video"?true:false}
              />
              <label className="lable">Image</label>
              <input
                className="checkBox"
                type="radio"
                name="mediaType"
                value="video"
                onChange={handleChangeInputType}
                defaultChecked={props.data.mediaType=="video"?true:false}
              />
              <label className="lable">Video</label>
            </div>
          </div>
          {uploadType  !== "video" ? (
            <ThumbnailUI
              index={2}
              recommended={"Recommended: 1200 x 675"}
              thumbnailImage={thumbnailImage2}
              setThumbnailImage={setThumbnailImage2}
              imageTag={"Main Image"}
              classList={"horizontal-rectangle thumbnail2"}
              aspectRatio={"16x9"}
            />
          ) : (
            <>
              <VideoUi
                setVideoURL={setVideoURL}
                videoURL={videoURL}
                handleChange={handleChange}
                index={1}
              />
            </>
          )}

          <div className="row ">
            <div className="col-md-3">
              <label className="lable">Enable Full Screen</label>
            </div>
            <div className="col-md-9">
              <input
                type="checkBox"
                className="checkBox"
                name="enableMainFullScreen"
                id="enableMainFullScreen"
                onChange={handleChange}
                defaultChecked={props.data.enableMainFullScreen?true:false}
              />
            </div>
          </div>
          <div className="row margin-bottom">
            <div className="col-md-3">
              <label className="lable">Show Info Ribbon</label>
            </div>
            <div className="col-md-9">
              <div className="button-switch">
                <input
                  onChange={handleChange}
                  className="checkBox"
                  name="showInfoRibbon"
                  id="showInfoRibbon"
                  type="checkbox"
                  value="true"
                defaultChecked={props.data.showInfoRibbon?true:false}
                />
                <label htmlFor="showInfoRibbon" className="label-success"></label>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-actions">
          <button
            type="button"
            onClick={() => props.setConetnt("main")}
            className="btn btn-default"
            id="layoutBackBtn"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-success" id="layoutSaveBtn">
            Save
          </button>
        </div>
      </form>
    </>
  );
}

export default index;
