import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { mockApi } from "../services/api";
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

    const res = await mockApi.get("/users");
    const exists = res.data.find((u) => u.email === email);

    if (exists) {
      alert("User already exists");
      return;
    }

    await mockApi.post("/users", { email, password });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-10 shadow-xl">
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-gray-500 mb-8">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 font-semibold">
              Log in
            </Link>
          </p>

          <form onSubmit={handleSignup} className="space-y-6">
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
            <Input
              icon={<Lock size={18} />}
              type="password"
              value={confirm}
              setValue={setConfirm}
              label="Confirm password"
            />

            <button className="w-full py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600">
              Sign Up →
            </button>
          </form>
        </div>

        <SignupRight />
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




