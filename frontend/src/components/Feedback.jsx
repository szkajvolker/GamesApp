import { useState } from "react";

const Feedback = ({ onClose }) => {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    type: "Feedback",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("http://localhost:3333/api/feedback/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({
          type: "success",
          message: "Feedback sent successfully! Thank you!",
        });
        setFormData({ subject: "", message: "", type: "" });
        setTimeout(() => onClose(), 2000);
      } else {
        setStatus({
          type: "error",
          message:
            data.message || "An error occured while sending the messsage",
        });
      }
    } catch (error) {
      setStatus(
        {
          type: "error",
          message: "An error occured. Please try again later",
        },
        error,
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 m-4 w-full max-w-md relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">
            Feedback / Bug Report
          </h2>
          <button
            onClick={onClose}
            className="bg-black/30 text-white w-8 h-8 rounded-full hover:bg-red-500/50 cursor-pointer transition-colors"
          >
            ❌
          </button>
        </div>

        {status.message && (
          <div
            className={`p-3 rounded-lg mb-4 ${status.type === "success" ? "bg-green-500/20 text-green-300 border border-green-500/30" : " bg-red-500/20 text-red-300 border border-red-500/30"}`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            {" "}
            <label className="block text-white/80 mb-2">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
              required
            >
              <option className="bg-gray-500" value="Feedback">
                General Feedback
              </option>
              <option className="bg-gray-500" value="Bug report">
                Bug Report
              </option>
              <option className="bg-gray-500" value="Feature suggestion">
                Feature Suggestion
              </option>
              <option className="bg-gray-500" value="Other">
                Other
              </option>
            </select>
          </div>

          <div>
            <label className="block text-white/80 mb-2">
              Subject (optional)
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Summary..."
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              maxLength={20}
            ></input>
          </div>

          <div>
            <label className="block text-white/80 mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Please describe the issue or suggestion in detail..."
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer ${isSubmitting ? "bg-gray-500/50 text-gray-300 cursor-not-allowed" : "bg-linear-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600"}`}
          >
            {isSubmitting ? "Sending..." : "Send Feedback"}
          </button>
        </form>
        <div className="text-center">
          <p className="text-white/60 text-sm  mt-4">
            Anonymous feedback - I can't reply but I read everything!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
