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
    icons = {positivo: Thumbsup, negativo: Thumbsdown}
  } else {icons = {positivo: Thumbsdown, negativo: Thumbsup} }
  if (like == true) {
    heart = (
      <Button className="" onClick={() => handleClick(negativo)}>
        <Octicon icon={icons.negativo} />
      </Button>
    );
  } else {
    heart = (
      <Button className="" onClick={() => handleClick(positivo)}>
        <Octicon icon={icons.positivo} size="small" />
      </Button>
    );
  }
  return <>{heart}</>;
};

export default Heart;
