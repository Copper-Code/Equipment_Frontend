import CardComponent from "../components/Card";
import Cardlist from "../components/Cardlist";
import TableDB from "../components/TableDB";
import ButtonToggle from "../components/ButtonToggle";
import { useEffect, useState } from "react";
import AppSearch from "../components/AppSearch";
// import TestFilter from "../components/TestFilter";
import axios from "axios";
// import { set } from "date-fns";
import API_URL from "../src/config";

function EquipmentPage() {
  // ้เลือก View
  const [loading, setLoading] = useState(false);
  const [layoutView, setlayoutView] = useState("card");
  const [keywordSearch, setKeywordSearch] = useState(""); //สำหรับเก็บค่าคำค้นหา
  const [resultSearch, setResultSearch] = useState([]); //สำหรับเก็บผลการค้นหา จาก api
  const EqContainer = {
    display: "grid",
    // border: '2px solid green',
    gridTemplateRows: "auto auto 1fr",
    gridTemplateAreas: `
    "searchEq"
    "toggleEq"
    "contentEq"
  `,
    // height: "100vh",
    width: "100%",
  };
  // const mockData = [
  //   { eq_id: 1, name_eq: "อุปกรณ์ A", brand_eq: "รายละเอียดของอุปกรณ์ A" },
  //   { eq_id: 2, name_eq: "อุปกรณ์ B", brand_eq: "รายละเอียดของอุปกรณ์ B" },
  //   { eq_id: 3, name_eq: "อุปกรณ์ C", brand_eq: "รายละเอียดของอุปกรณ์ C" },
  // ];

  // const filteredData = mockData.filter((item) =>
  //   item.name_eq.toLowerCase().includes(keywordSearch.toLowerCase()),
  // );

  const [dataEquipment, setDataEquipment] = useState([]);
  //function ดึงข้อมูล
  const fetchEquipment = ()=>{
    axios
      .get(`${API_URL}/equipment`)
      .then((res) => {
        console.log(res.data); // เพิ่มตรงนี้
        setDataEquipment(res.data);
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
  }
 

//เรียกใช้function
       useEffect(() => {
        fetchEquipment();
  }, []);


  useEffect(() => {
    if (!keywordSearch.trim()) {
      //.trime() เพื่อตัดช่องว่างที่อาจจะมีในคำค้นหา
      
      setResultSearch([]); //ถ้าไม่มีคำค้นหา ให้เคลียร์ผลการค้นหา
      setLoading(false); //หยุดโหลด
      return;
    }
         setLoading(true); //เริ่มโหลด
    const delay = setTimeout(() => {
      const fetchData = async () => {
        console.log("Welcome to api search");
        try {
          console.log("กำลังค้นหา...", keywordSearch);
 
          let resultSearch = await axios.get(
            `${API_URL}/search?keyword=${keywordSearch}`,
          );
          console.log("Test resultSearch:", resultSearch); // ตรวจสอบผลลัพธ์ที่ได้จาก API

          console.log("ผลการค้นหา : ", resultSearch.data.data);
          setResultSearch(resultSearch.data.data); //เก็บผลการค้นหาไว้ใน state เพื่อส่งต่อไปยัง component ที่แสดงผล
          console.log("resultSearch:", resultSearch);
          console.log("displayData:", displayData);
          console.log("isArray:", Array.isArray(displayData));
          // setKeywordSearch(keyword); //เก็บคำค้นหาไว้ใน state เพื่อส่งต่อไปยัง component ที่แสดงผล
          // setDataSearch(resultSearch.data); //เก็บผลการค้นหาไว้ใน state เพื่อส่งต่อไปยัง component ที่แสดงผล
        } catch (error) {
          console.log("Error fetching search results:", error);
          console.error("Error searching equipment:", error);
        } finally {
          setLoading(false); //จบการโหลด
        }
      };
      fetchData();
    }, 1000); //ดีเลย์ 500ms หลังจากผู้ใช้หยุดพิมพ์
    return () => clearTimeout(delay);
  }, [keywordSearch]);

  const displayData =
    keywordSearch.trim() === "" ? dataEquipment : resultSearch; //ถ้าไม่มีคำค้นหา ให้แสดงข้อมูลทั้งหมด ถ้ามีคำค้นหา ให้แสดงผลการค้นหา

  // Switch สำหรับเลือก View
  const displayView = () => {
    switch (layoutView) {
      case "card":
        // return <CardComponent data={filteredData} />
        return <CardComponent dataSearch={displayData} loading={loading} />;
      case "cardlist":
        return <Cardlist dataSearch={displayData} loading={loading} />;
      case "tabledb":
        return <TableDB dataSearch={displayData} loading={loading} refreshData={fetchEquipment} />;
      default:
        return <CardComponent dataSearch={displayData} loading={loading} />;
    }
  };

  //  const EqSearchStyle = {gridArea:'searchEq',margin: '20px',marginTop:'90px',border: '2px solid blue'}
  const EqToggleStyle = {
    gridArea: "toggleEq",
    margin: "20px",
    display: "flex",
    justifyContent: "right",
  };
  const EqContentStyle = { padding: "20px" };

  return (
    <div className="content-layout">
      <div style={EqContainer}>
        {/* <div style={EqSearchStyle}>Search</div> */}
        <div>
          <AppSearch value={keywordSearch} onValueSearch={setKeywordSearch} />
        </div>
        {/* <h1>Search {keywordSearch}</h1> */}
        <div style={EqToggleStyle}>
          <ButtonToggle setlayoutView={setlayoutView} />
        </div>
        <div style={EqContentStyle}>{displayView()}</div>
      </div>
    </div>
  );
}

export default EquipmentPage;
