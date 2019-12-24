import React, { Fragment } from "react";
import CommentList from "./commentList";
import CommentInput from "./commentInput";
import { Link } from "react-router-dom";
import usePosts from "./usePosts";

export default function CommentsContainer({ title, logged, user }) {
  /*Custom hook, encapsula las requests del CRUD*/
  const [posts, createComment, updateComment, deleteComment] = usePosts(
    title,
    user
  );

  return (
    <Fragment>
      <CommentList
        posts={posts}
        title={title}
        logged={logged}
        user={user}
        updateComment={updateComment}
        deleteComment={deleteComment}
      />
      {logged ? (
        <CommentInput
          title={title}
          callback={createComment}
          placeholder={"Leave your comment"}
        ></CommentInput>
      ) : (
        <div>
          <Link to="/LogIn">Log in to comment</Link>
        </div>
      )}
    </Fragment>
  );
}
