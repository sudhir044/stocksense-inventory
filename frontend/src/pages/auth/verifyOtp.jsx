import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { KeyRound, ArrowRight, ArrowLeft, Mail } from 'lucide-react';
import authService from '../../services/auth.service';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { Button } from '../../components/ui/Button';
import { ErrorAlert } from '../../components/ui/Feedback';

export const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialEmail = location.state?.email || '';

  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.verifyOtp({
        email: email.toLowerCase().trim(),
        otp: otp.trim(),
      });
      navigate('/reset-password', {
        state: { email: email.toLowerCase().trim(), otp: otp.trim() },
      });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Invalid or expired OTP code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Verify 6-digit OTP"
      subtitle="Enter the verification code sent to your registered email account."
    >
      <form className="space-y-4.5" onSubmit={handleSubmit}>
        <ErrorAlert message={error} onDismiss={() => setError('')} />

        {/* Email field if not provided by previous step */}
        {!initialEmail && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Work Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@company.com"
                className="w-full pl-9 pr-3.5 py-2 text-sm bg-white border border-slate-300 rounded-[6px] text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
              />
            </div>
          </div>
        )}

        {/* OTP Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            6-Digit Verification Code
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <KeyRound className="h-4 w-4" />
            </div>
            <input
              type="text"
              required
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="123456"
              className="w-full pl-9 pr-3.5 py-2 text-sm font-mono tracking-widest bg-white border border-slate-300 rounded-[6px] text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Check your inbox or backend server logs for the generated 6-digit code.
          </p>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={loading}
            className="w-full justify-center text-sm font-semibold"
          >
            Verify & Proceed to Password Reset
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>

        <div className="pt-3 text-center border-t border-slate-100 flex items-center justify-between text-xs">
          <Link
            to="/forgot-password"
            className="text-slate-600 hover:text-slate-900 inline-flex items-center"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Resend Code
          </Link>
          <Link to="/login" className="font-semibold text-blue-600 hover:underline">
            Back to Sign In
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default VerifyOtp;
