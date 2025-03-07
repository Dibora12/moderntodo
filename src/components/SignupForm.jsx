import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import InputField from "./InputField";
import Button from "./Button";
import lgImage from "../assets/Register.jpg";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    Name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    Name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  useEffect(() => {
    if (attempts >= 5) {
      setIsBlocked(true);
      setTimeout(() => {
        setAttempts(0);
        setIsBlocked(false);
      }, 30000);
    }
  }, [attempts]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    if (!password) return "Password cannot be empty";
    if (password.toLowerCase() === "password") return "Password is too weak";
    let errors = [];
    if (password.length < 8) errors.push("At least 8 characters");
    if (!/[A-Z]/.test(password)) errors.push("1 uppercase letter");
    if (!/[0-9]/.test(password)) errors.push("1 number");
    if (!/[!@#$%^&*]/.test(password)) errors.push("1 special character");
    return errors.length > 0 ? `Password must include: ${errors.join(", ")}` : "";
  };

  const assessPasswordStrength = (password) => {
    if (password.length >= 12 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password)) {
      return "Strong";
    } else if (password.length >= 8) {
      return "Medium";
    } else {
      return "Weak";
    }
  };

  const handleChange = (e) => {
    const sanitizedValue = DOMPurify.sanitize(e.target.value);
    setFormData({ ...formData, [e.target.name]: sanitizedValue });
    setErrors({ ...errors, [e.target.name]: "" });
    if (e.target.name === "password") {
      setPasswordStrength(assessPasswordStrength(sanitizedValue));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isBlocked) return;
    
    let newErrors = {};

    if (!formData.Name.trim()) newErrors.Name = "Name is required";
    if (!validateEmail(formData.email)) newErrors.email = "Invalid email format";
    const passwordValidation = validatePassword(formData.password);
    if (passwordValidation) newErrors.password = passwordValidation;
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("✅ Registered successfully");
    } else {
      console.log("❌ Not registered, please try again");
      setAttempts((prev) => prev + 1);
    }
  };

  return (
    <div className="relative w-screen h-screen flex justify-center items-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${lgImage})` }}>
          
        </div>

      <div className="relative z-10 bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm">
        <h2 className="text-xl font-bold text-center text-blue-600 mb-4">Sign-Up</h2>

        {isBlocked && <p className="text-red-500 text-center">Too many attempts. Try again later.</p>}

        <form onSubmit={handleSubmit} className="space-y-3" autoComplete="off">
          <InputField
            label="Name"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            className="text-md"
          />
          {errors.Name && <p className="text-red-500 text-xs">{errors.Name}</p>}

          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="text-sm"
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="text-sm"
            autoComplete="new-password"
            onPaste={(e) => e.preventDefault()}
          />
          <p className="text-xs text-green-500">Strength: {passwordStrength}</p>
          {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="text-sm"
            autoComplete="new-password"
            onPaste={(e) => e.preventDefault()}
          />
          {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}

          <div className="flex justify-between space-x-3">
            <Button
              text="Reset"
              onClick={() => {
                setFormData({ Name: "", email: "", password: "", confirmPassword: "" });
                setErrors({ Name: "", email: "", password: "", confirmPassword: "" });
                setPasswordStrength("");
              }}
              className="w-1/2 bg-blue-600 hover:bg-blue-500"
            />
            <Button text="Submit" type="submit" className="w-1/2 bg-blue-600 hover:bg-blue-500"
         disabled={isBlocked} />
            </div>

<p className="text-gray-400 text-center mt-3 text-sm">
  Already registered?{" "}
  <Link to="/login" className="text-blue-400 hover:underline">
    Login
  </Link>
</p>

<p className="text-xs text-gray-500 text-center mt-2">
  By signing up, you accept our{" "}
  <a href="#" className="text-blue-300 hover:underline">Terms of Service</a> and{" "}
  <a href="#" className="text-blue-300 hover:underline">Privacy Policy</a>.
</p>
</form>
</div>
</div>
);
};

export default SignupForm;