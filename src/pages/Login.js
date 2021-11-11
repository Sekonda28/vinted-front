import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://vinted-api-matt.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data.token);
      Cookies.set("token", response.data.token, { expires: 30 });

    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Se connecter</h2>
      <form onSubmit={handleSubmit} className="sign-up-form">
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

        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
