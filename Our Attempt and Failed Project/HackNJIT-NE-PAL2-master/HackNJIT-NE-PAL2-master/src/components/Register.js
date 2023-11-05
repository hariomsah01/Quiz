import React, { useState } from "react";

function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfile(file);
  };

  const handleRegistration = async () => {
    if (!username || !fullName || !password || !profile) {
      alert("Please fill in all the required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("fullName", fullName);
    formData.append("password", password);
    formData.append("profile", profile); // Ensure that the "profile" field matches the field name used in the server

    console.log(username);
    console.log(fullName);
    console.log(password);
    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Registration successful!");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register">
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
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
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleRegistration}>Register</button>
    </div>
  );
}

export default RegistrationForm;
