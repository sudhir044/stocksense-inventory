import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { KeyRound, ArrowRight, ArrowLeft } from "lucide-react";
import authService from "../../services/auth.service";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialEmail = location.state?.email || "";

  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authService.verifyOtp({
        email: email.toLowerCase().trim(),
        otp: otp.trim(),
      });
      navigate("/reset-password", {
        state: { email: email.toLowerCase().trim(), otp: otp.trim() },
      });
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Invalid OTP code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center space-x-2">
          <div className="bg-indigo-600 p-2 rounded-xl text-white font-bold text-xl">SS</div>
          <span className="text-2xl font-bold tracking-tight text-white">StockSense</span>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Verify OTP Code</h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Enter the 6-digit verification code sent to your email.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-800/80 backdrop-blur-md py-8 px-4 shadow-xl border border-slate-700/50 sm:rounded-2xl sm:px-10">
          {error && (
            <div className="mb-4 bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {!initialEmail && (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                  placeholder="name@example.com"
                />
              </div>
            )}

            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-slate-300">
                6-Digit OTP Code
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyRound className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  maxLength={6}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 tracking-widest text-lg font-mono placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                  placeholder="123456"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Verify Code
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </div>

            <div className="text-center">
              <Link
                to="/forgot-password"
                className="inline-flex items-center text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <ArrowLeft className="mr-1 h-4 w-4" /> Request new code
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
