import './AppSearch.css'
function AppSearch({value,onValueSearch}) {

    return(
        <div className="app-search">
        <input 
          className="app-search-input"
          type="text"
          placeholder="ค้นหา เลขทะเบียน, ชื่อ, ผู้ดูแล..."
          value={value}
          onChange={(event)=>{onValueSearch(event.target.value)}}/>
    </div>

    );

}

export default AppSearch;