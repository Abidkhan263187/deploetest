import { Box } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar2";
import { useState } from "react";
import QRCode from "qrcode.react";

const ServiceCenter = () => {
    const [inputValue, setInputValue] = useState('');
    
    const handleChange = (e) => {
        setInputValue(e.target.value);
      };
 
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Sidebar>
        <h1>Dynamic QR Code Generator</h1>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter text"
        />
        {inputValue && <QRCode value={inputValue} />}
      </Sidebar>
    </Box>
  );
};

export default ServiceCenter;
