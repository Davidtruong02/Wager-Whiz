import React from "react";
import { useState, useRef, useEffect } from "react";
import { gql } from "@apollo/client";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../../utils/auth.js";

function SubscriptionExpired() {
  return (
    <div>
      <h2>Subscription Expired</h2>
      <p>Your trial period has expired. Please subscribe to continue using the app.</p>
      {/* Add subscription options or prompt to contact support */}
    </div>
  );
}

export default SubscriptionExpired;
