import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const Checkoutform = ({ price, title }) => {
  const stripe = useStripe();
  const element = useElements();

  const userId = "qwerty";

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const cardElements = element.getElement(CardElement);

      const stripeResponse = await stripe.createToken(cardElements, {
        name: userId,
      });

      const response = await axios.post(
        "https://vinted-api-matt.herokuapp.com/payment",
        {
          stripeToken: stripeResponse.token.id,
          productPrice: price,
          title: title,
        }
      );
      console.log(response.data);

      if (response.status === 200) {
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="Checkout">
      {!completed ? (
        <div className="payment-wrapper">
          <div className="payment-container">
            <div className="payment-summary">
              <div className="title">Résumé de la commande</div>
              <div className="payment-summary-details">
                <ul>
                  <li>
                    Commande
                    <span>{price} €</span>
                  </li>
                  <li>
                    Frais protection acheteurs <span>1.50 €</span>
                  </li>
                  <li>
                    Frais de port <span>3.00 €</span>
                  </li>
                </ul>
              </div>
              <div className="divider"></div>
              <div className="payment-summary-details">
                <ul>
                  <li style={{ fontWeight: 700, color: "black" }}>
                    Total <span>Test</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="payment-card">
              <div className="payment-summary">
                Il ne vous reste plus qu'un étape pour vous offrir{" "}
                <span style={{ fontWeight: 700 }}>{title}</span>. Vous allez
                payer <span style={{ fontWeight: 700 }}>{price + 4.5}</span>{" "}
                (frais de protection et frais de port inclus).
                <div className="divider"></div>
                <form onSubmit={handleSubmit}>
                  <CardElement />
                  <button type="submit">Valider</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <span>Paiement effectué !</span>
      )}
    </div>
  );
};

export default Checkoutform;
