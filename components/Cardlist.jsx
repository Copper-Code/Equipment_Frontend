import "./CpnStyle.css";
// import { useState, useEffect } from "react";
// import axios from 'axios';
import Spinner from "react-bootstrap/Spinner";
function Cardlist({ dataSearch, loading }) {
  //   // Read data
  // const [data,setdataEquipment] = useState([])
  // useEffect(()=>{
  //     axios.get('http://localhost:8081/equipment')
  //     .then(res=>setdataEquipment(res.data))
  //     .catch(err=>console.log(err))
  //   },[])
  const noimage =
    "https://res.cloudinary.com/dpxabqt4z/image/upload/v1771990599/noimage_kqt3oi.png";
  //กรณีดึงภาพจาก โฟลเดอร์ uploads ที่อยู่ใน backend มาแสดง
  //  const urlImg ="http://localhost:8081";
  return (
    <div>
      {loading ? (
        // <p>กำลังค้นหา...</p>
        <div
          style={{
            position: "relative", //ทำให้ div นี้อยู่เหนือเนื้อหาอื่นๆ relative คือ
            display: "flex", //ใช้ flexbox เพื่อจัดกึ่งกลางทั้งแนวตั้งและแนวนอน
            justifyContent: "center", //จัดกึ่งกลางแนวนอน
            alignItems: "center", // จัดกึ่งกลางแนวตั้ง
          }}
        >
          <Spinner animation="grow" variant="primary" />
        </div>
      ) : Array.isArray(dataSearch) && dataSearch.length > 0 ? ( //ตรวจสอบว่ามีข้อมูลใน dataSearch หรือไม่ และเป็นอาร์เรย์ที่มีความยาวมากกว่า 0 หรือไม่
        dataSearch.map((equipment, index) => (
          <div
            key={equipment.eq_id || index}
            className="grid-container shadow-sm"
          >
            {/* กรณีดึงภาพจาก โฟลเดอร์ uploads ที่อยู่ใน backend มาแสดง */}
            {/* <div className="item1"><img  src={`${urlImg}/uploads/${equipment.image_url?equipment.image_url:`noimage.png`}`}  alt="item"/> */}
            {/* กรณีดึงภาพจาก cloundinary มาแสดง */}
            <div className="item1">
              <img
                src={equipment.image_url ? equipment.image_url : noimage}
                alt="item"
              />
            </div>
            <div className="item2">
              <p>
                <strong>ชื่อ</strong> : {equipment.name_eq}
              </p>
              <p>
                <strong>ประเภท</strong> : {equipment.type_name}
              </p>
              <p>
                <strong>สถานะ</strong> : {equipment.status_name_eq}
              </p>
              <p>
                <strong>PO</strong> : {equipment.po_eq}
              </p>
              <p>
                <strong>ยี่ห้อ/แบรนด์/รุ่น</strong> : {equipment.brand_eq}
              </p>
              <p>
                <strong>บริษัท</strong> : {equipment.company_eq}
              </p>
              <p>
                <strong>รายละเอียด </strong> : {equipment.detail_eq}
              </p>
              <p>
                <strong>Serial Number</strong> : {equipment.serialNo}
              </p>
            </div>
            <div className="item3">
              {" "}
              <p>
                <strong>ปีงบประมาณ</strong> : {equipment.fiscal_year}{" "}
              </p>
              <p>
                <strong>วันที่ซื้อ</strong> : {equipment.order_date}
              </p>
              <p>
                <strong>วันที่ตรวจรับ</strong> : {equipment.received_date}
              </p>
              <p>
                <strong>อายุการใช้งาน</strong> : {equipment.age_eq}
              </p>
              <p>
                <strong>
                  สาขา/หน่วยงานสังกัด : {equipment.name_hp_branch}
                </strong>{" "}
              </p>
              <p>
                <strong>แผนก</strong> : {equipment.name_department}
              </p>
              <p>
                <strong>สถานที่เก็บ</strong> : {equipment.storage_eq}
              </p>
              <p>
                <strong>ผู้ดูแล</strong> : {equipment.user_eq}
              </p>
            </div>

            <div className="item4">
              <div>{equipment.eq_id}</div>
            </div>
            <div className="item5">
              <div>
                <strong>ราคา</strong> : {equipment.price_eq}
              </div>
            </div>
          </div>
        ))
      ) : (
        <h3 className="text-center"           
        style={{
           position: "relative", //ทำให้ div นี้อยู่เหนือเนื้อหาอื่นๆ relative คือ
            display: "flex", //ใช้ flexbox เพื่อจัดกึ่งกลางทั้งแนวตั้งและแนวนอน
            justifyContent: "center", //จัดกึ่งกลางแนวนอน
            alignItems: "center", // จัดกึ่งกลางแนวตั้ง
          }}>ไม่พบข้อมูลที่ค้นหา..</h3>
      )}
    </div>
  );
}

export default Cardlist;
