import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "../src/App.css";
import { useState, useEffect, use } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CalendarTH from "../components/CalendarTH.jsx";
import { useParams } from "react-router-dom";
import API_URL from "../src/config.js";
import { useNavigate } from "react-router-dom";
// useNavigate, 
import Select from "react-select";

const  EditEqPage = () => {
  //ดึง id จาก url

    const{eq_id} = useParams();
    const noimage = "https://res.cloudinary.com/dpxabqt4z/image/upload/v1771990599/noimage_kqt3oi.png";
    // const navigate = useNavigate

    const navigate = useNavigate();
//คลิกปุ่ม แก้ไข -- Table
//ตรวจสอบว่ามีเลขแก้ไขในฐานข้อมูลไหมถ้ามีให้ไปหน้าแก้ไข Table
//หน้าแก้ไข ดึงข้อมูลจากฐานข้อมูลเฉพาะ eq_id นั้น มาแสดงในฟอร์ม
//
const [validated, setValidated] = useState(false);
  const [previewImage,setPreviewImage] = useState(null);
  //State สำหรับเก็บข้อมูลครุภัณฑ์ที่จะแก้ไข
  const [formData, setFormData] = useState({
    eq_id:"",
    type_eq_id:null,
    name_eq:"",
    brand_eq:"",
    detail_eq:"",
    serialNo:"",
    fiscal_year:"",
    order_date:null,
    received_date:null,
    warranty_expire:null,
    company_eq:"",
    price_eq:0,
    po_eq:"",
    id_status_eq:null,
    note_eq:"",
    user_eq:"",
    id_hp_branch:"",
    id_building:"",
    id_floor:"",
    id_room:"",
    upload_image:null //สำหรับเก็บไฟล์รูปภาพที่เลือกในฟอร์ม ส่วนไฟล์รูปเก่าอยู่ใน formData.image_url ที่ดึงมาจากฐานข้อมูล
});
  
  //ดึงข้อมูลจากฐานข้อมูลมาแสดงฟอร์มเก่า

  useEffect(() => {
    axios
      .get(`${API_URL}/edit_equipment/${eq_id}`)
      .then((res) =>{ setFormData({...res.data,
                    order_date:res.data.order_date?new Date(res.data.order_date):null,
                    received_date:res.data.received_date?new Date(res.data.received_date):null,
                    warranty_expire:res.data.warranty_expire?new Date(res.data.warranty_expire):null})
                console.log("ทดสอบ",res.data);
                console.log("URL ภาพ",res.data.image_url);
      })
      .catch((err) => console.log("เกิดข้อผิดพลาด",err));
    }, [eq_id]);


  //State สำหรับเก็บตัวเลือก สาขา/อาคาร/ชั้น/ห้อง
  const [branch, setBranch] = useState([]);
  const [building, setBuilding] = useState([]);
  const [floor, setFloor] = useState([]);
  const [room, setRoom] = useState([]);
  const [department, setDepartment] = useState([]);
  const [type_equipment, setTypeEquipment] = useState([]);

  //State สำหรับเก็บค่าที่เลือกใน dropdown
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  // const [id_room,setId_room]=useState('');
  const [selectedTypeEquipment, setSelectedTypeEquipment] = useState(null);


  //ฟังก์ชันจัดการการเปลี่ยนแปลงของฟอร์ม
  function handleChange(event) {
    const { name, value, type, files } = event.target;

    if (type === "file") {
      //ถ้าเป็น input type="file" ให้เก็บไฟล์ใน State
      const file = files[0] //ดึงไฟล์รูปที่เลือกตัวแรกเก็บไว้
      setFormData((prevFormData) => ({
        ...prevFormData, //คือการคัดลอกค่าก่อนหน้า
        upload_image: file, //เก็บไฟล์ object ส่ง backend
      }));
      //สร้าง url ชั่วคราว preview รูป
      setPreviewImage(URL.createObjectURL(file));
    } else {
      //ไม่ใช่ให้เก็บค่าปกติ
      // Handle text inputs
      setFormData((prevFormData) => ({
        //คือการอัปเดต State formData
        ...prevFormData, //คือการคัดลอกค่าก่อนหน้า
        [name]: value, //อัปเดตค่าที่เปลี่ยนแปลง
      }));
    }
  }

  //ดึง type equipment
  useEffect(() => {
    console.log("type equipment | useEffect ประเภทครุภัณฑ์ |");
    axios
      .get(`${API_URL}/type_equipment`)
      .then((res) => {
        console.log(
          "2.type_equipment dropdown | res | ดึงข้อมูลสาขามาแสดงใน dropdown",
          res.data,
        );
        const options = res.data.map((t) => ({
          value: t.type_eq_id,
          label: t.type_name,
        }));
        setTypeEquipment(options);

      })
      .catch((err) =>
        console.error({
          message:
            "เกิดข้อผิดพลาดในการดึงข้อมูล useEffect Type Equipment" + err,
        }),
      );
  }, []);


  //ดึงค่าเก่า : ประเภท

   useEffect(()=>{
        if(!formData.type_eq_id||type_equipment.length===0) return
           const matched = type_equipment.find((item)=>item.value===formData.type_eq_id)
           console.log("matched option: ", matched);
           console.log("selected: ",selectedTypeEquipment)
           console.log("formdata",formData.type_eq_id)
           setSelectedTypeEquipment(matched||null);
  
    },[type_equipment,formData.type_eq_id]);


  //ดึงสาขา
  useEffect(() => {
    console.log("1.branch | useEffect สาขา |");
    axios
      .get(`${API_URL}/branch`)
      .then((res) => {
        console.log(
          "2.branch dropdown | res | ดึงข้อมูลสาขามาแสดงใน dropdown",
          res.data,
        );
        const options = res.data.map((b) => ({
          value: b.id_hp_branch,
          label: b.name_hp_branch,
        }));
        console.log("3. branch | test options", options);
        setBranch(options);
      })
      .catch((err) =>
        console.error({
          message: "เกิดข้อผิดพลาดในการดึงข้อมูล useEffect Branch" + err,
        }),
      );
  }, []);

  //ดึงค่าเก่า : สาขา
     useEffect(()=>{
        if(!formData.id_hp_branch||branch.length===0) return
           const matched = branch.find((item)=>item.value===formData.id_hp_branch)
           console.log("matched option: ", matched);
           console.log("selected: ",selectedBranch)
           console.log("formdata",formData.id_hp_branch)
           setSelectedBranch(matched||null);
    },[branch,formData.id_hp_branch]);
    

  //ดึงแผนกตามสาขา
  useEffect(() => {
    console.log("___________________________________________________");
    console.log("1.Department | useEffect แผนก");
    if (selectedBranch) {
      console.log(
        "2.Department | เลือก | สาขา (selectedBranch)",
        selectedBranch.value,
      );
      axios
        .get(`${API_URL}/department/${selectedBranch.value}`)
        .then((res) => {
          console.log(
            "3.dropdown Department | res | ดึงข้อมูลแผนก → สาขาที่เลือก",
            res.data,
          );
          const options = res.data.map((d) => ({
            value: d.id_department,
            label: d.name_department,
          }));
          setDepartment(options);
        })
        .catch((err) =>
          console.error({
            message:
              "เกิดข้อผิดพลาดในการดึงข้อมูล useEffect selectedBranch" + err,
          }),
        );
      setSelectedDepartment(null);
    }
  }, [selectedBranch]);


  //ดึงอาคารตามสาขา
  //✅ เมื่อเลือกสาขา → React ส่ง branchId ไป backend → backend ดึงข้อมูลอาคารของสาขานั้นจากฐานข้อมูล → React เอาข้อมูลนั้นมาแสดงใน dropdown อาคาร
  useEffect(() => {
    console.log("___________________________________________________");
    console.log("1.building | useEffect อาคาร |");
    if (selectedBranch) {
      console.log(
        "2.building | เลือก |สาขา (selectedBranch)",
        selectedBranch.value,
      );
      axios
        .get(`${API_URL}/building/${selectedBranch.value}`)
        .then((res) => {
          console.log(
            "3.dropdown building | res | ดึงข้อมูลอาคาร → สาขาที่เลือก",
            res.data,
          );
          const options = res.data.map((b) => ({
            value: b.id_building,
            label: b.name_building,
          }));

          console.log("4. building การทดสอบ options selectedBranch" + options);
          setBuilding(options);
        })
        .catch((err) =>
          console.error({
            message:
              "เกิดข้อผิดพลาดในการดึงข้อมูล useEffect selectedBranch" + err,
          }),
        );
      setSelectedBuilding(null);
      setSelectedFloor(null);
      setSelectedRoom(null);
      setSelectedDepartment(null);
      setFloor([]);
      setRoom([]);
      setDepartment([]);
    }
  }, [selectedBranch]);
        //ดึงค่าเก่า : อาคาร
     useEffect(()=>{
        if(!formData.id_building||building.length===0) return
           const matched = building.find((item)=>item.value===formData.id_building)
           console.log("matched option: ", matched);
           console.log("selected: ",selectedBuilding)
           console.log("formdata",formData.id_building)
           setSelectedBuilding(matched||null);
  
    },[building,formData.id_building]);


  //ดึงชั้นตามอาคาร
  useEffect(() => {
    console.log("___________________________________________________");
    console.log("1.Floor เรียก useEffect ชั้น");
    if (selectedBuilding) {
      console.log("2.Floor | เลือก | selectedBuilding", selectedBuilding.value);
      axios
        .get(`${API_URL}/floor/${selectedBuilding.value}`)
        .then((res) => {
          console.log(
            "3.dropdown Floor| res | ดึงข้อมูลชั้น → อาคารที่เลือก",
            res.data,
          );
          const options = res.data.map((f) => ({
            value: f.id_floor,
            label: f.name_floor,
          }));
          setFloor(options);
          console.log("4.Floor options selectedBuilding" + options);
        })
        .catch((err) =>
          console.error({
            message:
              "เกิดข้อผิดพลาดในการดึงข้อมูล useEffect selectedBuilding" + err,
          }),
        );
      setSelectedFloor(null);
      setSelectedRoom(null);

      setRoom([]);
    }
  }, [selectedBuilding]);

        //ดึงค่าเก่า : ชั้น
     useEffect(()=>{
        if(!formData.id_floor||floor.length===0) return
           const matched = floor.find((item)=>item.value===formData.id_floor)
           console.log("matched option: ", matched);
           console.log("selected: ",selectedFloor)
           console.log("formdata",formData.id_floor)
           setSelectedFloor(matched||null);
  
    },[floor,formData.id_floor]);



  //ดึงห้องตามชั้น
  useEffect(() => {
    console.log("___________________________________________________");
    console.log("1.Room เรียก useEffect ห้อง");
    if (selectedFloor) {
      console.log("2.Room | เลือก | selectedFloor", selectedFloor.value);
      axios
        .get(`${API_URL}/room/${selectedFloor.value}`)
        .then((res) => {
          console.log(
            "2.dropdown Room | res | ดึงข้อมูลห้อง → ชั้นที่เลือก",
            res.data,
          );
          const options = res.data.map((r) => ({
            value: r.id_room,
            label: r.name_room,
          }));
          setRoom(options); //ส่ง options ห้อง ไปแสดงที่ตัวเลือก dropdown

          // console.log('2.ทดสอบ ดูข้อมูลใน selectedFloor',selectedRoom.value);
          console.log("3.Room การทดสอบ options selectedFloor" + options);
        })
        .catch((err) =>
          console.error({
            message:
              "เกิดข้อผิดพลาดในการดึงข้อมูล useEffect selectedFloor" + err,
          }),
        );
      setSelectedRoom(null);
    }
  }, [selectedFloor]);

  //ดึงห้องตามชั้น
  useEffect(() => {
    console.log("___________________________________________________");

    if (selectedRoom) {
      console.log(selectedRoom);
      console.log("แสดง id ห้องที่เลือก", selectedRoom.value);
      console.log("แสดงชื่อ ห้องที่เลือก", selectedRoom.label);
    }
  }, [selectedRoom]);

  //ดึงห้องจากข้อมูลเก่า
     useEffect(()=>{
        if(!formData.id_room||room.length===0) return
           const matched = room.find((item)=>item.value===formData.id_room)
           console.log("matched option: ", matched);
           console.log("selected: ",selectedRoom)
           console.log("formdata",formData.id_room)
           setSelectedRoom(matched||null);
  
    },[room,formData.id_room])


  //ดึงแผนกตามสาขา
  useEffect(() => {
    console.log("___________________________________________________");
    if (selectedDepartment) {
      console.log(selectedDepartment);
      console.log("แสดง id แผนก", selectedDepartment.value);
      console.log("แสดงชื่อ แผนกที่เลือก", selectedDepartment.label);
    }
  }, [selectedDepartment]);
     //ดึงค่าเก่า : แผนก
     useEffect(()=>{
        if(!formData.id_department||department.length===0) return
           const matched = department.find((item)=>item.value===formData.id_department)
           console.log("matched option: ", matched);
           console.log("selected: ",selectedDepartment)
           console.log("formdata",formData.id_department)
           setSelectedDepartment(matched||null);
  
    },[department,formData.id_department]);

  const [equipmentList, setEquipmentList] = useState([]); //เก็บข้อมูลที่เพิ่ม
  // const [addEquipment,setaddEquipment] = useState([])

  //  //----------------------------------------
  // ฟังก์ชันดึงข้อมูลครุภัณฑ์

  const fetchEquipment = () => {
    axios
      .get(`${API_URL}/equipment`)
      .then((res) => setEquipmentList(res.data))
      .catch((err) =>
        console.error({ message: "เกิดข้อผิดพลาดในการดึงข้อมูล @Eq" + err }),
      );
  };
  // เรียกใช้ฟังก์ชัน fetchEquipment เมื่อคอมโพเนนต์ถูกโหลด
  useEffect(() => {
    fetchEquipment();
  }, []);

  //----------------------------------------

  async function handleSubmit(event) {
        const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation(); 
    }

    setValidated(true);

    event.preventDefault(); //ป้องกันการรีเฟรชหน้าเมื่อส่งฟอร์ม

    try {
      const data = new FormData(); //คือการสร้าง FormData object สำหรับเก็บข้อมูลที่จะส่งไปยัง backend
      const file = formData.upload_image;

      if (file) {
        data.append("upload_image", file);
        console.log("มีไฟล์", file);
      } else {
        console.log("ไม่มีไฟล์");
      }

      data.append("type_eq_id",selectedTypeEquipment.value);
      data.append("name_eq", formData.name_eq);
      data.append("brand_eq", formData.brand_eq);
      data.append("detail_eq", formData.detail_eq);
      data.append("serialNo", formData.serialNo);
      data.append("fiscal_year", formData.fiscal_year);
      data.append("order_date", formData.order_date?formData.order_date.toISOString().slice(0, 10):null);
      data.append("received_date", formData.received_date?formData.received_date.toISOString().slice(0, 10):null);
      data.append("warranty_expire", formData.warranty_expire?formData.warranty_expire.toISOString().slice(0, 10):null); 
      data.append("company_eq", formData.company_eq);
      data.append("price_eq", Number(formData.price_eq));
      data.append("po_eq", formData.po_eq);
      data.append("note_eq", formData.note_eq);
      data.append("id_department", selectedDepartment.value);
      data.append("user_eq", formData.user_eq);
      data.append("id_room", selectedRoom.value);
      data.append("id_status_eq", formData.id_status_eq);

      const response = await axios.put(
        `${API_URL}/update_equipment/${eq_id}`,
        data,
      );
      console.log("Created Successfully", response.data);
      alert("อัปเดตข้อมูลสำเร็จ ✅");
      fetchEquipment(); // 👈 โหลดข้อมูลใหม่
      navigate("/equipment")
      // window.location.reload(); // รีเฟรชทั้งหน้า
      // clearForm();
    } catch (error) {
      console.log("อัปเดตข้อมูลไม่สำเร็จ");
      alert("อัปเดตข้อมูลไม่สำเร็จ");
      console.error("เกิด error ขึ้นใน handleSubmit:", error);
      // console.log("ชื่อครุภัณฑ์", formData.name_eq);
      // console.log("ยี่ห้อ", formData.brand_eq);
      // console.log("รายละเอียด", formData.detail_eq);
      // console.log("Serial No.", formData.serialNo);
      // console.log("ปีงบประมาณ", formData.fiscal_year);
      // console.log("วันที่ซื้อ", formData.order_date.toISOString().slice(0, 10));
      // console.log("วันที่ซื้อ", formData.received_date);
      // console.log("วันที่หมดประกัน", formData.warranty_expire);
    }
  } //ปิดฟังก์ชัน handleSubmit

  //ถ้ามีไฟล์ให้ อัปโหลดไฟล์และข้อมูลอื่น ๆ พร้อมกัน
  //ถ้าไม่มีไม่ต้องอัปโหลดไฟล์

  return (
   
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Container style={{ marginTop: "50px", marginBottom: "50px" }}>
        <Row>
          <Col>
            <div>
              <div className="add_ss1">ข้อมูลครุภัณฑ์</div>
              <section className="add_section1 shadow-sm ">
                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>เลขทะเบียน</Form.Label>
                  <Form.Control
                    type="text"
                    name="eq_id"
                    placeholder=""
                    className="color_input"
                    disabled
                    readOnly
                    value={formData.eq_id}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>ชื่อ</Form.Label>
                  <Form.Control
                    type="text"
                    name="name_eq"
                    placeholder=""
                    className="color_input"
                    required
                    value={formData.name_eq}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label> ประเภท </Form.Label>
                  <Select
                    placeholder="เลือกประเภท"
                    required
                    options={type_equipment}
                    value={selectedTypeEquipment}
                    onChange={setSelectedTypeEquipment}
                  />
                  {/* hidden validation */}
                  <Form.Control
                    type="text"
                    required
                    value={selectedTypeEquipment ? "ok" : ""}
                    style={{ display: "none" }}
                  />
                  <Form.Control.Feedback type="invalid">
                    *โปรดเลือกประเภท
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label> ยี่ห้อ/แบรนด์/รุ่น </Form.Label>
                  <Form.Control
                    type="text"
                    name="brand_eq"
                    value={formData.brand_eq}
                    placeholder=""
                    className="color_input"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-1" controlId="">
                  <Form.Label>รายละเอียด</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="detail_eq"
                    value={formData.detail_eq}
                    className="color_input"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label> Serial Number </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    className="color_input"
                    name="serialNo"
                    value={formData.serialNo}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label> ราคา </Form.Label>
                  <Form.Control
                    name="price_eq"
                    type="number"
                    min="0"
                    step="any"
                    placeholder=""
                    className="color_input"
                    required
                    value={formData.price_eq}
                    onChange={handleChange}
                  />
                </Form.Group>
              </section>
            </div>
          </Col>

          <Col>
            <div>
              <div className="add_ss2">ข้อมูลการจัดซื้อ</div>
              <section className="add_section2 shadow-sm">
                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label> ปีงบประมาณ</Form.Label>
                  <Form.Control
                    name="fiscal_year"
                    type="text"
                    value={formData.fiscal_year}
                    placeholder=""
                    className="color_input"
                    required
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label> วันที่สั่งซื้อ</Form.Label>
                  <CalendarTH
                    value={formData.order_date}
                    onChange={(date) =>
                      setFormData({ ...formData, order_date: date })
                    }
                  />
                  {/* Hidden input สำหรับ validation */}
                  <Form.Control
                    type="text"
                    required
                    value={formData.order_date || ""}
                    style={{ display: "none" }}
                  />

                  {/* Feedback */}
                  <Form.Control.Feedback type="invalid">
                    *โปรดใส่วันที่
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label> วันที่ตรวจรับ</Form.Label>
                  <CalendarTH
                    value={formData.received_date}
                    onChange={(date) =>
                      setFormData({ ...formData, received_date: date })
                    }
                  />

                  {/* Hidden input สำหรับ validation */}
                  <Form.Control
                    type="text"
                    required
                    value={formData.received_date || ""}
                    style={{ display: "none" }}
                  />

                  {/* Feedback */}
                  <Form.Control.Feedback type="invalid">
                    *โปรดใส่วันที่
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>วันที่หมดประกัน</Form.Label>
                  <CalendarTH
                    value={formData.warranty_expire}
                    onChange={(date) =>
                      setFormData({ ...formData, warranty_expire: date })
                    }
                  />
                  {/* Hidden input สำหรับ validation */}
                  <Form.Control
                    type="text"
                    required
                    value={formData.warranty_expire || ""}
                    style={{ display: "none" }}
                  />

                  {/* Feedback */}
                  <Form.Control.Feedback type="invalid">
                    *โปรดใส่วันที่
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>PO</Form.Label>
                  <Form.Control
                    name="po_eq"
                    value={formData.po_eq}
                    type="text"
                    placeholder=""
                    className="color_input"
                    required
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label> บริษัท </Form.Label>
                  <Form.Control
                    name="company_eq"
                    type="text"
                    placeholder=""
                    className="color_input"
                    value={formData.company_eq}
                    required
                    onChange={handleChange}
                  />
                </Form.Group>
              </section>
            </div>
          </Col>

          <Col>
            <div>
              <div className="add_ss3">ข้อมูลสถานที่เก็บ</div>
              <section className="add_section3 shadow-sm">
                <div style={{ maxWidth: 400 }}>
                  <Form.Group
                    className="mb-1"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label> หน่วยงานสังกัด/สาขา </Form.Label>
                    <Select
                      placeholder="เลือกสาขา"
                      required
                      options={branch}
                      value={selectedBranch}
                      onChange={setSelectedBranch}
                    />
                    {/* Hidden input สำหรับ validation */}
                    <Form.Control
                      type="text"
                      required
                      value={selectedBranch ? "ok" : ""}
                      style={{ display: "none" }}
                    />

                    <Form.Control.Feedback type="invalid">
                      *โปรดเลือกสาขา
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    className="mb-1"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Select
                      placeholder="เลือกอาคาร"
                      options={building}
                      value={selectedBuilding}
                      onChange={setSelectedBuilding}
                      isDisabled={!selectedBranch}
                      className="mt-3"
                    />
                    {/* Hidden input สำหรับ validation */}
                    <Form.Control
                      type="text"
                      required
                      value={selectedBuilding ? "ok" : ""}
                      style={{ display: "none" }}
                    />

                    <Form.Control.Feedback type="invalid">
                      *โปรดเลือกอาคาร หรืออื่นๆ
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    className="mb-1"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Select
                      placeholder="เลือกชั้น"
                      options={floor}
                      value={selectedFloor}
                      onChange={setSelectedFloor}
                      isDisabled={!selectedBuilding}
                      className="mt-3"
                    />
                    {/* Hidden input สำหรับ validation */}
                    <Form.Control
                      type="text"
                      required
                      value={selectedFloor ? "ok" : ""}
                      style={{ display: "none" }}
                    />

                    <Form.Control.Feedback type="invalid">
                      *โปรดเลือกชั้น หรืออื่นๆ
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    className="mb-1"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Select
                      placeholder="เลือกห้อง"
                      options={room}
                      value={selectedRoom}
                      onChange={setSelectedRoom}
                      isDisabled={!selectedFloor}
                      className="mt-3"
                    />
                    {/* Hidden input สำหรับ validation */}
                    <Form.Control
                      type="text"
                      required
                      value={selectedRoom ? "ok" : ""}
                      style={{ display: "none" }}
                    />

                    <Form.Control.Feedback type="invalid">
                      *โปรดเลือกห้อง หรืออื่นๆ
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>

                <Form.Group className="mb-1" controlId="">
                  <Form.Label>หมายเหตุ : </Form.Label>
                  <Form.Control
                    name="note_eq"
                    type="text"
                    as="textarea"
                    rows={2}
                    className="color_input"
                    value={formData.note_eq}
                       onChange={handleChange}
                  />
                </Form.Group>
              </section>
            </div>
          </Col>
        </Row>

        <section className="add_section4 shadow-sm">
          <Row>
            <Col>
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="preview"
                  style={{
                    width: "200px",
                    maxHeight: "200px",

                    borderRadius: "8px",
                  }}
                />
              ) : (
                <img
                
                  //  src={`http://localhost:8081/uploads/${formData.upload_image ? formData.upload_image : `noimage.png`}`}
                     src={`${formData.image_url? formData.image_url : noimage}`}
                  // src={formData.upload_image ? formData.upload_image :noimage}
                  //  src={equipment.image_url?equipment.image_url:noimage} 
                  alt="preview"
                  style={{
                    width: "200px",
                    maxHeight: "200px",

                    borderRadius: "8px",
                  }}
                />
              )}
            </Col>

            <Col>
              <Form.Group controlId="formFileSm" className="mb-3">
                <Form.Label>อัพโหลดภาพ</Form.Label>
                <Form.Control
                  type="file"
                  size="sm"
                  name="upload_image"
                  accept="image/*"
                  multiple={false}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput1"
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                feedbackType="invalid"
              >
                <Form.Label>สถานะครุภัณฑ์</Form.Label>
                <div className="mb-3">
                  <Form.Check
                    required
                    label="พร้อมใช้งาน"
                    name="id_status_eq"
                    type="radio"
                    id="status-1"
                    value="USED"
                    checked={formData.id_status_eq === "USED"}
                    onChange={handleChange}
                  />
                  <Form.Check
                    required
                    label="ชำรุด"
                    name="id_status_eq"
                    type="radio"
                    id="status-2"
                    value="BROKE"
                    checked={formData.id_status_eq === "BROKE"}
                    onChange={handleChange}
                  />
                  <Form.Check
                    required
                    label="แจ้งซ่อม"
                    //  name="group1"
                    name="id_status_eq"
                    type="radio"
                    id="status-3"
                    value="REPAIR"
                    checked={formData.id_status_eq === "REPAIR"}
                    onChange={handleChange}
                  />
                  <Form.Check
                    required
                    label="รอจำหน่าย"
                    name="id_status_eq"
                    type="radio"
                    id="status-4"
                    value="DISPOSAL"
                    checked={formData.id_status_eq === "DISPOSAL"}
                    onChange={handleChange}
                  />
                  <Form.Check
                    required
                    label="จำหน่าย"
                    name="id_status_eq"
                    type="radio"
                    id="status-5"
                    value="Disposed"
                    checked={formData.id_status_eq === "Disposed"}
                    onChange={handleChange}
                  />
                </div>
              </Form.Group>
            </Col>
            <Col>
              <div style={{ maxWidth: 400 }}>
                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label> แผนกผู้รับผิดชอบ </Form.Label>
                  <Select
                    placeholder="เลือกแผนก"
                    options={department}
                    value={selectedDepartment}
                    onChange={setSelectedDepartment}
                    isDisabled={!selectedBranch}
                  />
                  {/* Hidden input สำหรับ validation */}
                  <Form.Control
                    type="text"
                    required
                    value={selectedDepartment ? "ok" : ""}
                    style={{ display: "none" }}
                  />

                  <Form.Control.Feedback type="invalid">
                    *โปรดเลือกแผนก
                  </Form.Control.Feedback>
                </Form.Group>
              </div>

              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label> ชื่อผู้ดูแล </Form.Label>
                <Form.Control
                  name="user_eq"
                  value={formData.user_eq}
                  type="text"
                  placeholder=""
                  className="color_input"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
        </section>

        <section>
          <Button
            // onClick={handleSubmit}
            type="submit"
            variant="primary"
            size="lg"
            style={{ margin: "30px" }}
          >
            เพิ่มข้อมูล
          </Button>
        </section>
      </Container>
    </Form>
  );
};



export default EditEqPage;
  
        //{
                // eq_id:res.data.eq_id,
                // name_eq:res.data.name_eq,
                // brand_eq:res.data.brand_eq,
                // detail_eq:res.data.detail_eq,
                // serialNo:res.data.serialNo,
                // fiscal_year:res.data.fiscal_year,
                // order_date:res.data.order_date?new Date(res.data.order_date):null,
                // received_date:res.data.received_date?new Date(res.data.received_date):null,
                // warranty_expire:res.data.warranty_expire?new Date(res.data.warranty_expire):null,
                // company_eq:res.data.company_eq,
                // price_eq:res.data.price_eq,
                // po_eq:res.data.po_eq,
                // id_status_eq:res.data.id_status_eq,
                // note_eq:res.data.note_eq,
                // user_eq:res.data.user_eq,
                // upload_image:res.data.url_image,