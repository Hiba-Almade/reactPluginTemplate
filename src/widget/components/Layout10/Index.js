import React, { useState, useEffect } from "react";
import "./style.less";
import useHelper from "../../shared/Helper/Helper";
function Index(props) {
  const [holderImage, setHolderImage] = useState(
    "../../../../../../styles/media/holder-16x9.png"
  );
  const [enableFullScreen, setEnableFullScreen] = useState(false);
  const [enableFullScreen2, setEnableFullScreen2] = useState(false);

  const { imagePreviewer } = useHelper();
  useEffect(() => {
    document.getElementById(
      "topImage-container"
    ).style.backgroundImage = `url(${props.data.thumbnailImage})`;
    setEnableFullScreen(props.data.enableFullScreen);
    setEnableFullScreen2(props.data.enableFullScreen2);
    
    if (props.themeState.colors) {
      props.setTextStyle();
    }
    let img =document.getElementById("topImage-container");
    if(props.data.thumbnailImage){
      img.style.backgroundImage = `url(${props.data.thumbnailImage})`
    }
    else{
      img.style.background = "#d2cfcf";
    }
    img.style.backgroundPosition = "center";
  }, [props]);
  return (
    <>
      <div className="mdc-layout-grid layout-10-container">
        <div className="mdc-layout-grid__inner">
          <div className="mdc-layout-grid__cell--span-8">
            <div id="topImage-container" onClick={() => {
                enableFullScreen && props.data.thumbnailImage != null?
                imagePreviewer(props.data.thumbnailImage):
                undefined
              }}>
            {enableFullScreen2 && props.data.thumbnailImage2 != null ? (
                <img
                  onClick={() => {
                    imagePreviewer(props.data.thumbnailImage2);
                  }}
                  src={props.data.thumbnailImage2 || holderImage}
                />
              ) : (
                <img src={props.data.thumbnailImage2 || holderImage} />
              )}
            </div>
            <div className="info-container " >
              <div className="frontInfo mdc-card ">
                <p className="title">{props.data.title || "Title"}</p>
                <p className="subtitle">{props.data.subTitle || "Sub Title"}</p>
                <p className="bodyContent">{props.data.bodyContent  || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa tempor." }</p>
                <p className="bodyContent">{props.data.bodyContent2  || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa tempor." }</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;