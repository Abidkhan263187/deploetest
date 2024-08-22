/* eslint-disable react-refresh/only-export-components */

import axios from "axios";

let authKey = sessionStorage.getItem("authKey");
// console.log("hit in api ");
// Create an instance of axios with default settings
const apiClient = axios.create({
  baseURL: "https://qa.nuralservice.com/FirebolttServiceAPI/api/User",
  // baseURL: "http://localhost:5092/api/user",
  headers: {
    "Content-Type": "application/json",
    authKey: authKey,
  },
  // You can add more default settings if needed
});

// Interceptors for request (optional, but useful for adding auth tokens, logging, etc.)

apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("authKey");
    if (token) {
      config.headers["authKey"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptors for response (optional, but useful for error handling, logging, etc.)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // console.log("hit in 401");
    if (error.response && error.response.status === 401) {
      window.location.href = "/login";
    }
  }
);

// Function to get posts
export const getEntityTypeListAPI = async () => {
  try {
    const response = await apiClient.post("/GetEntityTypeListAPI/1");
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const getRoleDropdownListAPI = async (entityTypeID) => {
  try {
    let jsonBody = JSON.stringify({
      entityTypeID: `${entityTypeID}`,
    });
    const response = await apiClient.post("/RoleDropdownListAPI/1", jsonBody);
    return response.data;
  } catch (error) {
    console.error("Error fetching RoleDropdownListAPI:", error);
    throw error;
  }
};

export const getRoleListAPI = async (entityTypeID) => {
  try {
    let jsonBody = JSON.stringify({
      entityTypeID: `${entityTypeID}`,
    });
    const response = await apiClient.post("/RoleListAPI/1", jsonBody);
    return response.data;
  } catch (err) {
    console.log(`Error fetching RoleListApi, ${err}`);
  }
};

export const getMenuRoleAPI = async (
  entityTypeID,
  roleID,
  pageIndex,
  pageSize
) => {
  try {
    const jsonBody = JSON.stringify({
      entityTypeID: entityTypeID,
      roleID: roleID,
      pageIndex: pageIndex,
      pageSize: pageSize,
    });
    const response = await apiClient.post("GetRoleMenuListAPI/1", jsonBody);
    return response.data;
  } catch (err) {
    console.log(`Error in fetching role menu mapping api ${err}`);
  }
};

export const getSymptomGroupDropdownList = async () => {
  try {
    const response = await apiClient.post("GetSymptomGroupDropdownListAPI/1");
    return response.data;
  } catch (err) {
    console.log(`Error fetching SymptomGroup Dropdown List, %{err}`);
  }
};
export const getItemCodeDropdown = async () => {
  try {
    const response = await apiClient.get("GetPartCode/1");
    return response.data;
  } catch (err) {
    console.log(`Error fetching Item Code Dropdown api ${err}`);
  }
};

// repair code dropdown api
export const getRepairCodeDropdown = async () => {
  try {
    const response = await apiClient.post("GetRepairCodeDropdownListAPI/1");
    return response.data;
  } catch (err) {
    console.log(`Error fetching repair code api ${err}`);
  }
};

export const getEntityNameDropdown = async () => {
  try {
    const jsonBody = JSON.stringify({
      EntityMappingTypeRelationID: "0",
      LoggedInEntityTypeID: "0",
      LoggedEntityID: "0",
    });
    const response = await apiClient.post("GetPrimaryEntity/1", jsonBody);
    return response.data;
  } catch (err) {
    console.log(`Error in calling Entity name API ${err}`);
  }
};
export const fetchSymptomCodeDropdown = async () => {
  try {
    const response = await apiClient.get("GetSymptomCodeFor/1");
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(`Error fetching Symptom Code Dropdown, ${err}`);
    throw err;
  }
};
export const getSymptomGroupListAPI = async (
  symptomGroupID,
  pageIndex,
  pageSize
) => {
  try {
    let jsonBody = JSON.stringify({
      symptomGroupID: `${symptomGroupID}`,
      pageIndex: `${pageIndex}`,
      pageSize: `${pageSize}`,
    });

    const response = await apiClient.post("GetSymptomGroupListAPI/1", jsonBody);
    return response.data;
  } catch (err) {
    console.log(`Error fetching Symptom Group List API, ${err}`);
  }
};

export const getProductCategoryList = async () => {
  try {
    const response = await apiClient.get("/GetProductCategoryMaster/1");
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(
      `Error Fetching Category Master, ${
        err.response ? err.response.data : err.message
      }`
    );
    throw err;
  }
};

export const getPartCode = async () => {
  try {
    const response = await apiClient.get("GetPartCode/1");
    return response.data;
  } catch (err) {
    console.log(`Error in fetching part code Api ${err}`);
    throw err;
  }
};

export const getModelName = async (
  type,
  brandID,
  categoryID,
  subCategoryID
) => {
  try {
    const jsonBody = JSON.stringify({
      type: type /* 0: Model Code, 1: Model Name */,
      brandID: brandID,
      categoryID: categoryID,
      subCategoryID: subCategoryID,
    });
    const response = await apiClient.post(
      "GetModelNameDropdownListAPI/1",
      jsonBody
    );
    return response.data;
  } catch (err) {
    console.log(`Error in fetching model name Api ${err}`);
    throw err;
  }
};

export const getModelList = async (
  modelCode,
  modelName,
  pageIndex,
  pageSize
) => {
  try {
    const jsonBody = JSON.stringify({
      modelCode: modelCode,
      modelName: modelName,
      pageIndex: pageIndex,
      pageSize: pageSize,
    });
    // console.log(`Jsonbody is ${jsonBody}`)
    const response = await apiClient.post(
      "GetModelAltPartMappingListAPI/1",
      jsonBody
    );
    return response.data;
  } catch (err) {
    console.log(`Error in fetching model list Api ${err}`);
    throw err;
  }
};

export const getProductCode = async () => {
  try {
    const response = await apiClient.get("GetProductCode/1");
    return response.data;
  } catch (err) {
    console.log(`Error in fetching product code Api ${err}`);
    throw err;
  }
};

export const getSymptomCodeList = async () => {
  try {
    const jsonBody = JSON.stringify({
      SymptomCode: "",
      SymptomDes: "",
      Status: 255,
      PageIndex: 1,
      PageSize: 200,
    });
    const response = await apiClient.post(
      "/GetSymptomCodeListData/1",
      jsonBody
    );
    return response.data;
  } catch (err) {
    console.log(`Error fatching Symptom code List, ${err}`);
  }
};

export const getUserListAPI = async (
  userDetailID,

  roleID,

  name,

  email,

  mobile,

  status,

  pageIndex,

  pageSize
) => {
  try {
    const jsonBody = JSON.stringify({
      userDetailID: userDetailID,

      roleID: roleID,

      name: name,

      email: email,

      mobile: mobile,

      status: status,

      pageIndex: pageIndex,

      pageSize:`${pageSize}`,
    });
    console.log(jsonBody)
    const response = await apiClient.post("/GetUserListAPI/1", jsonBody);

    return response.data;
  } catch (err) {
    console.log(`Error fatching user code List api, ${err}`);
  }
};
// price group dropdown api
export const getPriceGroupDropdown = async () => {
  try {
    const response = await apiClient.post("GetPriceGroupDropdownListAPI/1");
    return response.data;
  } catch (err) {
    console.log(`Error fetching Price Group Dropdown List, ${err}`);
    throw err;
  }
};
export const getPriceTypeDropdown = async () => {
  try {
    const response = await apiClient.post("GetPriceTypeDropdownListAPI/1");
    return response.data;
  } catch (err) {
    console.log(`Error fetching Price Type down API ${err}`);
  }
};

export const getProductCategory = async (defectCodeId) => {
  try {
    const jsonBody = JSON.stringify({
      DefectCodeMasterID: defectCodeId,
    });
    const response = await apiClient.post(
      "GetProductCategoryByDefectCodeId/1",
      jsonBody
    );
    console.log("response data ye rha", response.data);

    return response.data;
  } catch (err) {
    console.log(`Error fetching Product Category By Defect Code: ${err}`);
  }
};

export const getRegionDropdown = async (countryID) => {
  try {
    const jsonBody = JSON.stringify({
      countryID: countryID,
    });
    // console.log(countryID)
    const response = await apiClient.post("GetRegionDropdownAPI/1", jsonBody);
    return response.data;
  } catch (err) {
    console.log(`Error fetching Region Dropdown: ${err}`);
    throw err;
  }
};
export const getWarrantyDropdown = async () => {
  try {
    const response = await apiClient.post("GetWarrantyStatusDropdownAPI/1");
    return response.data;
  } catch (err) {
    console.log(`Error fetching Warranty Dropdown: ${err}`);
    throw err;
  }
};
export const getJobStatus = async () => {
  try {
    const response = await apiClient.post("GetJobsheetStatusDropdownAPI/1");
    return response.data;
  } catch (err) {
    console.log(`Error fetching Job Status Dropdown: ${err}`);
    throw err;
  }
};

export const getDateTypeDropdown = async () => {
  try {
    const response = await apiClient.post("GetDateTypeDropdownAPI/1");
    return response.data;
  } catch (err) {
    console.log(`Error fetching Date Type Dropdown: ${err}`);
    throw err;
  }
};

export const fetchServiceCenterDropdown = async (entityTypeID, entityID) => {
  try {
    const jsonBody = JSON.stringify({
      entityTypeID: entityTypeID,
      entityID: entityID,
    });
    const reponse = await apiClient.post(
      "GetServiceCenterDropdownAPI/1",
      jsonBody
    );
    return reponse.data;
  } catch (err) {
    console.log("Error in fetching service center dropdown");
    throw err;
  }
};
export const getEngineerDropdown = async (entityID) => {
  try {
    const jsonBody = JSON.stringify({
      entityID: entityID,
      status: "1",
    });

    const response = await apiClient.post("GetEngineerDropdownAPI/1", jsonBody);
    return response.data;
  } catch (err) {
    console.log("Error in fetching engineer dropdown");
    throw err;
  }
};

export const getEngineerInvetoryList = async (serviceCenterID, engineerID) => {
  try {
    const jsonBody = JSON.stringify({
      serviceCenterID: serviceCenterID,
      engineerID: engineerID,
    });
    // console.log(jsonBody);
    const response = await apiClient.post(
      "EngineerInventoryDashboardAPI/1",
      jsonBody
    );
    return response.data;
  } catch (err) {
    console.log("Error in fetching engineer inventory list api");
    throw err;
  }
};

export const getRegionServiceList = async (statusTypeID) => {
  try {
    const jsonBody = JSON.stringify({
      statusTypeID: statusTypeID,
    });
    console.log(`jsonBody is :${jsonBody}`);
    const response = await apiClient.post("InventoryDashboardAPI/1", jsonBody);
    // console.log('repsonse data is ', response.data.regionWiseData)
    return response.data;
  } catch (err) {
    console.log(`Error fetching Region Service List: ${err}`);
    throw err;
  }
};
// export const getProductCategory = async (defectCodeId) => {
//   try {
//     const jsonBody = JSON.stringify({
//       DefectCodeMasterID: defectCodeId,
//     });
//     const response = await apiClient.post(
//       "GetProductCategoryByDefectCodeId/1",
//       jsonBody
//     );
//     console.log("response data ye rha", response.data);

//     return response.data;
//   } catch (err) {

//     console.log(`Error fetching Product Category By Defect Code: ${err}`);
//   }
// };

export const getPriceGroupList = async (priceGroupId, pageIndex, pageSize) => {
  try {
    const jsonBody = JSON.stringify({
      priceGroupID: `${priceGroupId}`,
      pageIndex: `${pageIndex}`,
      pageSize: `${pageSize}`,
    });
    const response = await apiClient.post("GetPriceGroupListAPI/1", jsonBody);
    return response.data;
  } catch (err) {
    console.log(`Error fetching Price Group List: ${err}`);
  }
};

export const getPriceTypeList = async (priceTypeId, pageIndex, pageSize) => {
  try {
    const jsonBody = JSON.stringify({
      priceTypeID: `${priceTypeId}`,
      pageIndex: `${pageIndex}`,
      pageSize: `${pageSize}`,
    });
    // console.log(jsonBody);

    const response = await apiClient.post("GetPriceTypeListAPI/1", jsonBody);
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(`Error fetching Price List API ${err}`);
  }
};

export const getStateList_Dropdown = async () => {
  try {
    const response = await apiClient.get("GetStateMasterDrpDwn_FB/");
    return response.data;
  } catch (err) {
    console.log(`Error fetching State List data for dropdown API ${err}`);
  }
};

export const getStateList_BindTable = async (getStateList) => {
  try {
    // const response = await apiClient.post("GetStateMasterList/1");
    // return response.data;
    console.log("api se" + getStateList);
    const jsonBody = JSON.stringify(getStateList);

    console.log("api service" + jsonBody);
    const response = await apiClient.post("GetStateMasterList/1", jsonBody);

    // console.log("after api call " + response.data)
    return response.data;
  } catch (err) {
    console.log(`Error fetching State List data for table API ${err}`);
  }
};

export const getCityListDropDown = async () => {
  try {
    const response = await apiClient.get("GetCityMasterDrpDwn_FB/");
    return response.data;
  } catch (err) {
    console.log("Error fetching City list data - " + err);
  }
};

export const getCityList = async (getCityList) => {
  try {
    const jsonBody = JSON.stringify(getCityList);
    console.log(`json data for city is : ${jsonBody}`);
    const response = await apiClient.post("GetCityMasterList/1", jsonBody);
    console.log("response data for city ", response.data);
    // if(response.statusCode === "200"){
    //   return response.data;
    // }
    // else{
    //   console.log("error -", response.statusMessage);
    // }

    return response.data;
  } catch (err) {
    console.log(`Error fetching City List data for table API ${err}`);
  }
};

export const getBrandListDropdown = async () => {
  try {
    const response = await apiClient.get("GetBrandMaster_ForDrpdwn_FB/");

    if (response.data.statusCode === "200") {
      return response.data;
    } else {
      console.log("error -", response.statusMessage);
    }
  } catch (err) {
    console.log(`Error fetching Brand List data for drowpdown ${err}`);
  }
};

export const getBrandListTable = async (getCityList) => {
  try {
    const jsonBody = JSON.stringify(getCityList);
    const response = await apiClient.post("GetBrandMasterData/1", jsonBody);

    if (response.data.statusCode === "200") {
      return response.data;
    } else {
      console.log("error -", response.data.statusMessage);
    }

    return response.data;
  } catch (err) {
    console.log(`Error fetching State List data for table API ${err}`);
  }
};

export const getBrandReferenceDataPathLink = async () => {
  try {
    const jsonBody = JSON.stringify();
    const response = await apiClient.post(
      "DownloadBrandReferenceData/1",
      jsonBody
    );

    if (response.data.statusCode === "200") {
      return response.data;
    } else {
      console.log("error -", response.data.statusMessage);
    }

    return response.data;
  } catch (err) {
    console.log(`Error fetching Reference List data for table API ${err}`);
  }
};
// fetching manage product/spare list

export const fetchProductListAPI = async (
  partID,
  priceTypeID,
  priceGroupID,
  priceOnDate,
  pageIndex,
  pageSize
) => {
  try {
    let jsonBody = JSON.stringify({
      partID: partID,
      priceTypeID: priceTypeID,
      priceGroupID: priceGroupID,
      priceOnDate: priceOnDate,
      pageIndex: pageIndex,
      pageSize: pageSize,
    });
    // console.log(jsonBody);
    const response = await apiClient.post("GetPartPriceListAPI/1", jsonBody);
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(`Error fetching product/spare list API ${err}`);
  }
};

// get repiar code list api
export const getRepairCodeList = async (repairCodeID, pageIndex, pageSize) => {
  try {
    const jsonBody = JSON.stringify({
      repairCodeID: repairCodeID,
      pageIndex: pageIndex,
      pageSize: pageSize,
    });
    const response = await apiClient.post("GetRepairCodeListAPI/1", jsonBody);
    return response.data;
  } catch (err) {
    console.log(`Error fetching Repair Code List API ${err}`);
  }
};

//defectcode list and dropdown api
export const getDefectCodeList = async (
  DefectCode,
  DefectDes,
  Status,
  PageIndex,
  PageSize
) => {
  try {
    const jsonBody = JSON.stringify({
      DefectCode: DefectCode,
      DefectDes: DefectDes,
      Status: Status,
      PageIndex: PageIndex,
      PageSize: PageSize,
    });
    const response = await apiClient.post("GetDefectCodeListData/1", jsonBody);
    return response.data;
  } catch (err) {
    console.log(`Error in defect code list api ${err}`);
  }
};

// forgot-password API

export const forgotPassword = async (userName, email, clientKey) => {
  try {
    const jsonBody = JSON.stringify({
      userName: `${userName}`,
      emailId: `${email}`,
      clientKey: `${clientKey}`,
    });
    const response = await apiClient.post("ForgotPassword", jsonBody);
    return response.data;
  } catch (err) {
    console.log(`Error fetching the forgot password api ${err}`);
  }
};

// Function to create a new post
export const createPost = async (postData) => {
  try {
    const response = await apiClient.post("/posts", postData);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};
export const createSymptomGroup = async (createSymptomGroup) => {
  try {
    const jsonBody = JSON.stringify(createSymptomGroup);
    console.log(jsonBody);
    const response = await apiClient.post("ManageSymptomGroupAPI/1", jsonBody);
    return response.data;
  } catch (err) {
    console.log("Error creating symptom group, ${err}");
    throw err;
  }
};


export const createSymptomCode = async(symptomCodeData)=>{
  try{
    const jsonBody = JSON.stringify(symptomCodeData);
    console.log(jsonBody);
    const response = await apiClient.post("SaveUpdateSymptomCode/1", jsonBody);
    console.log(`response data is : ${response.data}`);
    return response.data;
  }
  catch(err){
    console.log(`Error creating symptom code: ${err}`);
    throw err;
  }
}

export const createRole = async (createRole) => {
  try {
    const jsonBody = JSON.stringify(createRole);
    // console.log(jsonBody);
    const response = await apiClient.post("ManageRoleAPI/1", jsonBody);
    return response.data;
    // console.log(response.data);
  } catch (err) {
    console.log(`Error creating api role: ${err}`);
    throw err;
  }
};

export const createPriceGroup = async (createPrice) => {
  try {
    const jsonBody = JSON.stringify(createPrice);
    const response = await apiClient.post("ManagePriceGroupAPI/1", jsonBody);
    return response.data;
  } catch (err) {
    console.log(`Error Creating Price Group ${err}`);
  }
};
export const createPriceType = async (createPriceType) => {
  try {
    const jsonBody = JSON.stringify(createPriceType);

    // console.log(jsonBody);
    const response = await apiClient.post("ManagePriceTypeAPI/1", jsonBody);
    return response.data;
  } catch (err) {
    console.log(`Error Creating Price type ${err}`);
  }
};

export const createProductSpare = async (createProduct) => {
  try {
    // console.log(`create Product is ${createProduct}`);

    const jsonBody = JSON.stringify(createProduct);

    console.log(`json body is ${jsonBody}`);

    const response = await apiClient.post("ManageSparePriceAPI/1", jsonBody);

    return response.data;
  } catch (err) {
    console.log(`Error Creating Product/Spare ${err}`);

    // throw err;
  }
};
export const getSparePartListAPI = async (
  partCode,
  partName,
  pageIndex,
  pageSize
) => {
  try {
    const jsonBody = JSON.stringify({
      partCode: partCode ?? "",
      partName: partName ?? "",
      pageIndex: pageIndex ?? "1",
      pageSize: pageSize ?? "10",
    });
    console.log(jsonBody);

    const response = await apiClient.post("GetSparePartListAPI/1", jsonBody);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(
        `Error fetching Spare Part List API: ${response.message}`
      );
    }
  } catch (err) {
    console.log(`Error fetching Spare Part List API: ${err.message}`);
  }
};

export const getPartWarrantyListDataAPI = async (
  sapPartCode,
  partName,
  pageIndex,
  pageSize
) => {
  try {
    const jsonBody = JSON.stringify({
      SapPartCode: sapPartCode ?? "",
      PartName: partName ?? "",
      PageIndex: pageIndex ?? "1",
      PageSize: pageSize ?? "10",
    });
    console.log(jsonBody);

    const response = await apiClient.post(
      "GetPartWarrantyListData/1",
      jsonBody
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(
        `Error fetching Part Warrenty List API: ${response.message}`
      );
    }
  } catch (err) {
    console.log(`Error fetching Part Warrenty List API: ${err.message}`);
  }
};

export const manageSparePartAPI = async (params) => {
  try {
    // const jsonBody = JSON.stringify(params);
    const jsonBody = JSON.stringify({
      type: params.type,
      partID: params.partID,
      partCode: params.partCode,
      partName: params.partName,
      partGroupID: params.partGroupID,
      taxGroupID: params.taxGroupID,
      isSerialised: params.isSerialised,
      isRepairable: params.isRepairable,
      isReturnable: params.isReturnable,
    });
    console.log(jsonBody);
    const response = await apiClient.post("ManageSparePartAPI/1", jsonBody);
    return response.data;
  } catch (err) {
    console.log(`Error Creating Price Group ${err}`);
  }
};

export const saveUpdatePartWarrantyAPI = async (params) => {
  try {
    const jsonBody = JSON.stringify(params);
    console.log(jsonBody);
    const response = await apiClient.post("SaveUpdatePartWarranty/1", jsonBody);
    return response.data;
  } catch (err) {
    console.log(`Error Creating Price Group ${err}`);
  }
};

// part group dropdown api
export const getPartGroupDropdownAPI = async () => {
  try {
    const response = await apiClient.post("GetPartGroupDropdownListAPI/1");
    return response.data;
  } catch (err) {
    console.log(`Error fetching Part Group Dropdown List, ${err}`);
    throw err;
  }
};

// tax group dropdown api
export const getTaxGroupDropdownListAPI = async () => {
  try {
    const response = await apiClient.post("GetTaxGroupDropdownListAPI/1");
    return response.data;
  } catch (err) {
    console.log(`Error fetching Tax Group Dropdown List, ${err}`);
    throw err;
  }
};

export const createRepairCode = async (createRepair) => {
  try {
    const jsonBody = JSON.stringify(createRepair);
    console.log(jsonBody);
    const response = await apiClient.post("ManageRepairCodeAPI/1", jsonBody);
    console.log("response is ", response.data);
    return response.data;
  } catch (err) {
    console.log(`Error creating Repair Code  API ${err}`);
  }
};

// export const getModelListAPI = async (
//   brandID,
//   categoryID,
//   subCategoryID,
//   modelID,
//   pageIndex,
//   pageSize
// ) => {
//   try {
//     const jsonBody = JSON.stringify({
//       brandID: "0",
//       categoryID: "0",
//       subCategoryID: "0",
//       modelID: "0",
//       pageIndex: "1",
//       pageSize: "10",
//     });
//     console.log(jsonBody);

//     const response = await apiClient.post("GetModelListAPI/1", jsonBody);

//     if (response.status === 200) {
//       return response.data;
//     } else {
//       throw new Error(
//         `Error fetching Spare Part List API: ${response.message}`
//       );
//     }
//   } catch (err) {
//     console.log(`Error fetching Spare Part List API: ${err.message}`);
//   }
// };

export const getModelDropDown = async () => {
  try {
    const jsonBody = JSON.stringify({
      brandID: "0",
      categoryID: "0",
      subCategoryID: "0",
    });
    console.log(jsonBody);
    const response = await apiClient.post(
      "GetModelDropdownListAPI/1",
      jsonBody
    );
    console.log("response is ", response.data);
    return response.data;
  } catch (err) {
    console.log(`Error creating Repair Code  API ${err}`);
  }
};

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Reason mater api >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const manageReasonMasterAPI = async (body) => {
  try {
    const response = await apiClient.post("/ManageReasonMasterAPI/1", body);
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(
      `Error Fetching Reason Types, ${
        err.response ? err.response.data : err.message
      }`
    );
    throw err;
  }
};
export const getProductCategoryMaster = async () => {
  try {
    const response = await apiClient.get("/GetProductCategoryMaster/1");
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(
      `Error Fetching Reason Types, ${
        err.response ? err.response.data : err.message
      }`
    );
    throw err;
  }
};

export const getReasonMasterDataListAPI = async (body) => {
  try {
    const response = await apiClient.post(
      "/GetReasonMasterDataListAPI/1",
      body
    );
    console.log("data inn sevrice ", response.data);
    return response.data;
  } catch (err) {
    console.error(
      `Error Fetching Reason Types, ${
        err.response ? err.response.data : err.message
      }`
    );
    throw err;
  }
};

export const getReasonTypeMasterAPI = async () => {
  try {
    const response = await apiClient.post("/GetReasonTypeMasterAPI/1");
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(
      `Error Fetching Reason Types, ${
        err.response ? err.response.data : err.message
      }`
    );
    throw err;
  }
};

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Reason mater api >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Manage Modal Api >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const getBrandMasterData = async (body) => {
  try {
    const response = await apiClient.post("/GetBrandMasterData/1", body);
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(
      `Error Fetching Reason Types, ${
        err.response ? err.response.data : err.message
      }`
    );
    throw err;
  }
};
export const getCategoryMasterData = async (body) => {
  try {
    const response = await apiClient.post("/GetCategoryMasterData/1", body);
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(
      `Error Fetching Reason Types, ${
        err.response ? err.response.data : err.message
      }`
    );
    throw err;
  }
};
export const getSubCategoryMasterData = async (body) => {
  try {
    const response = await apiClient.post("/GetSubCategoryMasterData/1", body);
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(
      `Error Fetching Reason Types, ${
        err.response ? err.response.data : err.message
      }`
    );
    throw err;
  }
};
export const getModelNameDropdownListAPI = async (body) => {
  try {
    const response = await apiClient.post(
      "/GetModelNameDropdownListAPI/1",
      body
    );
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(
      `Error Fetching Reason Types, ${
        err.response ? err.response.data : err.message
      }`
    );
    throw err;
  }
};
export const manageModelAPI = async (body) => {
  try {
    const response = await apiClient.post("/ManageModelAPI/1", body);
    // console.log(response.data);
    // alert(response.data.statusMessage)
    return response.data;
  } catch (err) {
    console.error(
      `Error Fetching Reason Types, ${
        err.response ? err.response.data : err.message
      }`
    );
    throw err;
  }
};

export const getModelListAPI = async (body) => {
  try {
    const response = await apiClient.post("/GetModelListAPI/1", body);
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(
      `Error Fetching Reason Types, ${
        err.response ? err.response.data : err.message
      }`
    );
    throw err;
  }
};
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Manage Modal Api >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Manage Category >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const saveEditCategory = async (body) => {
  try {
    const response = await apiClient.post("/SaveEditCategory/1", body);
    // console.log(response.data);
    // alert(response.data.statusMessage);
    return response.data;
  } catch (err) {
    console.error(
      `Error Fetching Reason Types, ${
        err.response ? err.response.data : err.message
      }`
    );
    throw err;
  }
};
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Manage Category >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Manage sub Category >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const saveEditSubCategory = async (body) => {
  try {
    const response = await apiClient.post("/SaveEditSubCategory/1", body);
    // console.log(response.data);
    // alert(response.data.statusMessage);
    return response.data;
  } catch (err) {
    console.error(
      `Error Fetching Reason Types, ${
        err.response ? err.response.data : err.message
      }`
    );
    throw err;
  }
};
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Manage sub Category >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Manage SKU >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const getModelDropdownListAPI = async (body) => {
  try {
    const response = await apiClient.post("/GetModelDropdownListAPI/1", body);
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(
      `Error Fetching Reason Types, ${
        err.response ? err.response.data : err.message
      }`
    );
    throw err;
  }
};

export const manageSKUAPI = async (body) => {
  try {
    const response = await apiClient.post("/ManageSKUAPI/1", body);
    // console.log(response.data);
    // alert(response.data.statusMessage);
    return response.data;
  } catch (err) {
    console.error(
      `Error Fetching Reason Types, ${
        err.response ? err.response.data : err.message
      }`
    );
    throw err;
  }
};
export const getSKUListAPI = async (body) => {
  try {
    const response = await apiClient.post("/GetSKUListAPI/1", body);
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(
      `Error Fetching Reason Types, ${
        err.response ? err.response.data : err.message
      }`
    );
    throw err;
  }
};
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Manage SKU >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Ticket ACK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const getTicketListAPI = async (body) => {
  try {
    const response = await apiClient.post("/GetTicketListAPI/1", body);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(
      `Error Fetching Reason Types, ${
        err.response ? err.response.data : err.message
      }`
    );
    throw err;
  }
};

export const getBinTypeListAPI = async (body) => {
  try {
    const response = await apiClient.post("/GetBinTypeListAPI/1", body);
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(
      `Error Fetching Reason Types, ${
        err.response ? err.response.data : err.message
      }`
    );
    throw err;
  }
};

export const generateJobSheetAPI = async (body) => {
  try {
    const response = await apiClient.post("/GenerateJobSheetAPI/1", body);
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(
      `Error Fetching Reason Types, ${
        err.response ? err.response.data : err.message
      }`
    );
    throw err;
  }
};

export const GetReasonMasterListAPI = async (body) => {
  try {
    const response = await apiClient.post("/GetReasonMasterListAPI/1", body);
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(
      `Error Fetching Reason Types, ${
        err.response ? err.response.data : err.message
      }`
    );
    throw err;
  }
};

export const TicketHoldRejectAPI = async (body) => {
  try {
    const response = await apiClient.post("/TicketHoldRejectAPI/1", body);
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(
      `Error Fetching Reason Types, ${
        err.response ? err.response.data : err.message
      }`
    );
    throw err;
  }
};

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Ticket ACK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Service  Center >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const jobSheetViewPrintAPI = async (body) => {
  try {
    const response = await apiClient.post("/JobSheetViewPrintAPI/1", body);
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(
      `Error Fetching Reason Types, ${
        err.response ? err.response.data : err.message
      }`
    );
    throw err;
  }
};

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Service  Center>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const createUserRole = async (createRole) => {
  try {
    const jsonBody = JSON.stringify(createRole);
    // console.log(jsonBody);
    const response = await apiClient.post("ManageUserAPI/1", jsonBody);
    console.log(response.data)
    return response.data;
  } catch (err) {
    console.log(`Error creating User Role API ${err}`);
  }
};
export const createState = async (createState) => {
  try {
    const jsonBody = JSON.stringify(createState);
    const response = await apiClient.post("SaveEditState/1", jsonBody);
    return response.data;
  } catch (error) {
    console.log(`Error while creating State - ${error}`);
  }
};

export const createCity = async (createCity) => {
  try {
    const jsonBody = JSON.stringify(createCity);

    const response = await apiClient.post("SaveEditCity/1", jsonBody);

    return response.data;
  } catch (error) {
    console.log(`Error while creating City - ${error}`);
  }
};

export const createBrand = async (createBrand) => {
  try {
    const jsonBody = JSON.stringify(createBrand);

    const response = await apiClient.post("SaveEditBrand/1", jsonBody);

    if (response.data.statusCode === "200") {
      return response.data;
    } else {
      console.log("error while saving brand ", response.data.statusMessage);
    }
  } catch (error) {
    console.log(`Error while creating Brand - ${error}`);
  }
};

export const createModel = async (
  type,
  partID,
  altPartID,
  modelID,
  partAlternateMappingID,
  productPartId
) => {
  try {
    const jsonBody = JSON.stringify({
      type: type /* 1: Save, 3: Status Update */,
      partID: partID,
      altPartID: altPartID,
      modelID: modelID,
      partAlternateMappingID: partAlternateMappingID,
      productPartId: productPartId,
    });
    console.log("josn body is", jsonBody);
    const response = await apiClient.post(
      "ManageModelAltPartMappingAPI/1",
      jsonBody
    );
    return response.data;
  } catch (err) {
    console.log(`Error creating Model ${err}`);
    throw err;
  }
};

// ======================================================= Dashboard Api ========================================================

export const repairDashboardAPI = async (body) => {
  try {
    const response = await apiClient.post("/RepairDashboardAPI/1", body);
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(
      `Error Fetching Reason Types, ${
        err.response ? err.response.data : err.message
      }`
    );
    throw err;
  }
};

export const TATDashboardAPI = async (body) => {
  try {
    const response = await apiClient.post("/TATDashboardAPI/1", body);
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(
      `Error Fetching Reason Types, ${
        err.response ? err.response.data : err.message
      }`
    );
    throw err;
  }
};

// ======================================================= Dashboard Api ========================================================
// ======================================================= Download Reference data  Api ========================================================


export const GetAllProductsReferenceData = async (val) => {
  try {
    const response = await apiClient.post("/GetAllProductsReferenceData/1", {
      callType: val,
    });
    console.log(response.data);
    window.location.href = response.data.referenceDataLink;

    return response.data;
  } catch (err) {
    console.error(
      `Error Fetching Reason Types, ${
        err.response ? err.response.data : err.message
      }`
    );
    throw err;
  }
};

export const GetPriceMasterReferenceDataLinks = async (val) => {
  try {
    const response = await apiClient.post("/GetPriceMasterReferenceDataLinks/1", {
      callType: val,
    });
    console.log(response.data);
    window.location.href = response.data.referenceDataLink;

    return response.data;
  } catch (err) {
    console.error(
      `Error Fetching Reason Types, ${
        err.response ? err.response.data : err.message
      }`
    );
    throw err;
  }
};

// ======================================================= Download Reference data  Api ========================================================

// export const createPriceType = async(createPriceType) =>{
//   try{
//     const jsonBody = JSON.stringify(createPriceType);
//     const response = await apiClient.post('ManagePriceTypeAPI/1', jsonBody);
//     return response.data;
//   }
//   catch(err){
//     console.log(`Error creating Price Type ${err}`);
//   }
// }
// You can export the apiClient instance if you need to use it directly elsewhere
export default apiClient;
