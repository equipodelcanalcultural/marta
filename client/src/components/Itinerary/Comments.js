import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getData } from "../../store/actions/reduxFetch";
import CommentInput from "./commentInput";
import { CommentItem } from "./CommentItem";
import DeleteButton from "./deleteButton";
import CommentList from "./commentList";

const mapStateToProps = state => {
  return {
    logged: state.user.logged,
    user: state.user.currentUser.username
  };
};

const Comments = ({ comments, title, city, logged, user }) => {
  const [posts, setPosts] = useState();
  const [rerender, setRerender] = useState(false);
  const [cantidad, setCantidad] = useState();

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
      () => setRerender(!rerender)
    );
  };

  const deleteComment = _id => {
    getData(
      `/api/itineraries/byTitle/${title}/comments/delete`,
      {
        method: "DELETE",
        body: JSON.stringify({
        _id: _id
        }),
        headers: {
          "Content-Type": "application/json"
        }
      },
      () => setRerender(false)
    );
  };

  const callbackRerender = value => {
    setRerender(!rerender);
  };

  /*useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    getData(`/api/itineraries/byTitle/${title}/comments`, null, data => {
      setPosts(
        data.comments[0].comments.map((comment, index) => (
          <Fragment>
            <CommentItem
              key={`key#${title}#${index}`}
              cantidad={cantidad}
              title={title}
              username={comment.username}
              text={comment.text}
              id={comment.id}
              callback={callbackRerender}
              logged ={logged}
              usuarioActual = {user}
            />
        
          </Fragment>
        ))
      );
      setCantidad(data.cantidad);

      console.log(data.comments[0].comments);
      console.log(data.cantidad);
    });
  }, [!rerender]);*/

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    getData(`/api/itineraries/byTitle/${title}/comments`, null, data => {
      setPosts(data.comments[0].comments);
    });
  }, [!rerender]);

  let commentList;
  if (posts != null) {
    commentList = <CommentList comments={posts} callback={callbackRerender} logged ={logged}
    usuarioActual = {user} title={title} />
  }

  let commentTextBox;
  if (logged) {
    commentTextBox = (
      <CommentInput
        cantidad={cantidad}
        title={title}
        callback={createComment}
        placeholder={"Leave your comment"}
      ></CommentInput>
    );
  } else {
    commentTextBox = (
      <div>
        <span>Log in to comment</span>
      </div>
    );
  }
console.log(posts)
console.log(commentList)
  return (
    <div>
      <div>
        {commentList}
        {commentTextBox}
      
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Comments);
