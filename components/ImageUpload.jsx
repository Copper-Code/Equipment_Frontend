// import React, { use } from 'react';
// import Form from 'react-bootstrap/Form';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
// import Container from 'react-bootstrap/Container';
// import axios from 'axios';
// import { useState,useEffect } from 'react';
// // import imageHandler from '../utils/imageHandler';
export default function ImageUpload() {
  return (
    <div>ImageUpload</div>
  )
}
// export default function ImageUpload() {

//   //imageHandler
// const imageHandler = (event)=>{
//     const file = event.target.files[0];
//     const formData = new FormData();
//     formData.append("image",file);  

//     fetch(`http://localhost:8081/api/image`,{
//         method:'POST',
//         body:formData,
//         headers:{
//             'Accept':'multipart/form-data',
//         },
//         credentials:'include',
//     })
//     .then(res=>res.json())
//     .then(res=>{
//         setUploadStatus(res.msg);
//     })
//     .catch(err=>{
//         console.log("Error from image upload",err);
//     })
// }


// const [uploadStatus, setUploadStatus] = useState('');


// //display image
// const [image,setImage] = useState('');
// useEffect(()=>{
//     fetch(`http://localhost:8081/api/image`,{
//         method:'GET',
//         headers:{
//             "Content-Type": 'application/json,charset=UTF-8',
//             'Accept':'application/json,text/html',
//         },
//         credentials:'include',
//         })
//         .then(data=>data.json())
//         .then((data)=>{
//             console.log(data) 
//         setImage('http://localhost:8081/'+data.image)//url
//         console.log(image)
//         });
//     })
//   return (
    
//   <Col>
//   <h2> {uploadStatus} </h2>
//                 <Form.Group controlId="formFileSm" className="mb-3">
//                 <Form.Label>อัพโหลดภาพ</Form.Label>
//                 <Form.Control 
//                 type="file" 
//                 size="m"
//                 name="image"
//                 accept="image/*"
//                 multiple={false}
//                 onChange={imageHandler}
//                 // onChange={(event)=>{
//                 // setImage_eq(event.target.value);
//                 // }}
//                  />
//                 </Form.Group>
//        {image && <img src={image} alt="img"/>}
//         </Col>
//   )
// }
