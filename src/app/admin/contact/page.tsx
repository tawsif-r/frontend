'use client'
import React, { useState, useEffect } from 'react';

const Contact:React.FC = () => {


  const [count, setCount] = useState(0); //initial state is set to zero
  const [doubled, setDoubled] = useState(0);

  useEffect(()=>{
    //side effect will run if something changes
    setDoubled(count * 2);
  },[count]);// the dependency gets into the []

  const increamentCount = () => {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counter</h1>
      <p>Count: {count}</p>
      <p>Count doubled: {doubled}</p>
      <button className='border-4 ' onClick={increamentCount}>Count increament</button>

    </div>
  )
}

export default Contact;
