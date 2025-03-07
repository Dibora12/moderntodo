import { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "./InputField";
import Button from "./Button";
import bgImage from "../assets/Login.jpg";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setError(""); // Reset error message when typing
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z0-9]).{6,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!loginData.email.trim() || !loginData.password.trim()) {
      setError("Email and Password are required.");
      return;
    }

    if (!validateEmail(loginData.email)) {
      setError("Invalid email format.");
      return;
    }

    if (!validatePassword(loginData.password)) {
      setError(
        "Password must be at least 6 characters, include one uppercase letter and one special character."
      );
      return;
    }

    console.log("Login Correctly");
    setError(""); 
  };

  return (
    <div 
      className="fixed top-0 left-0 w-full h-full bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm text-white">
        <h2 className="text-2xl font-bold text-center mb-1  text-blue-600 ">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-3 ">
          <InputField
            label="Email Address"
            name="email"
            type="email"
        
            value={loginData.email}
            onChange={handleChange}
            required
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          
            <InputField
              label="Password"
              name="password"
              type="password"
              value={loginData.password}
              onChange={handleChange}
              required
            /> 
            <div className="w-2xl"/>
          <Button
            text="LOGIN"
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg"
          />
          <p className="text-center text-gray-400 mt-3 text-sm">
            Do not have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
