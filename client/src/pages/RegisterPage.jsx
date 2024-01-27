import { useState } from "react";
import { useRegister } from "../hooks/useRegister";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });
  const { register, isLoading, error } = useRegister()

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

    await register(formData)
    // registerRequest(formData);
  };
  return (
    <div className="register-container container">
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
          type="email"
          placeholder="email"
          name="email"
          value={formData.email}
          onChange={(e) => toggleInput(e)}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={formData.password}
          onChange={(e) => toggleInput(e)}
        />
        <button disabled={isLoading}>Register</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}
