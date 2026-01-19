import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { mockApi } from "../services/api";
import Navbar from "../components/Navbar";
import SignupRight from "../components/SignupRight";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
     
      const existing = await mockApi.get("/users");
      const alreadyExists = existing.data.find(
        (u) => u.email === email
      );

      if (alreadyExists) {
        alert("User already exists");
        return;
      }

      await mockApi.post("/users", {
        email,
        password,
      });

      alert("Signup successful");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <>
      <Navbar
        infoText="Already have an account?"
        infoLinkText="Log in"
        infoLink="/"
        actionText="Log in"
        actionLink="/"
      />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="bg-white rounded-3xl p-10 shadow-xl">
            <h1 className="text-3xl font-bold mb-2">
              Unlock New Skills Today!
            </h1>
            <p className="text-gray-500 mb-8">
              Join the skill community where teaching meets learning
            </p>

            <form onSubmit={handleSignup} className="space-y-6">

              {/* EMAIL */}
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

              {/* PASSWORD */}
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
                  Create password
                </label>
              </div>

              {/* CONFIRM */}
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder=" "
                  className="peer w-full pl-12 pr-5 py-4 rounded-2xl border bg-gray-50 focus:ring-2 focus:ring-indigo-500"
                />
                <label className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 text-sm peer-focus:top-3 peer-focus:text-xs bg-white px-1">
                  Repeat password
                </label>
              </div>

              <button className="w-full py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600">
                Start Swapping Skills →
              </button>
            </form>
          </div>

          <SignupRight />
        </div>
      </div>
    </>
  );
}





