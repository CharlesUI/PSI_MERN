import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";

export default function LogInPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { login, error, isLoading } = useLogin()

  const toggleInput = (e) => {
    const { name, value } = e.target;

    setFormData((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    await login(formData)
  };

  return (
    <div className="login-container container">
      <div className="logo">LOGO</div>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="admin"
          name="username"
          value={formData.username}
          onChange={(e) => toggleInput(e)}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={formData.password}
          onChange={(e) => toggleInput(e)}
        />
        <button disabled={isLoading}>Log In</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
