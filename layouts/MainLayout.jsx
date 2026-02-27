import { useState } from 'react';
import '../src/index.css';

import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
function MainLayout() {
   
   //true = dark mode
   //false = light mode
   // ⬇ ดึงค่าจาก localStorage หรือเริ่มต้นเป็น false
  const [isDark, setIsDark] = useState(()=>{
            //savedTheme
            const savedTheme = localStorage.getItem('isDark');
            return savedTheme === 'true'; //ต้องเทียบกับ สตริง 'true' 
  });
  const toggleTheme = () =>{
            const newTheme = !isDark; // สลับค่าจาก true -> false หรือ false -> true
            setIsDark(newTheme); // เปลี่ยนสถานะธีมทันที
            localStorage.setItem('isDark',newTheme);// บันทึกลง localStorage เพื่อให้จดจำได้หลังรีโหลด
  };
  return (
    
 
        <div className={`app-container ${isDark?'dark-theme':'' }`}>
          <div className='nav-layout'>
               <Navbar isDark={isDark} toggleTheme={toggleTheme}/></div>
                    <main className='content-layout'><Outlet/></main>
          </div>   

  );
}

export default MainLayout




/**NOTE 
 * 
 * 
 * useState(() => { ... }) จะรันตอน App โหลดครั้งแรก เพื่อเช็ค localStorage ว่ามี isDark หรือไม่

ถ้า isDark เป็น "true" → useState ได้ค่า true → ใช้ dark theme

ถ้ามีการคลิกปุ่ม toggle ใน Navbar → toggleTheme() ถูกเรียก

toggleTheme สลับค่าธีม (true/false) และ:

setIsDark(newTheme) → ทำให้ UI เปลี่ยน

localStorage.setItem(...) → เก็บไว้ใช้ครั้งหน้



*/