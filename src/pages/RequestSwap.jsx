import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import { useState } from "react";

export default function RequestSwap() {
  const { id } = useParams(); // toUserId
  const navigate = useNavigate();

  const fromUserId = "1"; // replace with user later

  const [form, setForm] = useState({
    offerSkill: "",
    wantSkill: "",
    message: "",
    availability: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      fromUserId,
      toUserId: id,
      offerSkill: form.offerSkill,
      wantSkill: form.wantSkill,
      message: form.message,
      availability: form.availability,
      status: "Pending",
    };

    await fetch("request api url", {    
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    navigate("/dashboard"); 
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* BACK */}
        <Link
          to={`/profile/${id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 mb-6"
        >
          <ArrowLeft size={16} /> Back to Profile
        </Link>

        {/* FORM CARD */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
          <h1 className="text-2xl font-bold mb-2">
            Request Skill Swap
          </h1>
          <p className="text-gray-500 mb-8">
            Send a request to start a skill exchange.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* YOUR SKILL */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Skill You Offer
              </label>
              <input
                name="offerSkill"
                value={form.offerSkill}
                onChange={handleChange}
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* SKILL YOU WANT */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Skill You Want to Learn
              </label>
              <input
                name="wantSkill"
                value={form.wantSkill}
                onChange={handleChange}
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* MESSAGE */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>

            {/* AVAILABILITY */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Your Availability
              </label>
              <input
                name="availability"
                value={form.availability}
                onChange={handleChange}
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              <Send size={16} />
              Send Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
