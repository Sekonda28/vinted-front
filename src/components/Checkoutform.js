import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router";

const Checkoutform = ({ price, title, user_Id }) => {
  const stripe = useStripe();
  const element = useElements();
  const navigate = useNavigate();
  const userId = user_Id;

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
          productPrice: price + 4.5,
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
                    <span>{price.toFixed(2)} €</span>
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
                    Total <span>{(price + 4.5).toFixed(2)} €</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="payment-card">
              <div className="payment-summary">
                Il ne vous reste plus qu'un étape pour vous offrir
                <span style={{ fontWeight: 700 }}> {title}</span>. Vous allez
                payer{" "}
                <span style={{ fontWeight: 700 }}>
                  {" "}
                  {(price + 4.5).toFixed(2)} €{" "}
                </span>
                (frais de protection et frais de port inclus).
                <div className="divider"></div>
                <form onSubmit={handleSubmit}>
                  <div className="stripe-element">
                    <CardElement />
                  </div>

                  <button className="payment-button" type="submit">
                    Valider
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="payment-wrapper">
          <div className="payment-container">
            <div className="payment-summary">
              <div className="payment-summary-details">
                <p>Paiement effectué !</p>

                <p>
                  Tu as acheté:
                  <span style={{ fontWeight: 700 }}> {title} </span>
                  pour{" "}
                  <span style={{ fontWeight: 700 }}>
                    {" "}
                    {(price + 4.5).toFixed(2)} €{" "}
                  </span>
                  (frais de protection et frais de port inclus).
                </p>

                <p className="return-home" onClick={() => navigate("/")}>
                  Clique ici pour retourner à la page d'accueil
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkoutform;
