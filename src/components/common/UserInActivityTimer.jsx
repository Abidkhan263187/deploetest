import React, { useEffect, useRef } from "react";

const AUTO_LOGOUT_TIME = 20 * 60 * 1000; // 20 minutes in milliseconds

export const UseInactivityTimer = () => {
  const timerRef = useRef(null);

  useEffect(() => {
    const handleUserActivity = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        // Log message to the console after inactivity
        sessionStorage.removeItem("authKey");
        window.location.href = "/login";
      }, AUTO_LOGOUT_TIME);
    };

    // Add event listeners for user activity
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keypress", handleUserActivity);
    window.addEventListener("mousedown", handleUserActivity);
    window.addEventListener("scroll", handleUserActivity);

    // Initialize timer on component mount
    handleUserActivity();

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keypress", handleUserActivity);
      window.removeEventListener("mousedown", handleUserActivity);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []); // Empty dependency array to run only on mount and unmount

  return null;
};
