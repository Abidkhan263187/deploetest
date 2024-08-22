
import { Button } from "@mui/material";
import "./authenticateButton.css"

const AuthenticateButton = ({name}) => {
    return(
        <>
            <Button type="submit" className="btn">
               {name}
            </Button>
        </>
    )
}

export default AuthenticateButton;