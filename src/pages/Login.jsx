import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { mockApi } from "../services/api";
import LoginRight from "../components/LoginRight";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await mockApi.get("/users");
      const user = res.data.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        alert("Invalid credentials");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-10 shadow-xl">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-500 mb-8">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-indigo-600 font-semibold">
              Sign up
            </Link>
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              icon={<Mail size={18} />}
              type="email"
              value={email}
              setValue={setEmail}
              label="Email address"
            />
            <Input
              icon={<Lock size={18} />}
              type="password"
              value={password}
              setValue={setPassword}
              label="Password"
            />

            <button className="w-full py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600">
              Log In →
            </button>
          </form>
        </div>

        <LoginRight />
      </div>
    </div>
  );
}

function Input({ icon, type, value, setValue, label }) {
  return (
    <div className="relative">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </div>
      <input
        type={type}
        required
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder=" "
        className="peer w-full pl-12 pr-5 py-4 rounded-2xl border bg-gray-50"
      />
      <label className="absolute left-12 top-3 text-xs text-gray-400 bg-white px-1">
        {label}
      </label>
    </div>
  );
}

