import React from 'react';
import './garbage.scss';
function garbage() {
  return (
    <div className='garbage'>
        <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
    <h1 className='gar'>Garbage Collection</h1>
    <form >
         <label htmlFor="name">Enter your name:</label>
         <input id="name" alt="Name" type="text" />
         <button type="submit">Submit</button>
       </form>
      
    </div>
  )
}

export default garbage
