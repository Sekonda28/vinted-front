import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/Checkoutform";
import { useLocation } from "react-router";

const stripePromise = loadStripe(
  "pk_test_51JwQYiKnLGeLhC2muuPXiE8irAYBLLZ0QMb8nwHULZ4NAwFwUjib9kqRfN7LnHAcuADSQ8bIdAdQs4MMwkZw47Cq00KRXaYhmU"
);

const Payment = () => {
  const location = useLocation();
  const { title, price, user_Id } = location.state;

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm title={title} price={price} userId={user_Id} />
    </Elements>
  );
};

export default Payment;
