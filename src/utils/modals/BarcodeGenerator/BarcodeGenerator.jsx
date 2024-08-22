// BarcodeGenerator.jsx
import { useRef, useEffect } from "react";
import JsBarcode from "jsbarcode";
import './barcodegen.css';
import printIcon  from "../../../assets/printIcon.svg"

const BarcodeGenerator = ({ value }) => {
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (barcodeRef.current && value) {
      JsBarcode(barcodeRef.current, value, {
        format: "CODE128",
        displayValue: true,
      });
    }
  }, [value]);

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=500,width=800');
    const svgData = barcodeRef.current.outerHTML;
    printWindow.document.write('<html><head><title>Print Barcode</title>');
    printWindow.document.write('</head><body >');
    printWindow.document.write(svgData);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="barcode-container">
      <svg ref={barcodeRef}></svg>
      <button className="print-btn" onClick={handlePrint}>
        <img src={printIcon} alt="Print" /> {/* Replace with your print icon path */}
      </button>
    </div>
  );
};

export default BarcodeGenerator;
