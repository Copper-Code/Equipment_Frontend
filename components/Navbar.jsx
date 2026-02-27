
import { useState,useRef } from 'react';
import { NavLink } from "react-router-dom";
import '../src/index.css';
import '../components/Navbar.css'
function Navbar({isDark,toggleTheme} ) {

/*เขียน script สั่งให้ ui ตอบสนองตามคำสั่ง */
 const [navclick, setNavclick] = useState(false);
//   // ฟังก์ชัน toggle แยกออกจาก JSX
//   const callapNav = () => {
//     setNavclick(!navclick);
//   };
const searchInputRef = useRef(null); // ประกาศ ref

     
  return (
<>
{/* slidebar */}
{/* site navbar */}
   <nav className="site-nav">
    <button  onClick={()=>setNavclick(!navclick)} className="sidebar-toggle">
    <span className="material-symbols-outlined">menu</span>
    </button>
   </nav>
   
   
   <aside className={`sidebar ${navclick? "collapsed":""}`}>
            <header className="sidebar-header">
                <img src ={isDark? "logoDarkmode.png" : "logo.png"}  alt="CopperCode" className="header-logo" />
                    <button  onClick={()=>setNavclick(!navclick)} className="sidebar-toggle">
                            <span className="material-symbols-outlined">chevron_left</span>
                    </button>
             </header>

   <div className='sidebar-content'>

     {/* search form */}
     <form action="#" className="search-form" 
            onClick={() => {
                  if (navclick==true) {
                  setNavclick(false);
                  setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }}
  >
        <span className="material-symbols-outlined">search</span>
       
        <input 
        ref={searchInputRef}  
        type="search" 
        placeholder="Search..." 
        required
/>
     </form>
    
    {/* Menu list */}
    <ul className="menu-list">
        <li className="menu-item">
           <NavLink  to ="/" className="menu-link active">
                <span className="material-symbols-outlined">dashboard</span>
                <span className="menu-label">Dashboard</span>
           </NavLink>
        </li>
 
        <li className="menu-item">
           <NavLink to ="/equipment" className="menu-link">
                <span className="material-symbols-outlined">description</span>
                <span className="menu-label">ทะเบียนครุภัณฑ์</span>
           </NavLink>
        </li>

        <li className="menu-item">
           <NavLink to = "/add_equipment" className="menu-link">
                <span className="material-symbols-outlined">add_box</span>
                <span className="menu-label">จัดการครุภัณฑ์</span>
           </NavLink>
        </li>
 

        <li className="menu-item">
           <NavLink to = "/maintain" className="menu-link">
                <span className="material-symbols-outlined">notifications</span>
                <span className="menu-label">แจ้งซ่อม</span>
           </NavLink>
        </li>



        <li className="menu-item">
           <NavLink to = "/settings" className="menu-link">
                <span className="material-symbols-outlined">settings</span>
                <span className="menu-label">ตั้งค่าและจัดการสิทธิ์</span>
           </NavLink>
        </li>
    </ul>
   </div>  {/* ปิด sider content  */}
       {/* Sidebar Footer */}
    <div className="sidebar-footer">
        <button className="theme-toggle" onClick={toggleTheme}>
            <div className="theme-label">
                <span className="theme-icon material-symbols-outlined">{isDark ? "light_mode" : "dark_mode"}
</span>
                 <span className="theme-text">{isDark ?  "Light Mode": "Dark Mode"}
</span>
            </div>
            <div className="theme-toggle-track">
                <div className="theme-toggle-indicator"></div>
            </div>
        </button>
    </div> {/*ปิด sidebar Footer*/}
   </aside>



</>    
  )
}

export default Navbar