import React from 'react';
import Heart from 'react-icons/lib/fa/heart-o';
import IconButton from './IconButton';
import {useState} from 'react'

const Likes =  props  => {
  const [count, setCount] = useState(0)

  const forceReRender = () => {
    setCount(count ++)
  } 
 
  console.log("puto",props);
  return (
    <div>
    <IconButton />
    
      {/* <span className=" text-white ml-2">{likes}</span> */}
    </div>
  );
};

export default Likes;