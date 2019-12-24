import { useState, useEffect } from "react";
import { getData } from "../../../store/actions/reduxFetch";

export default function usePosts(title, user, input, id) {
  const [posts, setPosts] = useState();

  const getComments = () => {
    getData(
      `/api/itineraries/byTitle/${title}/comments`,
      null,
      data => {
        setPosts(data.comments[0].comments);
        console.log(data + " hola");
      },
      data => setPosts(data)
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
      data =>
        posts
          ? setPosts([
              ...posts,
              { id: data.id, username: data.username, text: data.text }
            ])
          : setPosts({ id: data.id, username: data.username, text: data.text })
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
      data => console.log(data)
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
      data => console.log(data)
    );
  };

  useEffect(() => {
    getComments();
  }, []);
  useEffect(() => console.log(posts), [posts]);

  return [posts, createComment, updateComment, deleteComment];
}
