import { ChangeEvent, FormEvent, useState } from "react";
import { FormDataType } from "../Types/AuthContextTypes";
import { useLogin } from "../hooks/useLogin";

const LogInPage = () => {
  const { login, isLoading, error } = useLogin()

  const [formData, setFormData] = useState<FormDataType>({
    username: "",
    password: ""
  })

  const toggleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormData(prevForm => {
      return {
        ...prevForm,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await login(formData)
    console.log("form submitted", formData)
  }

  return (
    <div className="login-container container">
      <div className="logo">LOGO</div>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="admin"
          name="username"
          value={formData.username}
          onChange={(event) => toggleInput(event)}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={formData.password}
          onChange={(event) => toggleInput(event)}
        />
        <button
        disabled={isLoading}
        >
          Log In
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default LogInPage;
