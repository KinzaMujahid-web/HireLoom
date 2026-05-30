import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Mail, Send, CheckCircle, AlertCircle, Lock } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(
        "http://localhost:5011/api/users/forgot-password",
        { email }
      );
      setIsError(false);
      setMessage(res.data.message || "Reset link sent! Check your inbox.");
    } catch (err) {
      setIsError(true);
      setMessage(err.response?.data?.message || "Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-10 shadow-sm">

        {/* Icon */}
        <div className="w-13 h-13 bg-emerald-50 rounded-xl flex items-center justify-center mb-6">
          <Lock className="text-emerald-700" size={26} />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Forgot your password?
        </h1>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          No worries. Enter your registered email address and we'll send you a link to reset your password.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1.5"
            >
              Email address
            </label>
            <div className="flex items-center gap-2.5 border border-gray-200 rounded-xl px-4 h-12 bg-gray-50 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/10 transition-all">
              <Mail className="text-gray-400 shrink-0" size={17} />
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-400"
                required
                autoComplete="email"
              />
            </div>
          </div>

          {/* submit button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full h-12 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all ${loading
                ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                : "bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white"
              }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Sending...
              </>
            ) : (
              <>
                <Send size={15} />
                Send reset link
              </>
            )}
          </button>
        </form>

        {/* Feedback message */}
        {message && (
          <div className={`mt-4 flex items-start gap-2.5 text-sm px-4 py-3 rounded-xl ${isError
              ? "bg-red-50 text-red-800 border border-red-200"
              : "bg-emerald-50 text-emerald-800 border border-emerald-200"
            }`}>
            {isError
              ? <AlertCircle size={16} className="shrink-0 mt-0.5" />
              : <CheckCircle size={16} className="shrink-0 mt-0.5" />
            }
            <span>{message}</span>
          </div>
        )}

        {/* Back to login */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Remembered your password?{" "}
          <Link to="/login" className="text-emerald-600 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;