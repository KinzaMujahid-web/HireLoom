import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Lock, Eye, EyeOff, ShieldCheck, CheckCircle, AlertCircle, Check } from "lucide-react";

const getStrength = (val) => {
  let s = 0;
  if (val.length >= 8) s++;
  if (/[A-Z]/.test(val)) s++;
  if (/[0-9]/.test(val)) s++;
  if (/[^A-Za-z0-9]/.test(val)) s++;
  return s;
};

const strengthColors = ["bg-red-400", "bg-amber-400", "bg-emerald-400", "bg-emerald-600"];

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const strength = getStrength(password);
  const passwordsMatch = password === confirm;

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setIsError(true);
      return setMessage("Password must be at least 8 characters.");
    }
    if (!passwordsMatch) {
      setIsError(true);
      return setMessage("Passwords do not match. Please try again.");
    }
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(
        `http://localhost:5011/api/users/reset-password/${token}`,
        { password }
      );
      setIsError(false);
      setMessage(res.data.message || "Password reset successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setIsError(true);
      setMessage(err.response?.data?.message || "This reset link is invalid or has expired.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-10 shadow-sm">

        {/* Icon */}
        <div className="w-13 h-13 bg-emerald-50 rounded-xl flex items-center justify-center mb-6">
          <ShieldCheck className="text-emerald-700" size={26} />
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Set a new password</h1>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          Choose a strong password you haven't used before.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* New Password */}
          <div>
            <label htmlFor="rp-pw" className="block text-sm font-medium text-gray-600 mb-1.5">
              New password
            </label>
            <div className="flex items-center gap-2.5 border border-gray-200 rounded-xl px-4 h-12 bg-gray-50 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/10 transition-all">
              <Lock className="text-gray-400 shrink-0" size={17} />
              <input
                id="rp-pw"
                type={showPw ? "text" : "password"}
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-400"
                autoComplete="new-password"
                required
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="text-gray-400 hover:text-gray-700 transition-colors">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Strength bars */}
            {password && (
              <div className="flex gap-1 mt-2">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      i < strength ? strengthColors[strength - 1] : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="rp-confirm" className="block text-sm font-medium text-gray-600 mb-1.5">
              Confirm password
            </label>
            <div className="flex items-center gap-2.5 border border-gray-200 rounded-xl px-4 h-12 bg-gray-50 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/10 transition-all">
              <Lock className="text-gray-400 shrink-0" size={17} />
              <input
                id="rp-confirm"
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter new password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-400"
                autoComplete="new-password"
                required
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-gray-400 hover:text-gray-700 transition-colors">
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Match hint */}
            {confirm && (
              <p className={`text-xs mt-1.5 ${passwordsMatch ? "text-emerald-600" : "text-red-500"}`}>
                {passwordsMatch ? "Passwords match" : "Passwords do not match"}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full h-12 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all ${
              loading
                ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                : "bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white"
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Resetting...
              </>
            ) : (
              <>
                <Check size={15} />
                Reset password
              </>
            )}
          </button>
        </form>

        {/* Feedback */}
        {message && (
          <div className={`mt-4 flex items-start gap-2.5 text-sm px-4 py-3 rounded-xl ${
            isError
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

        <p className="mt-6 text-center text-sm text-gray-500">
          <Link to="/login" className="text-emerald-600 font-medium hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;