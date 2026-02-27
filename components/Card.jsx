// import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import "../src/App.css";
// import {Riple} from "react-loading-indicators";
// import { auto } from "@popperjs/core";
// import CardGroup from "react-bootstrap/CardGroup";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { data } from "react-router-dom";

function CardComponent({ dataSearch, loading }) {
  //Read data
  // const [data, setDataEquipment] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8081/equipment")
  //     .then((res) => {
  //       console.log(res.data); // เพิ่มตรงนี้
  //       setDataEquipment(res.data);
  //     })
  //     .catch((err) => {
  //       console.log("Error fetching data:", err);
  //     });
  // }, []);
  const noimage =
    "https://res.cloudinary.com/dpxabqt4z/image/upload/v1771990599/noimage_kqt3oi.png";
  // const urlImg = "http://localhost:8081";

  // const sqlImg = (equipment.image_url);

  // useEffect(()=>{
  //     axios.get('http://localhost:8081/equipment')
  //     .then(res=>setDataEquipment(res.data))
  //     .catch(err=>console.log(err))
  //   },[])

  //Show image

  const styleCard = {
    backgroundColor: "var(--color-card-primary)",
    width: "17rem",
    borderRadius: "15px",
    overflow: "hidden",
    cursor: "pointer",
  };
  const styleImg = {
    width: "100%",
    height: "200px",
    overflow: "hidden",
    objectFit: "cover",
    objectPosition: "center",
  };
  const styleFont = {
    fontWeight: 350,
    lineHeight: "0.6",
    fontSize: "14px",
    color: "var(--color-text-primary)",
  };
  const styleUser = {
    width: 40,
    height: 40,
    objectFit: "cover",
    objectPosition: "center",
  };

  // {data.map((equipment,index)=>{
  return (
    //  <div style={{gap:'15px',display:'flex',flexWrap:'wrap'}}>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto auto auto auto",
        gap: "25px",
        // border: '2px solid red',
        // backgroundColor: 'dodgerblue',
        padding: "10px",
        placeItems: "center", //ทำให้ item ที่อยู่ใน grid จัดกึ่งกลาง
      }}
    >
      {/* {Array.isArray(dataEquipment) ? (// */}
      {/* //  {dataSearch && dataSearch.length > 0 ? (  //ตรวจสอบว่ามีข้อมูลใน dataSearch หรือไม่ และเป็นอาร์เรย์ที่มีความยาวมากกว่า 0 หรือไม่ */}
      {loading ? (
        // <p>กำลังค้นหา...</p>
        <div
          style={{
            position: "fixed", //ทำให้ div นี้อยู่เหนือเนื้อหาอื่นๆ
            display: "flex", //ใช้ flexbox เพื่อจัดกึ่งกลางทั้งแนวตั้งและแนวนอน
            justifyContent: "center", //จัดกึ่งกลางแนวนอน
            alignItems: "center", // จัดกึ่งกลางแนวตั้ง
          }}
        >
          <Spinner animation="grow" variant="primary" />
        </div>
      ) : Array.isArray(dataSearch) && dataSearch.length > 0 ? ( //ตรวจสอบว่ามีข้อมูลใน dataSearch หรือไม่ และเป็นอาร์เรย์ที่มีความยาวมากกว่า 0 หรือไม่
        dataSearch.map((equipment, index) => (
          <Card
            key={equipment.eq_id || index}
            className="shadow-sm border-0"
            style={styleCard}
          >
            {/* <Card.Img variant="top" src="/item1.jpg" style={styleImg}/> */}
            {/* <Card.Img variant="top" src="http://localhost:8081/uploads/Gemini_Generated_Image_iajectiajectiaje.png-1765411409567.png" style={styleImg}/>
             */}
            {/* //กรณีจากโฟลเดอร์อัปโหลด */}
            {/* <Card.Img variant="top" src={`${urlImg}/uploads/${equipment.image_url?equipment.image_url:`noimage.png`}`} style={styleImg}/> */}
            {/* กรณีจาก cloundinary */}
            <Card.Img
              variant="top"
              src={equipment.image_url ? equipment.image_url : noimage}
              style={styleImg}
            />

            <Card.Body>
              <Card.Title style={{ color: "var(--color-text-primary)" }}>
                {equipment.name_eq}
              </Card.Title>
              <Card.Text style={styleFont}>{equipment.eq_id}</Card.Text>
              <Card.Text style={styleFont}>
                หน่วยงาน {equipment.name_department}{" "}
              </Card.Text>
              <Card.Text style={styleFont}>
                ราคา : {equipment.price_eq}{" "}
              </Card.Text>
              <Card.Text style={styleFont}>
                ปีงบประมาณ : {equipment.fiscal_year}
              </Card.Text>
            </Card.Body>
            <Card.Footer style={{ background: "var(--color-user-primary)" }}>
              <Col
                xs={6}
                md={4}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Image src="icon2.png" roundedCircle style={styleUser} />
                <small
                  style={{
                    color: "var(--color-bg-primary)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {equipment.user_eq}
                </small>
              </Col>
            </Card.Footer>
          </Card>
        ))
      ) : (
        <h3 className="text-center"           
        style={{
            position: "fixed", //ทำให้ div นี้อยู่เหนือเนื้อหาอื่นๆ
            display: "flex", //ใช้ flexbox เพื่อจัดกึ่งกลางทั้งแนวตั้งและแนวนอน
            justifyContent: "center", //จัดกึ่งกลางแนวนอน
            alignItems: "center", // จัดกึ่งกลางแนวตั้ง
          }}>ไม่พบข้อมูลที่ค้นหา..</h3>
      )}
    </div>
  );
}

export default CardComponent;

//    const EqContentStyle ={
//         gridArea:'contentEq',
//         margin:'20px',
//         // border: '2px solid red',
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
//         rowGap: '60px',
//         alignItems: 'center',
//         justifyItems: 'center',
//         padding: '20px'
// }
