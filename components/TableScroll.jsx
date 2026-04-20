import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { useState } from "react";
import API_URL from "../src/config";
import axios from "axios";


import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


const styleFont = {
  small: { fontSize: "12px" },
};
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

const noimage =
  "https://res.cloudinary.com/dpxabqt4z/image/upload/v1771990599/noimage_kqt3oi.png";
const columns = [
  { id: "image_url", label: "รูปภาพ", minWidth: 100 },
  { id: "eq_id", label: "เลขทะเบียน", minWidth: 100 },
  { id: "type_name", label: "ประเภท", minWidth: 100 },
  {
    id: "name_eq",
    label: "ชื่อครุภัณฑ์",
    minWidth: 100,
  },

  {
    id: "fiscal_year",
    label: "ปีที่งบฯ",
    minWidth: 100,
  },
  {
    id: "age_eq",
    label: "อายุ",
    minWidth: 100,
  },
  {
    id: "name_hp_branch",
    label: "หน่วยงาน",
    minWidth: 100,
  },
  {
    id: "name_department",
    label: "แผนก",
    minWidth: 100,
  },
  //   {
  //   id: 'user_eq',
  //   label: 'ผู้ดูแล',
  //   minWidth: 100,
  // },
  {
    id: "company_eq",
    label: "บริษัท",
    minWidth: 100,
  },
  {
    id: "price_eq",
    label: "ราคา",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString({ minimumFractionDigits: 2 }),
  },
  {
    id: "actions",
    label: "actions",
    minWidth: 100,
    align: "center",
  },
];

// function createData(image_url, eq_id, type_name, name_eq, price_eq, company_eq, fiscal_year, age_eq, name_eq_branch, name_department, user_eq, actions) {
//   return { image_url, eq_id, type_name, name_eq, price_eq, company_eq, fiscal_year, age_eq, name_eq_branch, name_department, user_eq , actions };

// }
export default function StickyHeadTable({ dataSearch, loading, refreshData }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  console.log("test data search: ", dataSearch);
  console.log("test loading: ", loading);
  console.log("test refreshData: ", refreshData);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
        `${API_URL}/delete_equipment/${selectedEq_id}`,
      );
      //ปิด popup
      setOpen(false);

      //ล้างค่า
      setSelectedEq_id(null);
      alert(`${selectedEq_id} ถูกลบแล้ว`);
      console.log("Deleted", resDelete);
      //อัพเดทตารางหลังลบข้อมูล
      refreshData();
      // const res = await axios.get("http://localhost:8081/equipment");
      // setdataEquipment(res.data);
      // console.log("Test res.data in Table", res.data);
    } catch (err) {
      alert("ลบข้อมูลไม่สำเร็จ", `${err}`);
      console.error(err);
    }
  }

  return (

 
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440,
         overflowX:"auto",
         overflowY: "auto" }}>
        <Table stickyHeader aria-label="sticky table"
        sx={{minWidth:440}}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center"  sx={{whiteSpace: "nowrap" }}>
                  <Spinner animation="border" variant="primary" />
                </TableCell>
              </TableRow>
            ) : Array.isArray(dataSearch) && dataSearch.length > 0 ? ( //ตรวจสอบว่ามีข้อมูลใน dataSearch หรือไม่ และเป็นอาร์เรย์ที่มีความยาวมากกว่า 0 หรือไม่
              dataSearch
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) //ใช้ slice เพื่อแบ่งข้อมูลออกเป็นหน้าๆ โดย page * rowsPerPage คือจุดเริ่มต้นของข้อมูลที่จะแสดงในหน้า และ page * rowsPerPage + rowsPerPage คือจุดสิ้นสุดของข้อมูลที่จะแสดงในหน้า
                .map((equipment, index) => {
                  //ใช้ map เพื่อแปลงข้อมูลแต่ละแถวใน rows ให้เป็นองค์ประกอบ TableRow ที่จะแสดงในตาราง โดย row คือข้อมูลของแต่ละแถวที่เรากำลังประมวลผลอยู่
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={equipment.eq_id || index}
                    >
                      {columns.map((column) => {
                        const value = equipment[column.id];

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "image_url" ? (
                              <img
                                //กรณีดึงภาพจาก โฟลเดอร์ uploads ที่อยู่ใน backend มาแสดง
                                // src={`${urlImg}/uploads/${equipment.image_url ? equipment.image_url : `noimage.png`}`}
                                //กรณีดึงภาพจาก cloundinary มาแสดง
                                src={
                                  equipment.image_url
                                    ? equipment.image_url
                                    : noimage
                                }
                                alt={`image of ${equipment.eq_id}`}
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "50%",
                                }} // Optional styling
                              />
                            ) : column.format && typeof value === "number" ? (
                              column.format(value) //
                            ) : column.id === "actions" ? (
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
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  ไม่มีข้อมูล
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>


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
      
      </TableContainer>



      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={dataSearch.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>

  );
}

















// import * as React from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';

// const columns = [
//   { id: 'name', label: 'Name', minWidth: 170 },
//   { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
//   { id: 'name', label: 'Name', minWidth: 170 },
//   { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
//   { id: 'name', label: 'Name', minWidth: 170 },
//   { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
//   { id: 'name', label: 'Name', minWidth: 170 },
//   { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },

  
//   {
//     id: 'population',
//     label: 'Population',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'size',
//     label: 'Size\u00a0(km\u00b2)',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'density',
//     label: 'Density',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toFixed(2),
//   },
//   { id: 'name', label: 'Name', minWidth: 170 },
//   { id: 'name', label: 'Name', minWidth: 170 },
//   { id: 'name', label: 'Name', minWidth: 170 },
//   { id: 'name', label: 'Name', minWidth: 170 },
//   { id: 'name', label: 'Name', minWidth: 170 },
//   { id: 'name', label: 'Name', minWidth: 170 },
// ];

// function createData(name, code, population, size) {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

// const rows = [
//   createData('India', 'IN', 1324171354, 3287263),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767),
// ];

// export default function StickyHeadTable() {
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   return (
//     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row) => {
//                 return (
//                   <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//                     {columns.map((column) => {
//                       const value = row[column.id];
//                       return (
//                         <TableCell key={column.id} align={column.align}>
//                           {column.format && typeof value === 'number'
//                             ? column.format(value)
//                             : value}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 );
//               })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// }
