import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import authService from '../../services/auth.service';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { Button } from '../../components/ui/Button';
import { ErrorAlert } from '../../components/ui/Feedback';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await authService.forgotPassword(email.toLowerCase().trim());
      setMessage(res.message || 'If the email exists in our records, an OTP verification code has been dispatched.');
      setTimeout(() => {
        navigate('/verify-otp', { state: { email: email.toLowerCase().trim() } });
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to dispatch reset instructions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your verified work email address to receive a 6-digit OTP code."
    >
      <form className="space-y-4.5" onSubmit={handleSubmit}>
        <ErrorAlert message={error} onDismiss={() => setError('')} />

        {message && (
          <div className="p-3 rounded-[6px] bg-blue-50 border border-blue-200 text-blue-800 text-xs">
            {message}
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Registered Work Email
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

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={loading}
            className="w-full justify-center text-sm font-semibold"
          >
            Send Verification Code
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>

        <div className="pt-3 text-center border-t border-slate-100">
          <Link
            to="/login"
            className="inline-flex items-center text-xs font-medium text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
            Back to Sign In
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
