



const BASE_URL = process.env.REACT_BASE_URL

import axios from "axios";
import { toast } from "react-toastify";

const pendingRequest = new Map();
console.log("LiveUrlSetup");

function generateReqKey(config) {
  const { method, url, params, data } = config;
  return [method, url, Qs.stringify(params), Qs.stringify(data)].join("&");
}
function addPendingRequest(config) {
  const requestKey = generateReqKey(config);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingRequest.has(requestKey)) {
        pendingRequest.set(requestKey, cancel);
      }
    });
}
function removePendingRequest(config) {
  const requestKey = generateReqKey(config);
  if (pendingRequest.has(requestKey)) {
    const cancelToken = pendingRequest.get(requestKey);
    cancelToken(requestKey);
    pendingRequest.delete(requestKey);
  }
}

const fetchClient = () => {
  const defaultOptions = {
    baseURL: BASE_URL,
    // timeout: 20000,
    headers: {
      "Content-Type": "application/json",
    },
  };
  // Create instance
  let instance = axios.create(defaultOptions);
  // instance.defaults.timeout = 30000
  // instance.defaults.timeoutErrorMessage = 'timeout'
  instance.interceptors.response.use(
    function (response) {
      removePendingRequest(response.config); // Remove the request from the pendingRequest object
      return response?.data;
    },
    function (error) {
      removePendingRequest(error.config || {}); // Remove the request from the pendingRequest object
      // toast.dismiss();
      if (
        error.response?.status === 401 &&
        error.response?.data ===
          "User has already logged-in with different device!"
      ) {
        toast.error("User has already logged-in with different device!");
        toast.error("Logging out");
        console.log("logging out");
        window.location.href = "/";
        localStorage.clear();
      } else if (error.code === "ECONNABORTED") {
        console.log("Something went wrong...");
      } else if (error.response?.status === 401) {
        toast.error("You don't have permission to perform that action.");
      }
      let message = error?.response?.data?.message || "Error encountered!!";
      let innerException =
        error?.response?.data?.innerException || error?.response?.data;
      if (!SUPPRESS_BACKEND_ERRORS) {
        console.error(innerException);
      }
      return Promise.reject(message);
    }
  );
  // Set the AUTH token for any request
  instance.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("seppi-user");
      const localDeviceId = localStorage.getItem("loggedin_device_key");
      if (!!token && token != "null") {
        config.headers.Authorization = token ? Bearer ${token} : Bearer '';
        config.headers.userId = getUserDetails()?.userUuid;
        config.headers.deviceId = localDeviceId;
      }
      // Timeout
      config.timeout = 30000; // Milliseconds
      removePendingRequest(config); // Check whether there is a duplicate request, if so, cancel the request
      addPendingRequest(config); // Add the current request information to the pendingRequest object
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  return instance;
};



function getUserDetails() {
  if (typeof window == "undefined") return null;
  const userInfo = localStorage.getItem("userInfo");
  return userInfo ? JSON.parse(userInfo) : null;
}


export default axios.create({


})



