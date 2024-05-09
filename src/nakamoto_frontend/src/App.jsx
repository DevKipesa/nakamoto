import React, { useState } from "react";
import { nakamoto_backend } from 'declarations/nakamoto_backend';
import './app.scss';

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [scheduledDate, setScheduledDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleGetUserDetails = async () => {
    setIsButtonDisabled(true);
    try {
      // Call the queryUserDetails function from the Motoko canister
      const response = await nakamoto_backend.createUserDetails();

      if (response) {
        setUserDetails(response);
        setErrorMessage("");
      } else {
        setErrorMessage("User details not found");
        setUserDetails(null);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setErrorMessage("Error fetching user details. Please try again.");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const handleGetScheduledDate = async () => {
    setIsButtonDisabled(true);
    try {
      // Call the function to get scheduled date from the Motoko canister
      const response = await nakamoto_backend.getGarbageCollectionDate();

      if (response) {
        setScheduledDate(response);
        setErrorMessage("");
      } else {
        setErrorMessage("Scheduled date not found");
        setScheduledDate(null);
      }
    } catch (error) {
      console.error("Error fetching scheduled date:", error);
      setErrorMessage("Error fetching scheduled date. Please try again.");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <div className="buttons">
      <button className="details"
        onClick={handleGetUserDetails}
        disabled={isButtonDisabled}
      >
        Get User Details
      </button>

      {userDetails && (
        <div>
          <h2>User Details</h2>
          <p>Name: {userDetails.name}</p>
          <p>Email: {userDetails.email}</p>
          <p>Phone Number: {userDetails.phoneNumber}</p>
        </div>
      )}

      <button className="schedule"
        onClick={handleGetScheduledDate}
        disabled={isButtonDisabled}
      >
        Get Scheduled Date
      </button>

      {scheduledDate && (
        <div>
          <h2>Scheduled Date for Garbage Collection</h2>
          <p>{scheduledDate.day}/{scheduledDate.month}/{scheduledDate.year}</p>
        </div>
      )}

      <p style={{ color: "red" }}>{errorMessage}</p>
    </div>
  );
};

export default UserDetails;
