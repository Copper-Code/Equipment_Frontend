import React, { useEffect } from 'react'

function test() {
   useEffect(()=>{
    fetch('http://localhost:8081/equipment')
    .then(res=>res.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(err));

   },[])
  return (
    <div>test</div>
  )
}

export default test