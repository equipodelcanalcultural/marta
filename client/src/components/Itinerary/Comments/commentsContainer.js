import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getData } from "../../../store/actions/reduxFetch";
import CommentList from "./commentList";
import CommentItem from "./commentItem";
import CommentInput from "./commentInput";
import {Link} from 'react-router-dom'

const CommentsContainer = (props) => {
  const [posts, setPosts] = useState(); /*State Hooks*/
const { /*Props: título del itinerario, datos de usuario, estado del usuario*/
  title,
  logged,
  user,
  navigation
} = props
console.log(props, "adentro de commentContainer")
  /*Funciones de requests: las funciones de Create, Update y Delete llaman a la función de Read
    para actualizar el hook posts; el container las pasa a sus hijos como callbacks*/

  const getComments = () => {
    getData(
      `/api/itineraries/byTitle/${title}/comments`,
      null,
      data => {
        setPosts(data.comments[0].comments);
        console.log(data + ' hola')
      }
    );
  };

  const createComment = input => {
    getData(
      `/api/itineraries/byTitle/${title}/comments`,
      {
        method: "PUT",
        body: JSON.stringify({
          username: user,
          text: input
        }),
        headers: {
          "Content-Type": "application/json"
        }
      },
      () => getComments()
    );
  };

  const updateComment = (input, id) => {
    console.log("update comment");
    console.log(id);
    getData(
      `/api/itineraries/byTitle/${title}/comments/update/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          text: input
        }),
        headers: {
          "Content-Type": "application/json"
        }
      },
      () => console.log('updatecomment')
    );
  };
  const deleteComment = id => {
    getData(
      `/api/itineraries/byTitle/${title}/comments/delete/${id}`,
      {
        method: "DELETE",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json"
        }
      },
      () => console.log('deletecomment')
    );
  };
  useEffect(() => {getComments()}, []);
  /*Variables para render condicional*/
  /*Si posts es no-nulo, <CommentList> recibe los posts y los mapea*/

  let commentList;
  if (posts != null) {
    console.log('hay posts')
    commentList = (
      <CommentList
        posts={posts}
        title={title}
        logged={logged}
        user={user}
        updateComment={updateComment}
        deleteComment={deleteComment}
      />
    );
  }
  /*Si estás loggeado aparece el textbox de input*/
  let commentTextBox;
  if (logged) {
    commentTextBox = (
      <CommentInput
        title={title}
        callback={createComment}
        placeholder={"Leave your comment"}
      ></CommentInput>
    );
  } else {
    commentTextBox = (
      <div>

        <Link to='Login'>
        Log in to comment
        </Link>
      </div>
    );
  }

  return (
    <Fragment>
      {commentList}
      {commentTextBox}
    </Fragment>
  );
};

//export default connect(mapStateToProps)(CommentsContainer);

export default CommentsContainer;

