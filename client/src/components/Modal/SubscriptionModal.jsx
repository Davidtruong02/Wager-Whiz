import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function SubscriptionModal({ show, handleClose }) {
    const handleSubscription = async () => {
        try {
            // Call your backend to create a Checkout Session
            const response = await fetch("/create-checkout-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    // Include any necessary information for your backend to create the session
                    // For example, user information, plan ID, etc.
                })
            });

            // Parse the response
            const session = await response.json();

            // Initialize Stripe
            const stripe = await loadStripe("sk_test_51PELwo02NrnR8qBBxppttSvPkOBYGt2kf55WHR4JYQyYi3dbZUHYFAPZP9JNec9rcIramD4eHx4B4uzRL50u1kai00Ah5h5N31");

            // Redirect to Stripe Checkout
            stripe.redirectToCheckout({ sessionId: session.id });
        } catch (error) {
            console.error("Error creating checkout session:", error);
            // Handle error
        }
    };

    return (
        <Modal show={show} onHide={handleClose} className="subscriptionModal">
            <Modal.Header closeButton>
                <Modal.Title>Sign up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Your form content */}
            </Modal.Body>
            <Modal.Footer>
                {/* Your form footer */}
                <Button variant="primary" onClick={handleSubscription}>
                    Subscribe with Stripe
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SubscriptionModal;
