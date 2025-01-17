import React, { useState, useEffect } from "react";
import "./style.less";
import LayoutHeader from "../LayoutHeader/LayoutHeader";
import ExternalLayout from "../external/ExternalLayout";
import dummyObjects from "../../../assets/dummyData";
import SortablelistComponent from "../external/sortablelist";
import useMessages from "../../hooks/messages";
function Home(props) {
  const [activeComponent, setActiveComponent] = useState("home");
  const [addedData, setAddedData] = useState(dummyObjects);
  const [sortType, setSortType] = useState("Manually");
  const [openContentTypeDropdown, setOpenContentTypeDropdown] = useState(false);
  const [openSortDropdown, setOpenSortDropdown] = useState(false);
  const { handleSendMessage } = useMessages();
  const [apiData, setApiData] = useState(dummyObjects)
  const [activeObject, setActiveObject] = useState({})

  function deleteObj(title, item){
    buildfire.dialog.confirm(
      {
        title: `Delete ${title}!`,
        subtitle: "Are you sure!",
        message: `You can't undo the process ...`,
        isMessageHTML: true,
      },
      (err, isConfirmed) => {
        if (err) console.error(err);
        if(isConfirmed){
          // function to delete the item 
          console.log("Item deleted successfully ");
        }
      }
    );
  }

  function openExternal(objData){
    setActiveObject(objData);
    setActiveComponent("external1");
  }

  return (
    <>
      {activeComponent === "home" ? (
        <>
          <div className="home-container container slide-in">
            <div className="row">
              <p className="info-note">
                This is list of all your content. Sort it the way you would like
                it to be sorted in the app feed.
              </p>
            </div>
            <div className="row">
              <div className="input-group margin-bottom-twenty">
                <input
                  type="text"
                  placeholder="Search by Name"
                  className="form-control"
                  id="searchInput"
                />
                <span className="input-group-btn">
                  <button
                    className="btn btn-info btn-md stretch"
                    id="searchButton"
                  >
                    <span className="icon icon-magnifier"></span>
                  </button>
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="sort-dropdown-container">
                  <div
                    className={!openSortDropdown ? "dropdown" : "dropdown open"}
                    dropdown="true"
                  >
                    <button
                      className="btn btn-default  text-left dropdown-toggle sort-dropdown"
                      onClick={() =>
                        setOpenSortDropdown(!openSortDropdown)
                      }
                      data-toggle="dropdown"
                      dropdown-toggle="true"
                      aria-expanded={true}
                    >
                      <span className="pull-left">
                        <span className="lable">Sort:{sortType}</span>
                      </span>
                      <span
                        className="chevron icon-chevron-down pull-right"
                      ></span>
                    </button>
                    <ul className="dropdown-menu extended" role="menu">
                      <li>
                        <a
                          className=""
                          onClick={() => {
                            setSortType("Manually");
                            setOpenSortDropdown(!openSortDropdown);
                          }}
                        >
                          Manually
                        </a>
                      </li>
                      <li>
                        <a
                          className=""
                          onClick={() => {
                            setSortType("Title A - Z");
                            setOpenSortDropdown(!openSortDropdown);
                          }}
                        >
                          Title A - Z
                        </a>
                      </li>
                      <li>
                        <a
                          className=""
                          onClick={() => {
                            setSortType("Title Z - A");
                            setOpenSortDropdown(!openSortDropdown);
                          }}
                        >
                          Title Z - A
                        </a>
                      </li>
                      <li>
                        <a
                          className=""
                          onClick={() => {
                            setSortType("Newest Entry");
                            setOpenSortDropdown(!openSortDropdown);
                          }}
                        >
                          Newest Entry
                        </a>
                      </li>
                      <li>
                        <a
                          className=""
                          onClick={() => {
                            setSortType("Latest Entry");
                            setOpenSortDropdown(!openSortDropdown);
                          }}
                        >
                          Latest Entry
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6"></div>
              <div className="col-md-3">
                <div className="content-dropdown-container">
                  <div
                    className={
                      !openContentTypeDropdown ? "dropdown" : "dropdown open"
                    }
                    dropdown="true"
                  >
                    <button
                      className="btn btn-default  text-left dropdown-toggle sort-dropdown"
                      onClick={() =>
                        setOpenContentTypeDropdown(!openContentTypeDropdown)
                      }
                      data-toggle="dropdown"
                      dropdown-toggle="true"
                      aria-expanded={true}
                      style={{
                        backgroundColor: "#14CB5D",
                        border: "none",
                        color: "#fff",
                      }}
                    >
                      <span className="pull-left">
                        <span className="plus-icon">+</span> Add Content
                      </span>
                      <span
                        className="chevron icon-chevron-down pull-right"
                        style={{ color: "#fff" }}
                      ></span>
                    </button>
                    <ul className="dropdown-menu extended" role="menu">
                      <li>
                        <a
                          className=""
                          onClick={() => { openExternal({}); setOpenContentTypeDropdown(); }}
                        >
                          Sponsorship
                        </a>
                      </li>
                      <li>
                        <a className="">Incentive</a>
                      </li>
                      <li>
                        <a className="">Promotion</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              {addedData.length == 0 ? (
                <div className="empty-state-lg border-radius-four border-grey">
                  <p>You haven’t added anything yet</p>
                </div>
              ) : (
                <div className="layouts-Added-List">
                  <SortablelistComponent
                    listFor={"Home"}
                    sortType={sortType}
                    data={apiData}
                    openExternal={openExternal}
                    deleteObj={deleteObj}
                  />
                </div>
              )}
            </div>

          </div>
        </>
      ) : (
        <ExternalLayout activeObject={activeObject} setActiveComponent={setActiveComponent} />
      )}
    </>
  );
}

export default Home;
