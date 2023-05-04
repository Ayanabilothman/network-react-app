import React, { useEffect, useState } from "react";
import { Sidebarleft } from "./Sidebarleft";
import { SinglePost } from "./SinglePost";
import { AddPostDiv } from "./AddPostDiv";
import { SidebarRight } from "./SidebarRight";
import { UpdatePostForm } from "./UpdatePostForm";
import "../Styles/Home.css";

export function Home(props) {
  useEffect(() => {
    props.setShowNavbar(true);
  }, [props]);

  return (
    <>
      <section className="py-5 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-3 position-fixed left">
              <Sidebarleft />
            </div>
            <div className="col-6 offset-3">
              <AddPostDiv setShowPostForm={setShowPostForm} />
              {posts.length > 0 &&
                posts.map((post) => (
                  <SinglePost
                    setUpdatedPost={setUpdatedPost}
                    setShowEditForm={setShowEditForm}
                    post={post}
                    key={post._id}
                  />
                ))}
            </div>
            <div className="col-3 position-fixed right">
              <SidebarRight />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
