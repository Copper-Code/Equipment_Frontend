import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "../src/App.css";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CalendarTH from "../components/CalendarTH";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import API_URL from "../src/config";

const UpdateEqPage = () => {
    //1.ดึง id จาก url
    const{eq_id} = useParams();
    //navigate คือ ฟังก์ชันที่ใช้เปลี่ยนหน้า
    const navigate = useNavigate();
    //State สำหรับเก็ยข้อมูลที่จะแก้ไข
    const [equipment,setEquipment]=useState({
            eq_id: '',
            type_eq_id:'',
            name_eq: '',
            brand_eq: '',
            detail_eq: '',
            serialNo: '',
            fiscal_year: '',
            order_date: '',
            received_date: '',
            warranty_expire: '',
            company_eq: '',
            price_eq: '',
            po_eq: '',
            id_status_eq: '',
            note_eq: '',
            user_eq: '',
            upload_image: '',
            });

    //สถานะการโหลด
    const [isLoading, setIsLoading] = useState(true);
    
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
  const [selectedTypeEquipment, setSelectedTypeEquipment] = useState(null); //

    //2.โหลดข้อมูลเดิมเมื่อเปิดหน้าที่คลิกแก้ไขขึ้นมา
    useEffect(()=>{
        const fetchEditData= async()=>{
          try{
          const [typeEqRes,equipmentRes]= await Promise.all([
            axios.get(`${API_URL}/type_equipment`),
            axios.get(`${API_URL}/edit_equipment/${eq_id}`)
          ]);
          const getEqData=equipmentRes.data;
         
          setTypeEquipment(typeEqRes.data);
          setEquipment({
                eq_id:getEqData.eq_id,  
                name_eq:getEqData.name_eq,
                brand_eq:getEqData.brand_eq,
                // name_hp_branch: res.data[0].name_hp_branch,
                // building_eq: res.data[0].building_eq,
                // floor_eq: res.data[0].floor_eq,
                // id_room: res.data[0].id_room,
                // department_eq: res.data[0].department_eq,
                type_eq_id:getEqData.type_eq_id,
                detail_eq:getEqData.detail_eq,
                serialNo:getEqData.serialNo,
                fiscal_year:getEqData.fiscal_year,
                order_date:getEqData.order_date,
                received_date:getEqData.received_date,
                warranty_expire:getEqData.warranty_expire,
                company_eq:getEqData.company_eq,
                price_eq:getEqData.price_eq,
                po_eq:getEqData.po_eq,
                id_status_eq:getEqData.id_status_eq,
                note_eq:getEqData.note_eq,
                user_eq:getEqData.user_eq,
                upload_image:getEqData.upload_image
          });
          setIsLoading(false);
        }catch(error){
          console.error("Error fetching edit data:", error);
          setIsLoading(false);
        }
      };
      fetchEditData();
    },[eq_id]);
    //ฟังก์ชันอัปเดตค่าเมื่อพิมพ์ใน Input
    const handleInput=(e)=>{
        setEquipment(prev =>({...prev,[e.target.name]:e.target.value}))
    }

//3.ฟังก์ชันบันทึกข้อมูล (update)
    const handleUpdate=async(e)=>{
        e.preventDefault();
      try{
         await axios.put(`${API_URL}/update_equipment/${eq_id}`,equipment);
         console.log(res);
         alert("อัปเดตข้อมูลสำเร็จ !");
         navigate('/equipment')//กลับไปหน้ารายการ
      }catch(error){
        console.error("Update Failed:",error);
      }
    };


//   //ฟังก์ชันจัดการการเปลี่ยนแปลงของฟอร์ม
//   function handleChange(event) {
//     const { name, value, type, files } = event.target;

//     if (type === "file") {
//       // If file input, set the file in state
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         [name]: files[0],
//       }));
//     } else {
//       // Handle text inputs
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         [name]: value,
//       }));
//     }
//   }
 
 
 
  //ดึง type equipment
  useEffect(() => {
    console.log("type equipment | useEffect ประเภทครุภัณฑ์ |");
    axios
      .get(`${API_URL}/type_equipment`)
      .then((res) => {
        console.log(
          "2.type_equipment dropdown | res | ดึงข้อมูลสาขามาแสดงใน dropdown",
          res.data
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
        })
      );
  }, []);




  //ดึงสาขา
  useEffect(() => {
    console.log("1.branch | useEffect สาขา |");
    axios
      .get(`${API_URL}/branch`)
      .then((res) => {
        console.log(
          "2.branch dropdown | res | ดึงข้อมูลสาขามาแสดงใน dropdown",
          res.data
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
        })
      );
  }, []);

  //ดึงแผนกตามสาขา
  useEffect(() => {
    console.log("___________________________________________________");
    console.log("1.Department | useEffect แผนก");
    if (selectedBranch) {
      console.log(
        "2.Department | เลือก | สาขา (selectedBranch)",
        selectedBranch.value
      );
      axios
        .get(`${API_URL}/department/${selectedBranch.value}`)
        .then((res) => {
          console.log(
            "3.dropdown Department | res | ดึงข้อมูลแผนก → สาขาที่เลือก",
            res.data
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
          })
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
        selectedBranch.value
      );
      axios
        .get(`${API_URL}/building/${selectedBranch.value}`)
        .then((res) => {
          console.log(
            "3.dropdown building | res | ดึงข้อมูลอาคาร → สาขาที่เลือก",
            res.data
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
          })
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
            res.data
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
          })
        );
      setSelectedFloor(null);
      setSelectedRoom(null);

      setRoom([]);
    }
  }, [selectedBuilding]);

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
            res.data
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
          })
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

  //ดึงแผนกตามสาขา
  useEffect(() => {
    console.log("___________________________________________________");
    if (selectedDepartment) {
      console.log(selectedDepartment);
      console.log("แสดง id แผนก", selectedDepartment.value);
      console.log("แสดงชื่อ แผนกที่เลือก", selectedDepartment.label);
    }
  }, [selectedDepartment]);

  const [equipmentList, setEquipmentList] = useState([]); //เก็บข้อมูลที่เพิ่ม
  // const [addEquipment,setaddEquipment] = useState([])

  //  //----------------------------------------
  // ฟังก์ชันดึงข้อมูลครุภัณฑ์

  const fetchEquipment = () => {
    axios
      .get(`${API_URL}/equipment`)
      .then((res) => setEquipmentList(res.data))
      .catch((err) =>
        console.error({ message: "เกิดข้อผิดพลาดในการดึงข้อมูล @Eq" + err })
      );
  };
  // เรียกใช้ฟังก์ชัน fetchEquipment เมื่อคอมโพเนนต์ถูกโหลด
  useEffect(() => {
    fetchEquipment();
  }, []);


      
  return (
 
    <> {isLoading ? <div>Loading...</div> : null}
     <Container style={{ marginTop: "50px", marginBottom: "50px" }} onSubmit={handleUpdate}>
        <Row>
          <Col>
            <Form>
              <div className="add_ss1">ข้อมูลครุภัณฑ์</div>
              <section className="add_section1 shadow-sm">
                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                     <Form.Control
                      type="text"
                      placeholder={equipment.eq_id}
                      aria-label="Disabled input example"
                      disabled
                      readOnly
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
                    value={equipment.name_eq}
                    onChange={handleInput}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label> ประเภท </Form.Label>
                  <Select
                    placeholder="เลือกประเภท"
                    options={type_equipment}
                    value={selectedTypeEquipment}
                    onChange={(value)=>
                      setSelectedTypeEquipment(value)
                     
                    }
                  />
                </Form.Group>
                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label> ยี่ห้อ/แบรนด์/รุ่น </Form.Label>
                  <Form.Control
                    type="text"
                    name="brand_eq"
                    value={equipment.brand_eq}
                    placeholder=""
                    className="color_input"
                    onChange={handleInput}
                  />
                </Form.Group>

                <Form.Group className="mb-1" controlId="">
                  <Form.Label>รายละเอียด</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="detail_eq"
                    value={equipment.detail_eq}
                    className="color_input"
                    onChange={handleInput}
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
                    value={equipment.serialNo}
                    onChange={handleInput}
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
                    value={equipment.price_eq}
                    className="color_input"
                    onChange={handleInput}
                  />
                </Form.Group>
              </section>
            </Form>
          </Col>

          <Col>
            <Form>
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
                    value={equipment.fiscal_year}
                    placeholder=""
                    className="color_input"
                    onChange={handleInput}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label> วันที่สั่งซื้อ</Form.Label>
                  <CalendarTH
                    value={equipment.order_date}
                    onChange={(date) =>
                      setFormData({ ...formData, order_date: date })
                    }
                  />
                </Form.Group>

                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label> วันที่ตรวจรับ</Form.Label>
                  <CalendarTH
   
                    value={equipment.order_date}
                    onChange={(date) =>
                      setFormData({ ...formData, order_date: date })
                    }
                  />
                </Form.Group>

                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>วันที่หมดประกัน</Form.Label>
                  <CalendarTH

                    value={equipment.order_date}
                    onChange={(date) =>
                      setFormData({ ...formData, order_date: date })
                    }
                  />
                </Form.Group>

                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>PO</Form.Label>
                  <Form.Control
                    name="po_eq"
                    value={equipment.po_eq}
                    type="text"
                    placeholder=""
                    className="color_input"
                    onChange={handleInput}
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
                    value={equipment.company_eq}
                    onChange={handleInput}
                  />
                </Form.Group>
                
              </section>
            </Form>
          </Col>

          <Col>
            <Form>
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
                      options={branch}
                      value={selectedBranch}
                      onChange={setSelectedBranch}
                    />
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
                  </Form.Group>
                </div>
                <Form.Group className="mb-1" controlId="">
                  <Form.Label>หมายเหตุ : </Form.Label>
                  <Form.Control
                    name="note_eq"
                    as="textarea"
                    rows={2}
                    className="color_input"
                    onChange={handleInput}
                  />
                </Form.Group>
              </section>
            </Form>
          </Col>
        </Row>

        <section className="add_section4 shadow-sm">
          <Row>
            <Col>
              <Form.Group controlId="formFileSm" className="mb-3">
                <Form.Label>อัพโหลดภาพ</Form.Label>
                <Form.Control
                  type="file"
                  size="m"
                  name="upload_image"
                  accept="image/*"
                  multiple={false}
                  onChange={handleInput}

                />
              </Form.Group>
            </Col>
            <Col>


        </Col>

            <Col>
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>สถานะครุภัณฑ์</Form.Label>
                <div className="mb-3">
                  <Form.Check
                    label="พร้อมใช้งาน"
           
                    name="id_status_eq"
                    type="radio"
                    id="status-1"
                    value="USED"
                    checked={equipment.id_status_eq === "USED"}
                    onChange={handleInput}
                  
                  />
                  <Form.Check
                    label="ชำรุด"
                    //  name="group1"
                    name="id_status_eq"
                    type="radio"
                    id="status-2"
                    value="BROKE"
                    checked={equipment.id_status_eq === "BROKE"}
                    onChange={handleInput}
                
                  />
                  <Form.Check
                    label="แจ้งซ่อม"
                    //  name="group1"
                    name="id_status_eq"
                    type="radio"
                    id="status-3"
                    value="REPAIR"
                    checked={equipment.id_status_eq === "REPAIR"}
                    onChange={handleInput}
                  
                  />
                  <Form.Check
                    label="รอจำหน่าย"
                    //  name="group1"
                    name="id_status_eq"
                    type="radio"
                    id="status-4"
                    value="DISPOSAL"
                    checked={equipment.id_status_eq === "DISPOSAL"}
                    onChange={handleInput}
               
                  />
                  <Form.Check
                    label="จำหน่าย"
                    name="id_status_eq"
                    //  name="group1"
                    type="radio"
                    id="status-5"
                    value="Disposed"
                    checked={equipment.id_status_eq === "Disposed"}
                    onChange={handleInput}
                   
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
                </Form.Group>
              </div>

              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label> ชื่อผู้ดูแล </Form.Label>
                <Form.Control
                  name="user_eq"
                  value={equipment.user_eq}
                  type="text"
                  placeholder=""
                  className="color_input"
                  onChange={handleInput}

                />
              </Form.Group>
            </Col>
          </Row>
        </section>

        <section>
          <Button
            onClick={handleUpdate}
            variant="primary"
            size="lg"
            style={{ margin: "30px" }}
          >
            อัปเดตข้อมูล
          </Button>
        </section>
      </Container>
     
    </>
    
  );
};


export default UpdateEqPage;
