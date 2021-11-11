import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://vinted-api-matt.herokuapp.com/user/signup",
        {
          username: username,
          email: email,
          password: password,
        }
      );
      console.log(response.data.token);
      Cookies.set("token", response.data.token, { expires: 30 });
      } 
      catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>S'inscrire</h2>
      <form onSubmit={handleSubmit} className="sign-up-form">
        <input
          className="input-txt"
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          value={username}
          placeholder="Nom d'utilisateur"
        />
        <input
          className="input-txt"
          type="email"
          placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          value={email}
        />
        <input
          className="input-txt"
          type="password"
          placeholder="Mot de passe"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          value={password}
        />

        <div className="checkbox-container">
          <input type="checkbox" />
          <span>S'inscrire à notre newsletter</span>

          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Signup;
