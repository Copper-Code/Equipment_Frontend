import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import "../components/CpnStyle.css"
import { useState } from 'react';

function ButtonToggle({setlayoutView}) {

  // const stylebtnGroup = {border: '1px solid var(--color-hover-primary)'}
  const styleButton = {lineHeight: 'normal'} 
  // color:'var(--color-icon-placeholder)'
  // const styleColorbtn = {backgroundColor : 'var(--color-bg-secondary)',border: '2px solid var(--color-bg-secondary)'}
  return (
   
   <ButtonGroup aria-label="Basic example">
      <Button variant="secondary"  onClick={() => setlayoutView("card")} >
        <span className="material-symbols-outlined" style={styleButton}>grid_view</span>  
      </Button>
     
      <Button  variant="secondary" onClick={() => setlayoutView("cardlist")} >
        <span className="material-symbols-outlined" style={styleButton}>magnification_small</span>
      </Button>

      {/* styleColorbtn */}
      <Button  variant="secondary" onClick={() => setlayoutView("tabledb")} >
        <span className="material-symbols-outlined" style={styleButton}>lists</span>
      </Button>
    </ButtonGroup>
  );
}

export default ButtonToggle;

//  EquipmenPage (แสดงหน้าเนื้อหาหลัก)
//       - จะมี <ButtonTggle/> สำหรับเรียก ปุ่มทั้ง3มาแสดง
//  ButtonToggle (ดีไซน์ปุ่ม มี 3 ปุ่ม)
//        - card กำหนด onClickไปที่ ---> component <Card/>
//        - cardlist กำหนด onClickไปที่ ---> component <Cardlist/>
//        - tableDB กำหนด onClickไปที่ ---> component <TableDB/>
//  Card (คอมโพเนนที่เก็บดีไซน์ของการ์ด)
//  Cardlist (คอมโพเนนที่เก็บดีไซน์ของการ์ดลิสต์)
//  TableDB (คอมโพเนนที่เก็บดีไซน์ของตาราง)
//  เมื่อคลิกปุ่มใดก็ตามจะเปลี่ยน layout ไปยัง   EquipmenPage