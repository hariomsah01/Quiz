import React, { useState } from "react";
import Register from "./Register";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, setLogin] = useState(true);

  const handleLogin = async () => {
    try {
      // Prepare login data
      const loginData = {
        username,
        password,
      };

      // Send a POST request to your login endpoint on the server
      const response = await fetch("http://localhost:3001/LogIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        // Login successful, handle the response or redirect the user
        console.log("Login successful");
        console.log(JSON.stringify(response));
        // You can handle the response data here if needed
      } else if (response.status == 444) {
        window.alert("user doesn't exist");
      } else {
        // Login failed, handle the error or show a message to the user
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleRegistration = () => {
    // Send a request to the server to register the user
  };

  return (
    <div>
      <h2>{login ? "Login" : "Registration"}</h2>

      {login && (
        <>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>{"Login"}</button>
        </>
      )}

      {!login && <Register></Register>}

      <button onClick={() => setLogin(!login)}>
        {login ? "Switch to Registration" : "Switch to Login"}
      </button>
    </div>
  );
}

export default Login;
