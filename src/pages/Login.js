import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = ({ setUser, setShowSort }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate()
  setShowSort(false);

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
      console.log(response.data)
      if (response.data.token) {
        setUser(response.data.token);
        navigate("/");
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Se connecter</h2>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
        className="sign-up-form"
      >
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
      <a href="/signup">Pas encore de compte ? Inscris-toi !</a>
      <span className="error-message">{errorMessage}</span>
    </div>
  );
};

export default Login;
