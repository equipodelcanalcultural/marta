import React from "react";
import { useState, useEffect } from "react";
import EmptyHeart from "react-icons/lib/fa/heart-o";
import FullHeart from "react-icons/lib/fa/heart";
import { callbackify } from "util";
import {Button} from 'react-bootstrap';
import Octicon, {Thumbsup, Thumbsdown} from '@primer/octicons-react'

const Heart = ({ callback}) => {
  const [like, setLike] = useState(false);
 

  const handleClick = (polarity) => {
    setLike(!like);
    callback(polarity)
  };

  let heart;

  if (like == true) {
    heart = (
        <Button className="" onClick={() => handleClick('dislikes') }>

        <Octicon icon={Thumbsdown}/>
   
    
  </Button>
    );
  } else {
    heart = (
        <Button className="" onClick={() => handleClick('likes')  }>
        <Octicon icon={Thumbsup} size="small"/>
</Button>
    );
  }
  return <>{heart} 
 </>;
};

export default Heart;
