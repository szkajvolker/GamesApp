import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { signUp } from "../api/userAPI";
import { signUpBackgoundImage } from "../assets";

const SignUp = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signUp(username, email, password, name);
      localStorage.setItem("token", res.token);
      setIsLoggedIn(true);
      toast.success("Account created successfully");
      navigate("/home");
    } catch (e) {
      toast.error(e.message || "Sign up failed. Please try again.");
    }
  };

  return (
    <div className="flex w-full h-screen items-center justify-center pt-16 relative">
      <img
        src={signUpBackgoundImage}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover object-center z-0 pt-19 border-2 border-gray-400"
      />
      <form
        className="bg-gray-100/30 shadow-2xl backdrop-blur-xs shadow-gray-600 dark:shadow-none dark:bg-gray-200/30 p-8 rounded flex flex-col gap-4 min-w-75 z-10"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          SignUp
        </h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          className="border-2 border-gray-500 p-2 rounded focus:border-blue-500 focus:outline-none"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border-2 border-gray-500 p-2 rounded focus:border-blue-500 focus:outline-none"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border-2 border-gray-500 p-2 rounded focus:border-blue-500 focus:outline-none"
          required
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
          className="border-2 border-gray-500 p-2 rounded focus:border-blue-500 focus:outline-none"
          required
        />

        <div className="flex flex-row gap-2">
          <p className="font-bold text-gray-800">
            You already have an account?
          </p>
          <p
            className="text-blue-700 font-bold underline cursor-pointer hover:scale-110"
            onClick={() => navigate("/login")}
          >
            Login
          </p>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded font-bold cursor-pointer hover:brightness-125 hover:text-gray-800"
        >
          SignUp
        </button>
      </form>
    </div>
  );
};

export default SignUp;
