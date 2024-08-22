import React from "react";

import Container from "@mui/material/Container";
// import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { Box} from "@mui/system";
import MainDashBoard from "../maindashboard/MaindashBoard";
import "./setting.css"



const Setting = () => {
//   const classes = useStyles();

  return (
  <Sidebar>
    <div>
      <Container maxWidth="lg">
        <h2 className="pageHeading"> Masters </h2>

        <hr />
        <div className="setting-container">
          {/* Location start */}
          <div>
            <p className="pageHeading"> Location </p>
            <Box
              display="flex"
              alignItems="center"
              gap={4}
              my={1} mb={5}
              sx={{ flexWrap: "wrap" }}
            >
              <Link to="/managestate">
                <button className="btnLinks" type="button">
                  State
                </button>
              </Link>

              <Link to="/managecity">
                <button className="btnLinks" type="button">
                  City
                </button>
              </Link>

              <Link to="/locationbulkupload">
                <button className="btnLinks" type="button">
                  Bulk Upload
                </button>
              </Link>
            </Box>
          </div>
          {/* Location end */}
          {/* Product start */}
          <div>
            <p className="pageHeading"> Product </p>
            <Box
              display="flex"
              alignItems="center"
              gap={4}
              my={1} mb={5}
              sx={{ flexWrap: "wrap" }}
            >
              <Link to="/managebrand">
                <button className="btnLinks" type="button">
                  Brand
                </button>
              </Link>

              <Link to="/managecategory">
                <button className="btnLinks" type="button">
                  Category
                </button>
              </Link>

              <Link to="/managesubcategory">
                <button
                  className="btnLinks"
                  type="button"
                  style={{ fontSize: "14px" }}
                >
                  Sub Category/Classification
                </button>
              </Link>

              <Link to="/managemodel">
                <button className="btnLinks" type="button">
                  Model
                </button>
              </Link>

              <Link to="/productbulkupload">
                <button className="btnLinks" type="button">
                  Bulk Upload
                </button>
              </Link>
            </Box>
          </div>
          {/* Product end */}

          {/* SparePart start */}
          <div>
            <p className="pageHeading"> Spare Part </p>
            <Box
              display="flex"
              alignItems="center"
              gap={4}
              my={1} mb={5}
              sx={{ flexWrap: "wrap" }}
            >
              <Link to="/managepart">
                <button className="btnLinks" type="button">
                  Part
                </button>
              </Link>

              <Link to="/managepartmapping">
                <button className="btnLinks" type="button">
                  Part Mapping
                </button>
              </Link>

              <Link to="/manageAlternatePartMapping">
                <button
                  className="btnLinks"
                  type="button"
                  style={{ fontSize: "15px" }}
                >
                  Alternate Part Mapping
                </button>
              </Link>

              <Link to="/manageRepairMapping">
                <button className="btnLinks" type="button">
                  Repair Mapping
                </button>
              </Link>
            </Box>
          </div>
          {/* SparePart end */}

          {/* Warranty start */}
          <div>
            <p className="pageHeading"> Warranty </p>
            <Box
              display="flex"
              alignItems="center"
              gap={4}
              my={1} mb={5}
              sx={{ flexWrap: "wrap" }}
            >
              <Link to="/manageProduct">
                <button className="btnLinks" type="button">
                  Product
                </button>
              </Link>

              <Link to="/manageSpare">
                <button className="btnLinks" type="button">
                  Spare
                </button>
              </Link>

              <Link to="/manageWarrantyVoidReason">
                <button className="btnLinks" type="button">
                  Warranty Void Reason
                </button>
              </Link>
            </Box>
          </div>
          {/* Warranty end */}

          {/* UserBase start */}
          <div>
            <p className="pageHeading"> User Base </p>
            <Box
              display="flex"
              alignItems="center"
              gap={4}
              my={1} mb={5}
              sx={{ flexWrap: "wrap" }}
            >
              <Link to="/setting-userbase-entity">
                <button className="btnLinks" type="button">
                  Entity
                </button>
              </Link>

              <Link to="/setting-userbase-role">
                <button className="btnLinks" type="button">
                  Role
                </button>
              </Link>

              <Link to="/setting-userbase-user">
                <button className="btnLinks" type="button">
                  User
                </button>
              </Link>
            </Box>
          </div>
          {/* UserBase end */}

          {/* Price start */}
          <div>
            <p className="pageHeading"> Price </p>
            <Box
              display="flex"
              alignItems="center"
              gap={4}
              my={1} mb={5}
              sx={{ flexWrap: "wrap" }}
            >
              <Link to="/setting-price-manageproduct">
                <button className="btnLinks" type="button">
                  Price
                </button>
              </Link>

              <Link to="/setting-price-pricegroup">
                <button className="btnLinks" type="button">
                  Price Group
                </button>
              </Link>
            </Box>
          </div>
          {/* Price end */}

          {/* Others start */}
          <div>
            <p className="pageHeading"> Others </p>
            <Box
              display="flex"
              alignItems="center"
              gap={4}
              my={1} mb={5}
              sx={{ flexWrap: "wrap" }}
            >
              <Link to="/manageMSL">
                <button className="btnLinks" type="button">
                  MSL
                </button>
              </Link>

              <Link to="/setting-others-defectcode">
                <button className="btnLinks" type="button">
                  Defect Code
                </button>
              </Link>

              <Link to="/setting-others-repaircode">
                <button className="btnLinks" type="button">
                  Repair Code
                </button>
              </Link>

              <Link to="/setting-others-symptomcode">
                <button className="btnLinks" type="button">
                  Symptom Code
                </button>
              </Link>

              <Link to="/setting-others-symptomgroup">
                <button className="btnLinks" type="button">
                  Symptom Group
                </button>
              </Link>

              <Link to="/manageFeedbackCode">
                <button className="btnLinks" type="button">
                  Feedback Code
                </button>
              </Link>
            </Box>
          </div>
          {/* Others end */}

          <div>
            <p className="pageHeading"> Others </p>
            <Box
              display="flex"
              alignItems="center"
              gap={4}
              my={1} mb={5}
              sx={{ flexWrap: "wrap" }}
            >
              <Link to="/manageMSL">
                <button className="btnLinks" type="button">
                  MSL
                </button>
              </Link>

              <Link to="/setting-others-defectcode">
                <button className="btnLinks" type="button">
                  Defect Code
                </button>
              </Link>

              <Link to="/setting-others-repaircode">
                <button className="btnLinks" type="button">
                  Repair Code
                </button>
              </Link>

              <Link to="/setting-others-symptomcode">
                <button className="btnLinks" type="button">
                  Symptom Code
                </button>
              </Link>

              <Link to="/setting-others-symptomgroup">
                <button className="btnLinks" type="button">
                  Symptom Group
                </button>
              </Link>

              <Link to="/manageFeedbackCode">
                <button className="btnLinks" type="button">
                  Feedback Code
                </button>
              </Link>
            </Box>
          </div>
        </div>
      </Container>
    </div>
     </Sidebar>

  );
};

export default Setting;


// import { Box } from "@mui/material";
// import NewSidebar from "../Sidebar/NewSidebar";
 
// const Setting = () => {
//     return (
        // <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        //     <NewSidebar>
                
        //     </NewSidebar>
        // </Box>
//     )
// }
// export default Setting;