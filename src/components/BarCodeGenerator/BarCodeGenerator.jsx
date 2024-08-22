// import React, { useRef, useState } from "react";
// import { ReactBarcode } from "react-jsbarcode";
// // import { useReactToPrint } from 'react-to-print';
// import ZebraBrowserPrintWrapper from "zebra-browser-print-wrapper";

// const BarCodeGenerator = () => {
//   const [value, setValue] = useState("");
//   const [barcodeValue, setBarcode] = useState("");
//   // const componentRef = useRef();

//   const handleChange = (e) => {
//     setValue(e.target.value);
//   };

//   const generateBarcode = () => {
//     setBarcode(value);
//     console.log(value);
//   };

//   // const handlePrint = useReactToPrint({
//   //   content: () => componentRef.current,
//   // });

//   // const printBarcode = async (serial) => {
//   //   try {
//   //     const browserPrint = new ZebraBrowserPrintWrapper();
//   //     // console.log(browserPrint);
//   //     const defaultPrinter = await browserPrint.getDefaultPrinter();
//   //     console.log(typeof(defaultPrinter));
//   //     browserPrint.setPrinter(defaultPrinter);
//   //     const printerStatus = await browserPrint.checkPrinterStatus();
//   //     console.log(`printer status ${printerStatus}`);
//   //     if (printerStatus.isReadyToPrint) {
//   //       const zpl = `^XA
//   //                   ^BY2,2,100
//   //                   ^FO20,20^BC^FD${serial}^FS
//   //                   ^XZ`;

//   //       browserPrint.print(zpl);
//   //       console.log(`in try`)
//   //     } else {
//   //       console.log("Error/s", printerStatus.errors);
//   //       console.log(`catch`)
//   //     }
//   //   } catch (error) {
//   //     console.error("Print job failed-----", error);
//   //   }
//   // };

//   // const printBarcode = async (serial) => {
//   //   try {
//   //     const browserPrint = new ZebraBrowserPrintWrapper();
//   //     const defaultPrinter = await browserPrint.getDefaultPrinter();
//   //     browserPrint.setPrinter(defaultPrinter);
//   //     const printerStatus = await browserPrint.checkPrinterStatus();

//   //     if (printerStatus.isReadyToPrint) {
//   //       const zpl = `^XA
//   //                   ^BY2,2,100
//   //                   ^FO20,20^BC^FD${serial}^FS
//   //                   ^XZ`;

//   //       await browserPrint.print(zpl);
//   //       console.log("Print job successful");
//   //     } else {
//   //       console.log("Printer not ready to print", printerStatus.errors);
//   //     }
//   //   } catch (error) {
//   //     if (error instanceof TypeError) {
//   //       console.error("Network error:", error.message);
//   //     } else {
//   //       console.error("Print job failed:", error);
//   //     }
//   //   }
//   // };

//   // const printBarcode = async (serial) => {
//   //   try {
//   //     const browserPrint = new ZebraBrowserPrintWrapper();
//   //     console.log('Initialized ZebraBrowserPrintWrapper:', browserPrint);

//   //     const defaultPrinter = await browserPrint.getDefaultPrinter();
//   //     console.log('Default Printer:', defaultPrinter);

//   //     if (!defaultPrinter) {
//   //       throw new Error("There's no default printer");
//   //     }

//   //     browserPrint.setPrinter(defaultPrinter);
//   //     const printerStatus = await browserPrint.checkPrinterStatus();
//   //     console.log('Printer Status:', printerStatus);

//   //     if (printerStatus.isReadyToPrint) {
//   //       const zpl = `^XA
//   //                   ^BY2,2,100
//   //                   ^FO20,20^BC^FD${serial}^FS
//   //                   ^XZ`;

//   //       await browserPrint.print(zpl);
//   //       console.log("Print job successful");
//   //     } else {
//   //       console.log("Printer not ready to print", printerStatus.errors);
//   //     }
//   //   } catch (error) {
//   //     if (error instanceof TypeError) {
//   //       console.error("Network error:", error.message);
//   //     } else {
//   //       console.error("Print job failed:", error);
//   //     }
//   //   }
//   // };

//   const printBarcode = async (serial) => {
//     try {
//       const browserPrint = new ZebraBrowserPrintWrapper();
//       console.log('Initialized ZebraBrowserPrintWrapper:', browserPrint);

//       // Get available printers
//       const printers = await browserPrint.getAvailablePrinters();
//       console.log('Available Printers:', printers);

//       // If no printers are found, throw an error
//       if (!printers || printers.length === 0) {
//         throw new Error("No printers found");
//       }

//       // Select the first printer from the available printers
//       const defaultPrinter = printers[0];
//       console.log('Default Printer:', defaultPrinter);

//       browserPrint.setPrinter(defaultPrinter);
//       const printerStatus = await browserPrint.checkPrinterStatus();
//       console.log('Printer Status:', printerStatus);

//       if (printerStatus.isReadyToPrint) {
//         // Define the ZPL code for printing
//         const zpl = `^XA
//                     ^FO50,50^BY2^BCN,100,Y,N,N
//                     ^FD${serial}^FS
//                     ^XZ`;
//         console.log("ZPL to be sent:", zpl);

//         // Send the print job
//         await browserPrint.print(zpl);
//         console.log("Print job successful");
//       } else {
//         console.log("Printer not ready to print", printerStatus.errors);
//       }
//     } catch (error) {
//       if (error instanceof TypeError) {
//         console.error("Network error:", error.message);
//       } else {
//         console.error("Print job failed:", error);
//       }
//     }
//   };

//   const handlePrint = () => {
//     if (barcodeValue) {
//       printBarcode(barcodeValue);
//     }
//     console.log(barcodeValue);
//   };

//   return (
//     <div style={{ textAlign: "center" }}>
//       <h2>Barcode Generator</h2>
//       <div>
//         <input
//           type="text"
//           value={value}
//           onChange={handleChange}
//           style={{ marginBottom: "10px", padding: "5px",background:'#fff', color:'#000' }}
//         />
//         <br />
//         <button onClick={generateBarcode} style={{ padding: "5px 10px" }}>
//           Generate Barcode
//         </button>
//         {barcodeValue && (
//           <>
//             <div id="barcode" style={{ marginTop: "20px" }}>
//               <ReactBarcode value={barcodeValue} format="CODE39" />
//             </div>
//             <button
//               onClick={handlePrint}
//               style={{ padding: "5px 10px", marginTop: "10px" }}
//             >
//               Print Barcode
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BarCodeGenerator;

// // import React, { useState } from "react";
// // import { ReactBarcode } from "react-jsbarcode";
// // import ZebraBrowserPrintWrapper from "zebra-browser-print-wrapper";
// // import axios from 'axios'; // Import Axios
// // import ProxyComponent from "./ProxyComponent"; // Adjust path as necessary

// // const BarCodeGenerator = () => {
// //   const [value, setValue] = useState("");
// //   const [barcodeValue, setBarcode] = useState("");

// //   const handleChange = (e) => {
// //     setValue(e.target.value);
// //   };

// //   const generateBarcode = () => {
// //     setBarcode(value);
// //     console.log(value);
// //   };

// //   const printBarcode = async (serial) => {
// //     try {
// //       const browserPrint = new ZebraBrowserPrintWrapper();
// //       const defaultPrinter = await browserPrint.getDefaultPrinter();
// //       browserPrint.setPrinter(defaultPrinter);
// //       const printerStatus = await browserPrint.checkPrinterStatus();

// //       if (printerStatus.isReadyToPrint) {
// //         const zpl = `^XA
// //                     ^BY2,2,100
// //                     ^FO20,20^BC^FD${serial}^FS
// //                     ^XZ`;

// //         await browserPrint.print(zpl);
// //         console.log("Print job successful");
// //       } else {
// //         console.log("Printer not ready to print", printerStatus.errors);
// //       }
// //     } catch (error) {
// //       if (error instanceof TypeError) {
// //         console.error("Network error:", error.message);
// //       } else {
// //         console.error("Print job failed:", error);
// //       }
// //     }
// //   };

// //   const handlePrint = () => {
// //     if (barcodeValue) {
// //       printBarcode(barcodeValue);
// //     }
// //     console.log(barcodeValue);
// //   };

// //   return (
// //     <div style={{ textAlign: "center" }}>
// //       <h2>Barcode Generator</h2>
// //       <div>
// //         <input
// //           type="text"
// //           value={value}
// //           onChange={handleChange}
// //           style={{ marginBottom: "10px", padding: "5px", background: "#fff", color: "#000" }}
// //         />
// //         <br />
// //         <button onClick={generateBarcode} style={{ padding: "5px 10px" }}>
// //           Generate Barcode
// //         </button>
// //         {barcodeValue && (
// //           <>
// //             <div id="barcode" style={{ marginTop: "20px" }}>
// //               <ReactBarcode value={barcodeValue} format="CODE39" />
// //             </div>
// //             <button onClick={handlePrint} style={{ padding: "5px 10px", marginTop: "10px" }}>
// //               Print Barcode
// //             </button>
// //           </>
// //         )}
// //         {/* ProxyComponent integration */}
// //         <div style={{ marginTop: "20px" }}>
// //           <h3>Fetch Data Example:</h3>
// //           <ProxyComponent url="http://localhost:9100/default" />
// //           {/* Replace with your actual endpoint URL */}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BarCodeGenerator;


import { useEffect, useState } from "react";
import { ReactBarcode } from "react-jsbarcode";
import ZebraBrowserPrintWrapper from "zebra-browser-print-wrapper";

const BarCodeGenerator = ({ value, shouldPrint, onPrintComplete }) => {
  const [barcodeValue, setBarcodeValue] = useState("");

  const printBarcode = async (serial) => {
    console.log("value",serial)
    try {
      const browserPrint = new ZebraBrowserPrintWrapper();
      const printers = await browserPrint.getAvailablePrinters();

      if (!printers || printers.length === 0) {
        throw new Error("No printers found");
      }

      const defaultPrinter = printers[0];
      browserPrint.setPrinter(defaultPrinter);
      const printerStatus = await browserPrint.checkPrinterStatus();

      if (printerStatus.isReadyToPrint) {
        const zpl = `^XA
        ^FO50,50
        ^BY3,3,180
        ^BCN,180,Y,N,N
        ^FD${serial}^FS
        ^FO120,240
        ^A0N,80,80
        ^FB360,1,0,C
        ^FS
        ^XZ`;

        await browserPrint.print(zpl);
        console.log("Print job sent successfully");
        onPrintComplete();
      } else {
        console.log("Printer not ready to print", printerStatus.errors);
      }
    } catch (error) {
      if (error instanceof TypeError) {
        console.error("Network error:", error.message);
      } else {
        console.error("Print job failed:", error);
      }
    }
  };

  useEffect(() => {
    if (value && value.trim() !== "" && shouldPrint) {
      setBarcodeValue(value);
      printBarcode(value);
    }
  }, [value, shouldPrint]);

  return (
    <div id="barcode" style={{ marginTop: "20px" }}>
      {barcodeValue ? (
        <ReactBarcode value={barcodeValue} format="CODE39" />
      ) : (
        <p>Invalid barcode value</p>
      )}
    </div>
  );
};


export default BarCodeGenerator;


