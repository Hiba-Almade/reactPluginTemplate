import React, { useEffect } from "react";
import { hot } from "react-hot-loader/root";
import "./style.less";
import "../../../../../../../styles/control/bf-base.css";
function index(props) {
  useEffect(() => {
    let thumbnail = new buildfire.components.images.thumbnail(".thumbnail", {
      imageUrl: "",
      title: " ",
      dimensionsLabel: "Recommended: 675 x 1200",
      multiSelection: false,
    });
    let thumbnail2 = new buildfire.components.images.thumbnail(".thumbnail2", {
        imageUrl: "",
        title: " ",
        dimensionsLabel: "Recommended: 1200 x 675",
        multiSelection: false,
      });
      console.log("hello",props.selectedLayout);
  }, []);
  return (
    <>
      <h1>Page Details</h1>
      <div className="layOutContainer">
        <div className="row">
          <div className="col-md-3">
            <label className="lable">Background Image</label>
          </div>
          <div className="col-md-9">
            <div className="thumbnail"></div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <label className="lable">Enable Full Screen</label>
          </div>
          <div className="col-md-9">
            <input type="checkBox" name="enableFullScreen" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <label className="lable">Main Media Type</label>
          </div>
          <div className="col-md-9">
            <input type="radio" name="mediaType" value="image" defaultChecked />
            <label className="lable">Image</label>
            <input type="radio" name="mediaType" value="image" />
            <label className="lable">Video</label>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <label className="lable">Main Image</label>
          </div>
          <div className="col-md-9">
            <div className="thumbnail2"></div>
          </div>
        </div>
        <div className="row margin-bottom">
          <div className="col-md-3">
            <label className="lable">Enable Full Screen</label>
          </div>
          <div className="col-md-9">
            <input type="checkBox" name="enableFullScreen" />
          </div>
        </div>
      </div>
      <div className="bottom-actions">
        <button className="btn btn-default" id="layoutBackBtn">
          Cancel
        </button>
        <button className="btn btn-success" id="layoutSaveBtn">
          Save
        </button>
      </div>
    </>
  );
}

export default hot(index);