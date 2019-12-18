import React from "react";
import { useState, useEffect } from "react";
import EmptyHeart from "react-icons/lib/fa/heart-o";
import FullHeart from "react-icons/lib/fa/heart";
import { callbackify } from "util";
import { Button } from "react-bootstrap";
import Octicon, { Thumbsup, Thumbsdown } from "@primer/octicons-react";

const Heart = ({ callback, positivo, negativo }) => {
  const [like, setLike] = useState(false);

  const handleClick = polarity => {
    setLike(!like);
    callback(polarity);
  };

  let heart;
  let icons;
  if (positivo == 'likes') {
    icons = {positivo: EmptyHeart, negativo: FullHeart}
  } else {icons = {positivo: FullHeart, negativo: EmptyHeart} }
  if (like == true) {
    heart = (
      <span style={{color:"red"}} className="" onClick={() => handleClick(negativo)}>
        <Octicon icon={icons.negativo} />
      </span>
    );
  } else {
    heart = (
      <span style={{color:"red"}}  className="" onClick={() => handleClick(positivo)}>
        <Octicon icon={icons.positivo} size="small"/>
      </span>
    );
  }
  return <>{heart}

  </>;
};

export default Heart;
