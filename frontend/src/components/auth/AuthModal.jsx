import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, login, register, otpLogin, socialLogin } = useAuth();

  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'create'

  // Sign In state
  const [identifier, setIdentifier] = useState('98220 54128');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);

  // Registration state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);

  // Common preferences
  const [rememberPreference, setRememberPreference] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const clearMessages = () => {
    setErrorMsg('');
    setSuccessMsg('');
  };

  const validateSignIn = () => {
    clearMessages();
    if (!identifier.trim()) {
      setErrorMsg('Please enter your mobile number or email address.');
      return false;
    }
    if (!password) {
      setErrorMsg('Please enter your password.');
      return false;
    }
    return true;
  };

  const validateRegistration = () => {
    clearMessages();

    // 1. Full name
    if (!regName.trim()) {
      setErrorMsg('Please enter your full name.');
      return false;
    }
    if (regName.trim().length < 2) {
      setErrorMsg('Full name must be at least 2 characters.');
      return false;
    }

    // 2. Email address
    const cleanEmail = regEmail.trim();
    if (!cleanEmail) {
      setErrorMsg('Please enter your email address.');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setErrorMsg('Please enter a valid email address (e.g. name@example.com).');
      return false;
    }

    // 3. Mobile number (must be 10 digits)
    const cleanPhone = regPhone.replace(/[\s\-\+]/g, '').replace(/^91/, '');
    if (!cleanPhone) {
      setErrorMsg('Please enter your 10-digit mobile number.');
      return false;
    }
    if (!/^\d{10}$/.test(cleanPhone)) {
      setErrorMsg('Mobile number must be exactly 10 digits.');
      return false;
    }

    // 4. Password
    if (!regPassword) {
      setErrorMsg('Please enter a secure password.');
      return false;
    }
    if (regPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return false;
    }

    // 5. Confirm password
    if (!regConfirmPassword) {
      setErrorMsg('Please confirm your password.');
      return false;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMsg('Passwords do not match. Please check and re-type.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();

    if (authMode === 'signin') {
      if (!validateSignIn()) return;
      setLoading(true);
      try {
        await login(identifier.trim(), password, rememberPreference);
      } catch (err) {
        setErrorMsg(err.message || 'Invalid credentials. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      if (!validateRegistration()) return;
      setLoading(true);
      try {
        const cleanPhone = regPhone.replace(/[\s\-\+]/g, '').replace(/^91/, '');
        await register(
          regName.trim(),
          '+91 ' + cleanPhone,
          regEmail.trim(),
          regPassword,
          rememberPreference
        );
      } catch (err) {
        setErrorMsg(err.message || 'Registration failed. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleOtp = async () => {
    clearMessages();
    const phone = prompt('Enter your 10-digit mobile number for OTP login:');
    if (!phone) return;

    const cleanPhone = phone.replace(/[\s\-\+]/g, '').replace(/^91/, '');
    if (!/^\d{10}$/.test(cleanPhone)) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    try {
      await otpLogin('+91 ' + cleanPhone);
    } catch (err) {
      setErrorMsg(err.message || 'OTP verification failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsAuthModalOpen(false);
    clearMessages();
    setLoading(false);
  };

  const switchMode = (mode) => {
    setAuthMode(mode);
    clearMessages();
  };

  return (
    /* Modal container positioned below navbar so Navbar remains 100% visible and accessible */
    <div className="fixed inset-0 top-20 z-40 bg-[#FAF3EA] overflow-y-auto px-4 py-4 sm:py-6 flex items-start justify-center min-h-[calc(100vh-80px)]">

      {/* 2-Column Presentation: White Form Card on Left + Natural Illustration on Right (Matching Reference) */}
      <div className="max-w-[1440px] xl:max-w-[1520px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-4 xl:gap-6 items-start justify-center my-auto pt-2 lg:pt-0">

        {/* ================= LEFT COLUMN: FLOATING WHITE FORM CARD ================= */}
        <div className="lg:col-span-5 xl:col-span-5 max-w-[490px] w-full mx-auto lg:mx-0 lg:ml-auto bg-white rounded-[32px] shadow-[0_20px_50px_-10px_rgba(154,27,47,0.18)] border border-[#EFE3D5] p-6 sm:p-8 relative z-10">

          {/* Top Bar: Back Button & Cross Button */}
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#F0E6DE]">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#6E625D] hover:text-[#821425] hover:bg-[#FFF7F2] transition-colors cursor-pointer"
              onClick={handleClose}
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Back</span>
            </button>

            <button
              type="button"
              className="w-8 h-8 rounded-full text-[#6E625D] hover:text-[#821425] hover:bg-[#FFF7F2] flex items-center justify-center transition-colors cursor-pointer"
              onClick={handleClose}
              title="Close"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Restaurant Emblem & Brand */}
          <div className="flex flex-col items-center text-center mb-5">
            <div className="w-12 h-12 rounded-full bg-[#FCECEE] text-[#821425] flex items-center justify-center mb-2 shadow-xs">
              <span className="material-symbols-outlined text-[24px]">restaurant</span>
            </div>
            <h2 className="text-2xl font-black text-[#821425] font-royal tracking-tight">
              Padmavati Bhojnalaya
            </h2>
          </div>

          {/* Pill Toggle: Sign In vs Create Account (Matching Reference) */}
          <div className="bg-[#FAF2EA] p-1.5 rounded-full border border-[#EFE0D3] flex items-center mb-5">
            <button
              type="button"
              className={`flex-1 py-2 rounded-full font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 ${
                authMode === 'signin'
                  ? 'bg-[#821425] text-white shadow-sm'
                  : 'text-[#4A3B32] hover:text-[#821425]'
              }`}
              onClick={() => switchMode('signin')}
            >
              <span className="material-symbols-outlined text-[16px]">login</span>
              <span>Sign In</span>
            </button>
            <button
              type="button"
              className={`flex-1 py-2 rounded-full font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 ${
                authMode === 'create'
                  ? 'bg-[#821425] text-white shadow-sm'
                  : 'text-[#4A3B32] hover:text-[#821425]'
              }`}
              onClick={() => switchMode('create')}
            >
              <span className="material-symbols-outlined text-[16px]">person_add</span>
              <span>Create Account</span>
            </button>
          </div>

          {/* Error / Success Banners */}
          {errorMsg && (
            <div className="mb-4 px-3.5 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-red-600 shrink-0">error</span>
              <span>{errorMsg}</span>
            </div>
          )}
          {successMsg && (
            <div className="mb-4 px-3.5 py-2.5 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-green-600 shrink-0">check_circle</span>
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {authMode === 'signin' ? (
              /* ======================= SIGN IN MODE ======================= */
              <>
                {/* Fast Access */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="uppercase text-[10px] font-bold text-[#8E7F78] tracking-wider">Fast Access</span>
                  <button
                    type="button"
                    onClick={handleOtp}
                    className="text-[#D9531E] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">dialpad</span>
                    <span>Login using OTP</span>
                  </button>
                </div>

                {/* Mobile Number / Email Input */}
                <div>
                  <label className="block text-xs font-bold text-[#1F1916] mb-1">Mobile Number / Email</label>
                  <div className="flex items-center bg-[#FFF5EE] px-3.5 py-2.5 rounded-xl border border-[#F2D8CE] focus-within:border-[#821425] transition-colors">
                    <span className="text-[#821425] font-bold text-xs mr-2 border-r border-[#F2D8CE] pr-2">+91</span>
                    <input
                      className="w-full bg-transparent text-sm text-[#1F1916] placeholder:text-[#8E7F78] focus:outline-none"
                      placeholder="98220 54128"
                      value={identifier}
                      onChange={(e) => { setIdentifier(e.target.value); clearMessages(); }}
                      required
                      type="text"
                    />
                    <span className="material-symbols-outlined text-[#B89F95] text-[18px]">badge</span>
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-[#1F1916]">Password</label>
                    <button
                      type="button"
                      onClick={() => { clearMessages(); setErrorMsg('Demo password is: password123 (or use OTP login)'); }}
                      className="text-[11px] text-[#D9531E] font-bold hover:underline cursor-pointer"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="flex items-center bg-[#FFF5EE] px-3.5 py-2.5 rounded-xl border border-[#F2D8CE] focus-within:border-[#821425] transition-colors">
                    <input
                      className="w-full bg-transparent text-sm text-[#1F1916] placeholder:text-[#8E7F78] focus:outline-none"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); clearMessages(); }}
                      placeholder="••••••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[#B89F95] hover:text-[#1F1916] cursor-pointer p-0.5"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* ======================= REGISTRATION MODE ======================= */
              <>
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-[#1F1916] mb-1">Full Name</label>
                  <div className="flex items-center bg-[#FFF5EE] px-3.5 py-2.5 rounded-xl border border-[#F2D8CE] focus-within:border-[#821425] transition-colors">
                    <input
                      className="w-full bg-transparent text-sm text-[#1F1916] placeholder:text-[#8E7F78] focus:outline-none"
                      placeholder="e.g. Anand Joshi"
                      value={regName}
                      onChange={(e) => { setRegName(e.target.value); clearMessages(); }}
                      required
                      type="text"
                    />
                    <span className="material-symbols-outlined text-[#B89F95] text-[18px]">person</span>
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-[#1F1916] mb-1">Email Address</label>
                  <div className="flex items-center bg-[#FFF5EE] px-3.5 py-2.5 rounded-xl border border-[#F2D8CE] focus-within:border-[#821425] transition-colors">
                    <input
                      className="w-full bg-transparent text-sm text-[#1F1916] placeholder:text-[#8E7F78] focus:outline-none"
                      placeholder="e.g. anand.joshi@example.com"
                      value={regEmail}
                      onChange={(e) => { setRegEmail(e.target.value); clearMessages(); }}
                      required
                      type="email"
                    />
                    <span className="material-symbols-outlined text-[#B89F95] text-[18px]">mail</span>
                  </div>
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-bold text-[#1F1916] mb-1">Mobile Number</label>
                  <div className="flex items-center bg-[#FFF5EE] px-3.5 py-2.5 rounded-xl border border-[#F2D8CE] focus-within:border-[#821425] transition-colors">
                    <span className="text-[#821425] font-bold text-xs mr-2 border-r border-[#F2D8CE] pr-2">+91</span>
                    <input
                      className="w-full bg-transparent text-sm text-[#1F1916] placeholder:text-[#8E7F78] focus:outline-none"
                      placeholder="98220 54128"
                      value={regPhone}
                      onChange={(e) => { setRegPhone(e.target.value); clearMessages(); }}
                      required
                      type="tel"
                      maxLength={10}
                    />
                    <span className="material-symbols-outlined text-[#B89F95] text-[18px]">call</span>
                  </div>
                </div>

                {/* Password & Confirm Password side by side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1F1916] mb-1">Password</label>
                    <div className="flex items-center bg-[#FFF5EE] px-3 py-2 rounded-xl border border-[#F2D8CE] focus-within:border-[#821425] transition-colors">
                      <input
                        className="w-full bg-transparent text-sm text-[#1F1916] placeholder:text-[#8E7F78] focus:outline-none"
                        type={showRegPassword ? 'text' : 'password'}
                        value={regPassword}
                        onChange={(e) => { setRegPassword(e.target.value); clearMessages(); }}
                        placeholder="Min 6 chars"
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegPassword(!showRegPassword)}
                        className="text-[#B89F95] hover:text-[#1F1916] cursor-pointer p-0.5"
                        title={showRegPassword ? 'Hide password' : 'Show password'}
                      >
                        <span className="material-symbols-outlined text-[17px]">
                          {showRegPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1F1916] mb-1">Confirm Password</label>
                    <div className="flex items-center bg-[#FFF5EE] px-3 py-2 rounded-xl border border-[#F2D8CE] focus-within:border-[#821425] transition-colors">
                      <input
                        className="w-full bg-transparent text-sm text-[#1F1916] placeholder:text-[#8E7F78] focus:outline-none"
                        type={showRegConfirmPassword ? 'text' : 'password'}
                        value={regConfirmPassword}
                        onChange={(e) => { setRegConfirmPassword(e.target.value); clearMessages(); }}
                        placeholder="Re-enter password"
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)}
                        className="text-[#B89F95] hover:text-[#1F1916] cursor-pointer p-0.5"
                        title={showRegConfirmPassword ? 'Hide password' : 'Show password'}
                      >
                        <span className="material-symbols-outlined text-[17px]">
                          {showRegConfirmPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Remember my thali preference (Clean checkbox, Pune Local badge removed per instructions) */}
            <div className="flex items-center text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberPreference}
                  onChange={(e) => setRememberPreference(e.target.checked)}
                  className="rounded text-[#821425] focus:ring-[#821425] w-4 h-4 cursor-pointer accent-[#821425]"
                />
                <span className="font-medium text-[#5E524D]">Remember my thali preference</span>
              </label>
            </div>

            {/* Big Action Submit CTA Button (Matching Reference) */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#821425] hover:bg-[#6D0E1D] text-white font-bold text-sm shadow-md transition-all active:scale-[0.99] mt-2 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                  <span>Processing...</span>
                </>
              ) : authMode === 'signin' ? (
                <>
                  <span>Sign In to Order</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </>
              )}
            </button>

            {/* Switch Mode Prompt Link */}
            <div className="text-center pt-1">
              {authMode === 'signin' ? (
                <p className="text-xs text-[#6E625D]">
                  Don't have an account yet?{' '}
                  <button
                    type="button"
                    onClick={() => switchMode('create')}
                    className="text-[#821425] font-bold hover:underline cursor-pointer ml-1"
                  >
                    Create Account
                  </button>
                </p>
              ) : (
                <p className="text-xs text-[#6E625D]">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => switchMode('signin')}
                    className="text-[#821425] font-bold hover:underline cursor-pointer ml-1"
                  >
                    Sign In
                  </button>
                </p>
              )}
            </div>
          </form>

          {/* Instant One-Click Login & Social Buttons (Sign In Mode) */}
          {authMode === 'signin' && (
            <>
              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#F0E6DE]"></div>
                </div>
                <span className="relative bg-white px-3 text-[10px] font-bold uppercase text-[#8E7F78] tracking-wider">
                  Instant One-Click Login
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => socialLogin('Google')}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#FFF5EE] hover:bg-[#FFEBE0] border border-[#F2D8CE] text-xs font-bold text-[#1F1916] transition-all cursor-pointer shadow-xs"
                >
                  <span className="text-[#EA4335] font-black text-sm">G</span>
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  onClick={() => socialLogin('WhatsApp')}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#FFF5EE] hover:bg-[#FFEBE0] border border-[#F2D8CE] text-xs font-bold text-[#1F1916] transition-all cursor-pointer shadow-xs"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#25D366]">chat</span>
                  <span>WhatsApp</span>
                </button>
              </div>
            </>
          )}

          {/* Trust Badges Footer (Matching Reference) */}
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#F0E6DE] text-[10px] text-[#8E7F78] font-semibold">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">lock</span> 256–Bit SSL
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#1C6B38]">verified</span> 100% Shuddh Veg
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#D9531E]">verified_user</span> FSSAI Reg.
            </span>
          </div>

        </div>

        {/* ================= RIGHT COLUMN: AUTHENTIC ARTWORK ON PAGE BACKGROUND ================= */}
        <div className="hidden lg:flex lg:col-span-7 xl:col-span-7 items-start justify-start p-0 -mt-6 lg:-mt-10 xl:-mt-14 -ml-2 lg:-ml-6 xl:-ml-10">
          <div className="relative w-full max-w-[850px] xl:max-w-[950px] 2xl:max-w-[1050px] flex items-start justify-start">
            <img
              src="/assets/auth-illustration.png"
              alt="Authentic Thali and Dining Illustration"
              className="w-full h-auto max-h-[850px] object-contain object-top select-none pointer-events-none transform lg:scale-110 xl:scale-120 2xl:scale-125 origin-top-left transition-transform duration-300"
            />
          </div>
        </div>

      </div>

    </div>
  );
}
