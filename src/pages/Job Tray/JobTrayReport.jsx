// import { Grid, Stack } from "@mui/material";
// import SavexLogo from "../../assets/savexLogo.svg";
// import firebolttLogo from "../../assets/firebolttLogo.png";
// import "./jobTrayReport.css"; // Make sure to uncomment this import if you're using an external CSS file
// // import BarCodeGenerator from "../../components/BarCodeGenerator/BarCodeGenerator";
// import Table from "@mui/joy/Table";
// import Sheet from "@mui/joy/Sheet";
// import { Button } from "react-bootstrap";
// import { width } from "@mui/system";
// const cells = [
//   "S.No",
//   "Jobsheet No.",
//   "Model Name",
//   "Part Code",
//   "Customer Reported Fault",
//   "Engineer Remark",
// ];

// const rows = [
//   ["xxxx", "xxxx", "xxxx", "xxxx", "xxxx", "xxxx", "xxxx", "xxxx"],
//   ["xxxx", "xxxx", "xxxx", "xxxx", "xxxx", "xxxx", "xxxx", "xxxx"],
//   ["xxxx", "xxxx", "xxxx", "xxxx", "xxxx", "xxxx", "xxxx", "xxxx"],
//   ["xxxx", "xxxx", "xxxx", "xxxx", "xxxx", "xxxx", "xxxx", "xxxx"],
//   ["xxxx", "xxxx", "xxxx", "xxxx", "xxxx", "xxxx", "xxxx", "xxxx"],
//   ["xxxx", "xxxx", "xxxx", "xxxx", "xxxx", "xxxx", "xxxx", "xxxx"],
//   ["xxxx", "xxxx", "xxxx", "xxxx", "xxxx", "xxxx", "xxxx", "xxxx"],
// ];
// const JobTrayReport = () => {
//   const val = 134141411341;
//   return (
//     <>
//       <Grid container className="container">
//         <Grid item xs={12}>
//           <Grid container justifyContent="space-between" alignItems="center">
//             <Grid item>
//               <img src={SavexLogo} alt="Company Logo" className="companyLogo" />
//             </Grid>
//             <Grid item>
//               <img
//                 src={firebolttLogo}
//                 alt="Fireboltt Logo"
//                 className="firebolttLogo"
//               />
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid container spacing={5} justifyContent={"center"}>
//         <Grid item sx={{ justifyContent: "center", alignContent: "center" }}>
//           <h6>Jobsheet No : {val}</h6>
//         </Grid>
//         <Grid item>
//           <h6>barcode: </h6>
//         </Grid>
//         {/* <BarCodeGenerator/> */}
//       </Grid>
//       <Grid container spacing={5} justifyContent={"space-between"}>
//         <Grid item>
//           <h6>Date : 01-01-2022</h6>
//         </Grid>
//         <Grid item>
//           <h6>Service Center : xxxxxx</h6>
//         </Grid>
//         <Grid item>
//           <h6> Engineer : xxxxxx</h6>
//         </Grid>
//       </Grid>
//       <Grid conainter sx={{ width: "100%", justifyContent: "center" }}>
//         <Sheet variant="outlined" borderAxis="both">
//           <Table
//             sx={{ minWidth: 650, backgroundColor: "#fff" }}
//             variant="soft"
//             borderAxis="bothBetween"
//           >
//             <thead>
//               <tr>
//                 {/* <th style={{ width: "40%" }}>Column width (40%)</th> */}
//                 {cells.map((cell, index) => (
//                   <th key={index}>{cell}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {[1, 2, 3, 4, 5, 6].map((row, index) => (
//                 <tr key={index}>
//                   <td>xxxx</td>
//                   <td>xxxx</td>
//                   <td>xxxx</td>
//                   <td>xxxx</td>
//                   <td>xxxx</td>
//                   <td>xxxx</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Sheet>
//       <Stack>
//         <Button variant="contained"> just print me...😉😉</Button>
//       </Stack>
//       </Grid>
//     </>
//   );
// };

// export default JobTrayReport;


import { useRef } from "react";
import { Grid, Stack } from "@mui/material";
import SavexLogo from "../../assets/savexLogo.svg";
import firebolttLogo from "../../assets/firebolttLogo.png";
import "./jobTrayReport.css"; // Make sure to uncomment this import if you're using an external CSS file
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import { Button } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import BarCodeGenerator from "../../components/BarCodeGenerator/BarCodeGenerator";

const cells = [
  "S.No",
  "Jobsheet No.",
  "Model Name",
  "Part Code",
  "Customer Reported Fault",
  "Engineer Remark",
];

const rows = [
  ["xxxx", "xxxx", "xxxx", "xxxx", "xxxx", "xxxx"],
  ["xxxx", "xxxx", "xxxx", "xxxx", "xxxx", "xxxx"],
  ["xxxx", "xxxx", "xxxx", "xxxx", "xxxx", "xxxx"],
  ["xxxx", "xxxx", "xxxx", "xxxx", "xxxx", "xxxx"],
  ["xxxx", "xxxx", "xxxx", "xxxx", "xxxx", "xxxx"],
  ["xxxx", "xxxx", "xxxx", "xxxx", "xxxx", "xxxx"],
  ["xxxx", "xxxx", "xxxx", "xxxx", "xxxx", "xxxx"],
];

const JobTrayReport = () => {
  const val = 134141411341;
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div ref={componentRef}>
        <Grid container className="container">
          <Grid item xs={12}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <img src={SavexLogo} alt="Company Logo" className="companyLogo" />
              </Grid>
              <Grid item>
                <img
                  src={firebolttLogo}
                  alt="Fireboltt Logo"
                  className="firebolttLogo"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={5} justifyContent={"center"}>
          <Grid item sx={{ justifyContent: "center", alignContent: "center" }}>
            <h6>Jobsheet No : {val}</h6>
          </Grid>
          <Grid item>
            {/* <h6>barcode: </h6> */}
            <BarCodeGenerator/>
          </Grid>
        </Grid>
        <Grid container spacing={5} justifyContent={"space-between"}>
          <Grid item>
            <h6>Date : 01-01-2022</h6>
          </Grid>
          <Grid item>
            <h6>Service Center : xxxxxx</h6>
          </Grid>
          <Grid item>
            <h6> Engineer : xxxxxx</h6>
          </Grid>
        </Grid>
        <Grid container sx={{ width: "100%", justifyContent: "center" }}>
          <Sheet variant="outlined" borderAxis="both">
            <Table
              sx={{ minWidth: 650, backgroundColor: "#fff" }}
              variant="soft"
              borderAxis="bothBetween"
            >
              <thead>
                <tr>
                  {cells.map((cell, index) => (
                    <th key={index}>{cell}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Sheet>
        </Grid>
      </div>
      <Stack>
        <Button onClick={handlePrint} variant="contained">
          Just print me...😉😉
        </Button>
      </Stack>
    </>
  );
};

export default JobTrayReport;
