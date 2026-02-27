import React from 'react';
import {Route,createBrowserRouter,createRoutesFromElements,RouterProvider} from "react-router-dom";
import MainLayout from '../layouts/MainLayout';
import DashboardPage from '../pages/DashboardPage';
import EquipmentPage from '../pages/EquipmentPage';
import AddEquipmentPage from '../pages/AddEquipmentPage';
import MaintainPage from '../pages/MaintainPage';
import SettingPage from '../pages/SettingPage';
import NotFoundPage from '../pages/NotFoundPage';
// import UpdateEqPage from '../pages/updateEqPage';
import EditEqPage from '../pages/EditEqPage';

const App = () => {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<MainLayout/>}>
        <Route index element={<DashboardPage/>}/>
        <Route path="equipment" element={<EquipmentPage/>}/>
        <Route path="add_equipment" element={<AddEquipmentPage/>}/>
        <Route path="maintain" element={<MaintainPage/>}/>
        <Route path="settings" element={<SettingPage/>}/>
        <Route path="edit/:eq_id" element={<EditEqPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
        </Route>
        )
    );
  return <RouterProvider router={router}/>
  
};

export default App







// import { useState } from 'react'
// import './App.css'
// import './index.css'
// import Navbar from '../components/Navbar'

// function App() {
   
//    //true = dark mode
//    //false = light mode
//    // ⬇ ดึงค่าจาก localStorage หรือเริ่มต้นเป็น false
//   const [isDark, setIsDark] = useState(()=>{
//             //savedTheme
//             const savedTheme = localStorage.getItem('isDark');
//             return savedTheme === 'true'; //ต้องเทียบกับ สตริง 'true' 
//   });
//   const toggleTheme = () =>{
//             const newTheme = !isDark; // สลับค่าจาก true -> false หรือ false -> true
//             setIsDark(newTheme); // เปลี่ยนสถานะธีมทันที
//             localStorage.setItem('isDark',newTheme);// บันทึกลง localStorage เพื่อให้จดจำได้หลังรีโหลด
//   };
//   return (
    
//     <>
//     <header className={isDark?'dark-theme':'' }>
//       <Navbar isDark={isDark} toggleTheme={toggleTheme}/> 
//     </header>
//     <body>
//       <div>Hello</div>
//     </body>
//  </>
//   );
// }

// export default App




// /**NOTE 
//  * 
//  * 
//  * useState(() => { ... }) จะรันตอน App โหลดครั้งแรก เพื่อเช็ค localStorage ว่ามี isDark หรือไม่

// ถ้า isDark เป็น "true" → useState ได้ค่า true → ใช้ dark theme

// ถ้ามีการคลิกปุ่ม toggle ใน Navbar → toggleTheme() ถูกเรียก

// toggleTheme สลับค่าธีม (true/false) และ:

// setIsDark(newTheme) → ทำให้ UI เปลี่ยน

// localStorage.setItem(...) → เก็บไว้ใช้ครั้งหน้



// */