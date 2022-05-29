
import React, { useEffect, useState } from "react";
import useForm from "../../hooks/form";
import "./style.less";

function index(props) {
  
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [uploadType, setUploadType] = useState("image");
  const [videoURL, setVideoURL] = useState("");

  useEffect(() => {
    if (uploadType == "image") {
      //  set up thumbnail -->
      let thumbnail = new buildfire.components.images.thumbnail(".thumbnail", {
        imageUrl: "",
        title: " ",
        dimensionsLabel: "Recommended: 1200 x 675",
        multiSelection: false,
      });
      
      if (thumbnailImage) {
        thumbnail.loadbackground(thumbnailImage);
      }
      // thumbnail Change image -->
      thumbnail.onChange = (imageUrl) => {
        let croppedImage = buildfire.imageLib.cropImage(
          imageUrl,
          { size: "full_width", aspect: "16:9" }
        );
        setThumbnailImage(croppedImage);
      };
      // thumbnail Delete Image -->
      thumbnail.onDelete = (imageUrl) => {
        setThumbnailImage(null);
      };
    }
  }, [uploadType])

  useEffect(() => {
    handelImage({ thumbnailImage, videoURL });
  }, [thumbnailImage, videoURL])
  // submit form function 
  function submitForm(values) {
    console.log('forms values ->', values);
  }

  function uploadVideoFunc(e) {
    if (e.target.name != "videoURL-Input") {
      let progressPercentage = document.getElementById("progressPercentage");
      let progressContainer = document.getElementById("progress");

      buildfire.services.publicFiles.showDialog(
        { filter: ["video/mp4"], allowMultipleFilesUpload: true },
        (onProgress) => {
          progressContainer.style.display = "block";

          progressPercentage.innerText = `${onProgress.file.percentage}%`;
          progressPercentage.style.width = `${onProgress.file.percentage}%`;
        },
        (onComplete) => {
          progressPercentage.style.background = "var(--bf-theme-success)";
          progressPercentage.innerText = "Uploaded Sucessfully";
          setTimeout(()=>{
            progressContainer.style.display = "none";
          }, 4000)
        },
        (err, files) => {
          if (err) return console.error(err);
          setVideoURL(files[0].url);

          let urlContainer = document.getElementById("videoURL");
          urlContainer.value = files[0].url;
        }
      );
    } else {
      setVideoURL(e.target.value);
    }
  }

  const { handleChange, handleSubmit, handelImage } = useForm(submitForm);
  function handleChangeInputType(e) {
    setUploadType(e.target.value);
    handleChange(e);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Page Details</h1>
      <div className="layOutContainer">
        <div className="row">
          <div className="col-md-3">
            <label className="lable">Background Media Type</label>
          </div>
          <div className="col-md-9">
            <input onChange={handleChangeInputType} className="checkBox" type="radio" name="BackgroundmediaType" value="image" defaultChecked />
            <label className="lable">Image</label>
            <input onChange={handleChangeInputType} className="checkBox" type="radio" name="BackgroundmediaType" value="video" />
            <label className="lable">Video</label>
          </div>
        </div>

        {
          uploadType == "image" ?
            (<div className="row">
              <div className="col-md-3">
                <label className="lable">Background Image</label>
              </div>
              <div className="col-md-9">
                <div className="vertical-rectangle thumbnail"></div>
              </div>
            </div>) : (
              <>
                <div className="row">
                  <div className="col-md-3">
                    <label className="lable">Main Video</label>
                  </div>
                  <div className="col-md-9">
                    <button type="button" onClick={uploadVideoFunc} className="uploadVideo-btn btn btn-success">
                      + Upload Video
                    </button>
                    <div id="progress" className="progress">
                      <div className="progress-bar" id="progressPercentage" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                    </div>

                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <label className="lable">Video URL</label>
                  </div>
                  <div className="col-md-9">
                    <input defaultValue={videoURL} placeholder="Video URL" onChange={uploadVideoFunc} id="videoURL" name="videoURL-Input" className="form-control fullWidth"></input>
                  </div>
                </div>
              </>
            )
        }

        <div className="row">
          <div className="col-md-3">
            <label className="lable">Enable Full Screen</label>
          </div>
          <div className="col-md-9">
            <input onChange={handleChange} className="checkBox" type="checkBox" name="enableFullScreen" id='enableFullScreen' />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <label className="lable">Title</label>
          </div>
          <div className="col-md-9">
            <input maxLength={80} onChange={handleChange} className="form-control fullWidth" type="text" name="title" placeholder="Title" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <label className="lable">Subtitle</label>
          </div>
          <div className="col-md-9">
            <input
              className="form-control fullWidth"
              type="input"
              name="subtitle"
              placeholder="Subtitle"
              maxLength={100}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row margin-bottom">
          <div className="col-md-3">
            <label className="lable">Body Content</label>
          </div>
          <div className="col-md-9">
            <textarea maxLength={350} onChange={handleChange} name="bodyContent" className="form-control bodyContent" placeholder="Body Content"></textarea>
          </div>
        </div>
      </div>
      <div className="bottom-actions">
        <button type="button" className="btn btn-default" id="layoutBackBtn">
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-success"
          id="layoutSaveBtn"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default index;
