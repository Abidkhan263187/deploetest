import { createContext, useState } from "react";

export const Theme = createContext();

export const ThemeProvider = ({ children }) => {
  const [light, setLight] = useState(false);
  const [btnstyle, setBtnStyle] = useState({
    backgroundColor: "#33499F",
    color: "white",
    boxShadow: " 4px 2px 4px rgb(110, 142, 237)",
    marginTop: "10px",
    marginBottom: "10px",
    width: "max-content",
  });
  return (
    <Theme.Provider value={{ light, setLight, btnstyle }}>
      {children}
    </Theme.Provider>
  );
};
