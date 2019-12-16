import React, { Fragment } from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { getData } from "../../../store/actions/reduxFetch";
import CommentList from "./commentList";
import CommentItem from "./commentItem";
import CommentInput from "./commentInput";

class CommentsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      rerender: 0
    };
  
  }

  /*Props: título del itinerario, datos de usuario, estado del usuario*/

  /*Funciones de requests: las funciones de Create, Update y Delete llaman a la función de Read
  para actualizar el hook posts; el container las pasa a sus hijos como callbacks*/


 


  getComments = () => {
    getData(`/api/itineraries/byTitle/${this.props.title}/comments`, null, data => {
      let myData = data.comments[0].comments;
      this.setState({posts: myData})
    });
  };

  createComment = input => {
    getData(
      `/api/itineraries/byTitle/${this.props.title}/comments`,
      {
        method: "PUT",
        body: JSON.stringify({
          username: this.props.user,
          text: input
        }),
        headers: {
          "Content-Type": "application/json"
        }
      },
      () => this.getComments()
    );
  };

  updateComment = (input, id) => {
    
    console.log(id);
    getData(
      `/api/itineraries/byTitle/${this.props.title}/comments/update/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          text: input
        }),
        headers: {
          "Content-Type": "application/json"
        }
      },
      () => console.log("update comment")
    );
  };

  deleteComment = id => {
    getData(
      `/api/itineraries/byTitle/${this.props.title}/comments/delete/${id}`,
      {
        method: "DELETE",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json"
        }
      },
      () => console.log('deleted'))

  };

  /*Variables para render condicional*/
  /*Si posts es no-nulo, <CommentList> recibe los posts y los mapea*/

  /*let commentList;
  if (posts != null) {
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
*/

componentDidMount() {
    this.getComments()
}

  render() {
    
    let commentList;

    if (this.state.posts != null) {
      commentList = this.state.posts.map((comment, index) => (
        <CommentItem
          key={`key#${this.state.title}#${index}`}
          title={this.state.title}
          username={comment.username}
          text={comment.text}
          id={comment.id}
          updateComment={this.updateComment}
          deleteComment={this.deleteComment}
          logged={this.props.logged}
          currentUser={this.props.user}
        />
      ));
    }

    /*Si estás loggeado aparece el textbox de input*/
    let commentTextBox;
    if (this.props.logged) {
      commentTextBox = (
        <CommentInput
          title={this.state.title}
          callback={this.createComment}
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

    console.log(this.state.posts);

    //index = a.findIndex(x => x.prop2 ==="yutu")
    return (
      <Fragment>
        {commentList}
        {commentTextBox}
      </Fragment>
    );
  }
}

export default CommentsContainer;
