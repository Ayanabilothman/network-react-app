import React from "react";
import { useSelector } from "react-redux";
import { selectAllPosts } from "../Redux/Features/postsSlice";
import { UpdatePostForm } from "./UpdatePostForm";

export function Posts() {
  const [postAdded, setPostAdded] = useState(false);
  const [showPostForm, setShowPostForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [updatedPost, setUpdatedPost] = useState(null);

  const postsObj = useSelector(selectAllPosts);
  const posts = Object.values(postsObj).sort(
    (a, b) => -a.createdAt.localeCompare(b.createdAt)
  );

  return (
    <>
      {showEditForm && (
        <UpdatePostForm
          updatedPost={updatedPost}
          setShowEditForm={setShowEditForm}
        />
      )}

      {showPostForm && (
        <AddPostForm
          setShowPostForm={setShowPostForm}
          setPostAdded={setPostAdded}
        />
      )}
    </>
  );
}
