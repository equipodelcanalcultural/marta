import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getData } from "../../store/actions/reduxFetch";
import CommentInput from "./commentInput";
import { CommentItem } from "./CommentItem";


 const DeleteButton = ({id, callback, title}) => {
    const deleteComment = id => {
        getData(
          `/api/itineraries/byTitle/${title}/comments/delete/${id}`,
          {
            method: "DELETE",
            body: JSON.stringify({
            }),
            headers: {
              "Content-Type": "application/json"
            }
          },
          () => console.log('comment deleted')
        );
      };
  return ( <button
  onClick={() => {
    callback();
    deleteComment(id);
  }}
>
  Delete
</button>)
}
export default DeleteButton;
