import React, { Fragment } from "react";
import CommentItem from "./commentItem";


export default function CommentList({
  posts,
  updateComment,
  deleteComment,
  title,
  logged,
  user
}) {
  return (
    <Fragment>
      {/*comments*/}
      {posts &&
        posts.map((comment, index) => (
          <CommentItem
            key={`key#${title}#${index}`}
            title={title}
            username={comment.username}
            text={comment.text}
            id={comment.id}
            updateComment={updateComment}
            deleteComment={deleteComment}
            logged={logged}
            currentUser={user}
          />
        ))}
    </Fragment>
  );
}
