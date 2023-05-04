import React, { useState } from "react";
import "../Styles/Suggestion.css";
import Axios from "axios";

export function Suggestion(props) {
  const user = props.userInfo;
  const userId = user._id;

  const [successFollow, setSuccessFollow] = useState(false);

  function openProfile() {}

  async function followUser() {
    const { data } = await Axios({
      method: "post",
      url: `http://localhost:3002/send_follow_request/${userId}`,
      headers: { token: localStorage.getItem("token") },
      data: {},
    });

    if (data.message) {
      setSuccessFollow(true);
    }
  }

  return (
    <>
      <div className="follow-request-div d-flex align-items-center p-2 mb-3 ">
        <div className="img-side-div me-3" onClick={openProfile}>
          <img src={user.image} alt="Profile_picture" />
        </div>
        <div className="user-side-div">
          <strong className="h6" onClick={openProfile}>
            {user.first_name} {user.last_name}
          </strong>
          <div className="user-title">
            <div>{user.title}</div>
          </div>
        </div>
        <div className="follow-icon mt-1 me-1 pointer" onClick={followUser}>
          {successFollow ? (
            <i className="fa-solid fa-check"></i>
          ) : (
            <i className="fa-solid fa-user-plus"></i>
          )}
        </div>
      </div>
    </>
  );
}
