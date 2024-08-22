export const getStatusMessage = (code) => {
  const statusCode = code;

  switch (statusCode) {
    case "400":
      return "warning";
    case "200":
      return "success";
    case "404":
      return "not found";
    case "500":
      return "server error";
    // Add more cases as needed
    default:
      return "unknown status";
  }
};
