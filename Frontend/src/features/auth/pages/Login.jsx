import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
    const { loading, handleLogin } = useAuth();
    const navigate = useNavigate(); // Navigation initialize kiya
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault(); // Page refresh hone se rokne ke liye

        try {
            console.log("Form submit ho raha hai...", { email, password });

            // auth hook ka login function call kiya
            await handleLogin({ email, password });

            console.log("Logged In Successfully!");

            // Login hone ke baad user ko home page par redirect karne ke liye
            navigate('/');

        } catch (error) {
            console.error("Login fail hua:", error);
            alert("Bhai, login nahi ho paya! Apne credentials check karo.");
        }
    };

    if (loading) {
        return (
            <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#0f172a', color: '#fff' }}>
                <h1>Please Wait Loading ......</h1>
            </main>
        );
    }

    return (
        <main style={styles.main}>
            {/* Ambient Background Vector Glow Blobs */}
            <div style={{ ...styles.blob, ...styles.blobTopLeft }} className="ambient-blob"></div>
            <div style={{ ...styles.blob, ...styles.blobBottomRight }} className="ambient-blob"></div>

            {/* Glassmorphic Centered Card */}
            <div style={styles.glassCard}>

                {/* Header */}
                <div style={styles.header}>
                    <h2 style={styles.title} className="login-gradient-text">Welcome Back</h2>
                    <p style={styles.subtitle}>Please enter your details to sign in</p>
                </div>

                {/* Form Layout */}
                <form style={styles.form} onSubmit={handleSubmit}>

                    {/* Email Input */}
                    <div style={styles.inputGroup}>
                        <input
                            type="email"
                            id="email"
                            required
                            autoComplete="off"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                            placeholder=" "
                        />
                        <label htmlFor="email" style={styles.label}>Email Address</label>
                    </div>

                    {/* Password Input with Toggle Eye feature */}
                    <div style={styles.inputGroup}>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ ...styles.input, paddingRight: '48px' }}
                            placeholder=" "
                        />
                        <label htmlFor="password" style={styles.label}>Password</label>

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={styles.eyeButton}
                            tabIndex="-1"
                        >
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                            )}
                        </button>
                    </div>

                    {/* Extra Settings Row */}
                    <div style={styles.optionsRow}>
                        <label style={styles.checkboxLabel}>
                            <input type="checkbox" style={styles.checkbox} />
                            Remember me
                        </label>
                        <a href="#" style={styles.link}>Forgot password?</a>
                    </div>

                    {/* Submit Button with spring pop mechanics */}
                    <button type="submit" style={styles.button} className="premium-pop-btn">
                        Sign In
                    </button>
                </form>

                {/* Footer Link */}
                <p style={styles.footerText}>
                    Don't have an account?
                    <a href="/register" style={styles.link}> Sign up</a>
                </p>
            </div>

            {/* Embedded CSS Engine */}
            <style>{`
                @keyframes floatBlob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    50% { transform: translate(30px, -50px) scale(1.08); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .ambient-blob { animation: floatBlob 8s infinite alternate ease-in-out; }

                input:focus ~ label,
                input:not(:placeholder-shown) ~ label {
                    top: -10px !important;
                    font-size: 12px !important;
                    color: #818cf8 !important;
                    background-color: #16143a !important;
                    padding: 0 6px !important;
                    border-radius: 4px;
                }

                .login-gradient-text {
                    background: linear-gradient(135deg, #ffffff 40%, #cbd5e1 70%, #94a3b8 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .premium-pop-btn {
                    position: relative;
                    overflow: hidden;
                    transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.2s ease !important;
                }
                .premium-pop-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 24px -5px rgba(99, 102, 241, 0.4);
                }
                .premium-pop-btn:active {
                    transform: scale(0.95) translateY(0);
                    box-shadow: 0 5px 10px -3px rgba(99, 102, 241, 0.2);
                }
                .premium-pop-btn::after {
                    content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent);
                    transition: all 0.6s ease;
                }
                .premium-pop-btn:hover::after { left: 100%; }
            `}</style>
        </main>
    );
};

const styles = {
    main: {
        backgroundColor: '#0f172a',
        backgroundImage: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #2e1065 100%)',
        minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px', boxSizing: 'border-box', overflow: 'hidden', position: 'relative',
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    },
    blob: { position: 'absolute', width: '384px', height: '384px', borderRadius: '50%', filter: 'blur(70px)', opacity: 0.22, zIndex: 1 },
    blobTopLeft: { top: '15%', left: '20%', backgroundColor: '#9333ea' },
    blobBottomRight: { bottom: '15%', right: '20%', backgroundColor: '#4f46e5' },
    glassCard: {
        width: '100%', maxWidth: '400px', padding: '36px', borderRadius: '24px',
        backgroundColor: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.08)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)', zIndex: 10, boxSizing: 'border-box'
    },
    header: { textAlign: 'center', marginBottom: '32px' },
    title: { fontSize: '32px', fontWeight: '700', margin: '0 0 8px 0', letterSpacing: '-0.5px' },
    subtitle: { fontSize: '14px', color: '#94a3b8', margin: 0 },
    form: { display: 'flex', flexDirection: 'column', gap: '24px' },
    inputGroup: { position: 'relative', width: '100%' },
    input: {
        width: '100%', padding: '14px 16px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px', color: '#ffffff', fontSize: '14px', outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s ease'
    },
    label: { position: 'absolute', left: '16px', top: '14px', color: '#64748b', fontSize: '14px', pointerEvents: 'none', transition: 'all 0.2s ease' },
    eyeButton: { position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', zIndex: 6, outline: 'none' },
    optionsRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' },
    checkboxLabel: { color: '#94a3b8', display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none' },
    checkbox: { marginRight: '8px', cursor: 'pointer' },
    link: { color: '#818cf8', textDecoration: 'none', fontWeight: '500' },
    button: { width: '100%', padding: '14px', backgroundImage: 'linear-gradient(to right, #6366f1, #a855f7)', color: '#ffffff', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.3)', marginTop: '8px' },
    footerText: { textAlign: 'center', color: '#64748b', fontSize: '14px', marginTop: '32px', margin: '32px 0 0 0' }
};

export default Login;