import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { mockApi } from "../services/api";
import Navbar from "../components/Navbar";
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
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <>
      <Navbar
        infoText="Don’t have an account?"
        infoLinkText="Sign up"
        infoLink="/signup"
        actionText="Sign up"
        actionLink="/signup"
      />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="bg-white rounded-3xl p-10 shadow-xl">
            <h1 className="text-3xl font-bold mb-2">
              Unlock Your Potential
            </h1>
            <p className="text-gray-500 mb-8">
              Enter your details to access the platform
            </p>

            <form onSubmit={handleLogin} className="space-y-6">

              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" "
                  className="peer w-full pl-12 pr-5 py-4 rounded-2xl border bg-gray-50 focus:ring-2 focus:ring-indigo-500"
                />
                <label className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 text-sm peer-focus:top-3 peer-focus:text-xs bg-white px-1">
                  Email address
                </label>
              </div>

              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=" "
                  className="peer w-full pl-12 pr-5 py-4 rounded-2xl border bg-gray-50 focus:ring-2 focus:ring-indigo-500"
                />
                <label className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 text-sm peer-focus:top-3 peer-focus:text-xs bg-white px-1">
                  Password
                </label>
              </div>

              <button className="w-full py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600">
                Log In →
              </button>
            </form>
          </div>

          <LoginRight />
        </div>
      </div>
    </>
  );
}


