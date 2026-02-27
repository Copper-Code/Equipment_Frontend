import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV2';
import { th } from 'date-fns/locale'
// import { useState } from 'react'

export default function CalendarTH({value, onChange}) {

  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={th}>
      <MobileDatePicker
        format="dd/MM/yyyy"
        value={value}
        onChange={onChange}
        slotProps={{
        textField: {size: "small"},
        actionBar: { actions: ['clear','today','cancel','accept'] },
      }}
      sx={{width: "100%",fontSize: "14px",}}
      />
    </LocalizationProvider>

    </>
  )


}




//อันที่ 1

// import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV2';
// import { th } from 'date-fns/locale'
// import { useState } from 'react'

// export default function CalendarTH() {
//   const [value, setValue] = useState<Date | null>(null)
//   const dateOBJ = value;
//   const formatDate = dateOBJ?.toLocaleDateString('en-GB');

//   console.log("_________________________________________")
//   console.log("Test วันที่ที่เลือก", formatDate);
//   return (
//     <>
//     <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={th}>
//       <MobileDatePicker
//         format="dd/MM/yyyy"
//         value={value}
//         // disablePast
//        onChange={(newValue: Date | null) => setValue(newValue)}
//       slotProps={{
//         textField: {size: "small"},
//         actionBar: { actions: ['clear','today','cancel','accept'] },
//       }}
//       sx={{width: "100%",fontSize: "14px",}}
//       />
//     </LocalizationProvider>

//     </>
//   )
  
// }













// import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
// import OverrideDateBE from '../src/OverrideDateBE';
// // import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV2';
// // import { th } from 'date-fns/locale'
// // import { useState } from 'react'
// import dayjs from 'dayjs';
// import React from 'react';

// export default function CalendarTH() {
//   const [value, setValue] = React.useState(dayjs());
//   return (
//     <LocalizationProvider dateAdapter={OverrideDateBE}>
//       <MobileDatePicker
//         format="dd/MM/yyyy"
//         value={value}
//         disablePast
//         onChange={(newValue) => setValue(newValue as any)}

//       slotProps={{
//         textField: {size: "small"},
//         actionBar: { actions: ['clear','today','cancel','accept'] },
//       }}
//       sx={{width: "100%",fontSize: "14px",}}
//       />
//     </LocalizationProvider>
//   )
//  }







// import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
// import AdapterDateFns from 'date-fns-buddhist-adapter'
// import { th } from 'date-fns/locale'
// import { useState } from 'react'

// export default function Home() {
//   const [value, setValue] = useState(new Date())

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={th}>
//       <MobileDatePicker
//         format="dd MMM yyyy"
//         defaultValue={value}
//         disablePast
//         onChange={(newValue: Date | null) => {
//           if (!newValue) return
//           setValue(newValue)
//         }}
//       />
//     </LocalizationProvider>
//   )
// }