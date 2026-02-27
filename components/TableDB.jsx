import { useState, useEffect } from "react";
import * as React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Spinner from "react-bootstrap/Spinner";

// import { main } from "@popperjs/core";
// import { palette, ThemeProvider } from "@mui/system";
import { ThemeProvider } from "@mui/material/styles";

import { createTheme } from "@mui/material/styles";

//สี
const theme = createTheme({
  palette: {
    warning: {
      main: "#FFC000",
      contrastText: "#ffffff",
    },
    red: {
      main: "#ff0000",
      contrastText: "#ffffff",
    },
  },
});

export default function TableDB({ dataSearch, loading, refreshData }) {
  //ดึงข้อมูลจากฐานข้อมูลมาแสดงในตาราง
  // const [data, setdataEquipment] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8081/equipment")
  //     .then((res) => setdataEquipment(res.data))
  //     .catch((err) => console.log(err));
  // }, []);
  // const urlImg = "http://localhost:8081";
  const noimage =
    "https://res.cloudinary.com/dpxabqt4z/image/upload/v1771990599/noimage_kqt3oi.png";
  const styleFont = {
    small: { fontSize: "12px" },
  };

  //สำหรับ popup ลบ
  const [open, setOpen] = React.useState(false);
  const [selectedEq_id, setSelectedEq_id] = useState(null);

  const handleConfirmDelete = (eq_id) => {
    console.log("Click--> การจัดการลบ : " + eq_id);
    setSelectedEq_id(eq_id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleDelete() {
    if (!selectedEq_id)
      return alert(
        "ไม่มีครุภัณฑ์ที่เลือก! โปรดทำรายการอีกครั้ง หรือติดต่อเจ้าหน้าที่",
      );
    console.log("ข้อมูลที่ต้องการลบ : ", selectedEq_id);
    try {
      //  alert(`คุณต้องการลบข้อมูล เลขทะเบียน ${eq_id} ใช่หรือไม่`)
      const resDelete = await axios.delete(
        `http://localhost:8081/delete_equipment/${selectedEq_id}`,
      );
      //ปิด popup
      setOpen(false);

      //ล้างค่า
      setSelectedEq_id(null);
      alert(`${selectedEq_id} ถูกลบแล้ว`);
      console.log("Deleted", resDelete);
      //อัพเดทตารางหลังลบข้อมูล
      refreshData()
      // const res = await axios.get("http://localhost:8081/equipment");
      // setdataEquipment(res.data);
      // console.log("Test res.data in Table", res.data); 

    } catch (err) {
      alert("ลบข้อมูลไม่สำเร็จ", `${err}`);
      console.error(err);
    }
  }

  return (
    <div className="table-responsive-sm position-relative">
      <table className="table table-hover ">
        <thead>
          <tr>
            <th>#</th>
            <th>ภาพ</th>
            <th>เลขทะเบียน</th>
            <th>ประเภท</th>
            <th>ชื่อ</th>
            <th>ราคา</th>
            <th>บริษัท</th>
            <th>ปีงบฯ</th>
            <th>อายุ</th>
            <th>หน่วยงาน</th>
            <th>แผนก</th>
            {/* <th>สถานที่เก็บ</th> */}
            <th>ผู้ดูแล</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody  style={{ fontSize: "14px" }}>
          {loading ? (
         
  <tr>
        <td colSpan={13} className="text-center">
          <Spinner animation="border" variant="primary" />
        </td>
      </tr>

         
       
          ) : Array.isArray(dataSearch) && dataSearch.length > 0 ? ( //ตรวจสอบว่ามีข้อมูลใน dataSearch หรือไม่ และเป็นอาร์เรย์ที่มีความยาวมากกว่า 0 หรือไม่
            dataSearch.map((equipment, index) => (
              <tr key={equipment.eq_id || index}>
                <th scope="row">{index + 1}</th>
                <td>
                  {" "}
                  <img
                    //กรณีดึงภาพจาก โฟลเดอร์ uploads ที่อยู่ใน backend มาแสดง
                    // src={`${urlImg}/uploads/${equipment.image_url ? equipment.image_url : `noimage.png`}`}
                    //กรณีดึงภาพจาก cloundinary มาแสดง
                    src={equipment.image_url ? equipment.image_url : noimage}
                    alt={`image of ${equipment.eq_id}`}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }} // Optional styling
                  />
                </td>
                <td>{equipment.eq_id}</td>
                <td>{equipment.type_name}</td>
                <td>{equipment.name_eq}</td>
                <td>{equipment.price_eq}</td>
                <td style={styleFont.small}>{equipment.company_eq}</td>
                <td>{equipment.fiscal_year}</td>
                <td style={styleFont.small}>{equipment.age_eq}</td>
                <td style={styleFont.small}> {equipment.name_hp_branch}</td>
                <td>{equipment.name_department}</td>
                {/* <td style={styleFont.small}>{equipment.storage_eq}</td> */}
                <td>{equipment.user_eq}</td>
                <td style={styleFont.small}>
                  <ThemeProvider theme={theme}>
                    <div className="d-flex gap-2">
                      <Link to={`/edit/${equipment.eq_id}`}>
                        {/* <button type="button" className="btn btn-warning btn-sm">
                      แก้ไข
                    </button> */}
                        <Button variant="contained" color="warning">
                          แก้ไข
                        </Button>
                      </Link>
                      <Button
                        variant="contained"
                        color="red"
                        onClick={() => handleConfirmDelete(equipment.eq_id)}
                      >
                        ลบ
                      </Button>
                    </div>
                  </ThemeProvider>
                </td>
              </tr>
            ))
          ) : (
            
            <tr>
        <td colSpan={13} className="text-center">
           <h4>
              ไม่พบข้อมูลที่ค้นหา..😿
            </h4>
        </td>
      </tr>
       
       
            
          )}

          {/* }//ปิด loading */}
        </tbody>
        {/* ))
      ):(

      ) */}
      </table>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"ยืนยันการลบข้อมูล?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            หากลบแล้วจะไม่สามารถกู้คืนได้
          </DialogContentText>
        </DialogContent>

        <ThemeProvider theme={theme}>
          <DialogActions>
            <Button variant="contained" color="red" onClick={handleDelete}>
              ลบ
            </Button>
            <Button
              variant="contained"
              color="inherit"
              onClick={handleClose}
              autoFocus
            >
              ยกเลิก
            </Button>
          </DialogActions>
        </ThemeProvider>
      </Dialog>
    </div>
  );
}
{
  /* <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(equipment.eq_id)}>ลบ</button>  ี่เหลือ eq_id*/
}
