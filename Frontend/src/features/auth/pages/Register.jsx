import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  const navigate = useNavigate();
  const { loading, handleRegister } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // 👈 Yeh line browser ko refresh hone se rokti hai. Iska hona bohot zaroori hai!
    try {
      console.log("Hook call ho raha hai...", { username, email, password });
      await handleRegister({ username, email, password });
      console.log("Registration complete!");
      navigate('/');
    } catch (error) {
      console.error("Koi galti hui:", error);
    }
  };
   if(loading){
        return (<main><h1>Please Wait Loading ......</h1></main>)
        }
  return (
    <main style={styles.mainContainer}>

      {/* Left Section: Form Split layout */}
      <section style={styles.formSection}>
        <div style={styles.formCard}>
          <div style={styles.header}>
            <h2 style={styles.title}>Create Account</h2>
            <p style={styles.subtitle}>Get started with your free account today</p>
          </div>

          <form style={styles.form} onSubmit={handleSubmit}>
            {/* Username */}
            <div style={styles.inputGroup}>
              <input
                type="text"
                id="username"
                required
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
                placeholder=" "
              />
              <label htmlFor="username" style={styles.label}>Username</label>
            </div>

            {/* Email */}
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

            {/* Password with inline toggle eye */}
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

            <label style={styles.checkboxLabel}>
              <input type="checkbox" required style={styles.checkbox} />
              I agree to the Terms & Conditions
            </label>

            <button type="submit" style={styles.button} className="premium-pop-btn">
              Sign Up
            </button>
          </form>

          <p style={styles.footerText}>
            Already have an account?
            <a href="/login" style={styles.link}> Sign In</a>
          </p>
        </div>
      </section>

      {/* Right Section: Premium Abstract Gen AI Mesh Panel */}
      <section style={styles.visualSection}>
        <div style={styles.aiMeshOverlay}></div>
        <div style={styles.visualContent}>
          <h1 style={styles.visualTitle} className="ai-gradient-text">
            Explore the <br />Next Gen AI
          </h1>
          <p style={styles.visualSubtitle}>
            Join us and unleash the true potential of artificial intelligence, neural networks, and automated machine learning orchestration.
          </p>
        </div>
        <div style={{ ...styles.orb, ...styles.orb1 }}></div>
        <div style={{ ...styles.orb, ...styles.orb2 }}></div>
      </section>

      {/* Embedded CSS Style Rules */}
      <style>{`
                input:focus ~ label,
                input:not(:placeholder-shown) ~ label {
                    top: -10px !important;
                    font-size: 12px !important;
                    color: #a855f7 !important;
                    background-color: #111029 !important;
                    padding: 0 6px !important;
                    border-radius: 4px;
                }
                .ai-gradient-text {
                    background: linear-gradient(135deg, #ffffff 30%, #c084fc 70%, #6366f1 100%);
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                }
                .premium-pop-btn {
                    position: relative; overflow: hidden;
                    transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.2s ease !important;
                }
                .premium-pop-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 24px -5px rgba(168, 85, 247, 0.5); }
                .premium-pop-btn:active { transform: scale(0.95) translateY(0); box-shadow: 0 5px 10px -3px rgba(168, 85, 247, 0.3); }
                .premium-pop-btn::after {
                    content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent); transition: all 0.6s ease;
                }
                .premium-pop-btn:hover::after { left: 100%; }
            `}</style>
    </main>
  );
};

const styles = {
  mainContainer: { display: 'flex', minHeight: '100vh', width: '100%', backgroundColor: '#0b0f19', fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif", overflow: 'hidden' },
  formSection: { flex: '1', display: 'flex', alignItems: 'center', justifyCenter: 'center', padding: '40px', backgroundColor: '#0f1322', zIndex: 5, justifyContent: 'center' },
  formCard: { width: '100%', maxWidth: '400px' },
  header: { marginBottom: '36px' },
  title: { fontSize: '32px', color: '#ffffff', fontWeight: '700', margin: '0 0 10px 0', letterSpacing: '-0.5px' },
  subtitle: { fontSize: '14px', color: '#94a3b8', margin: 0 },
  form: { display: 'flex', flexDirection: 'column', gap: '24px' },
  inputGroup: { position: 'relative', width: '100%' },
  input: { width: '100%', padding: '16px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', color: '#ffffff', fontSize: '14px', outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s ease' },
  label: { position: 'absolute', left: '16px', top: '16px', color: '#64748b', fontSize: '14px', pointerEvents: 'none', transition: 'all 0.2s ease' },
  eyeButton: { position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', zIndex: 6, outline: 'none' },
  checkboxLabel: { color: '#94a3b8', fontSize: '13px', display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none', marginTop: '4px' },
  checkbox: { marginRight: '10px', cursor: 'pointer' },
  button: { width: '100%', padding: '16px', backgroundImage: 'linear-gradient(to right, #a855f7, #6366f1)', color: '#ffffff', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 10px 20px -5px rgba(168, 85, 247, 0.4)', marginTop: '8px' },
  link: { color: '#c084fc', textDecoration: 'none', fontWeight: '500' },
  footerText: { textAlign: 'center', color: '#64748b', fontSize: '14px', margin: '36px 0 0 0' },
  visualSection: { flex: '1.2', position: 'relative', backgroundColor: '#0a091d', backgroundImage: 'radial-gradient(at 0% 0%, rgba(30, 27, 75, 0.4) 0, transparent 50%), radial-gradient(at 100% 100%, rgba(46, 16, 101, 0.4) 0, transparent 50%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px', boxSizing: 'border-box', overflow: 'hidden', borderLeft: '1px solid rgba(255, 255, 255, 0.05)' },
  aiMeshOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.06, backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54 48c-2 0-3 1-4 2v4c1 1 2 2 4 2s3-1 4-2v-4c-1-1-2-2-4-2zm-24 0c-2 0-3 1-4 2v4c1 1 2 2 4 2s3-1 4-2v-4c-1-1-2-2-4-2zm-24 0c-2 0-3 1-4 2v4c1 1 2 2 4 2s3-1 4-2v-4c-1-1-2-2-4-2zm24-24c-2 0-3 1-4 2v4c1 1 2 2 4 2s3-1 4-2v-4c-1-1-2-2-4-2zm0-24c-2 0-3 1-4 2v4c1 1 2 2 4 2s3-1 4-2V6c-1-1-2-2-4-2z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`, zIndex: 2 },
  visualContent: { maxWidth: '480px', zIndex: 4, textAlign: 'left' },
  visualTitle: { fontSize: '48px', fontWeight: '800', lineHeight: '1.15', marginBottom: '20px', letterSpacing: '-1.5px' },
  visualSubtitle: { fontSize: '16px', color: '#94a3b8', lineHeight: '1.65', margin: 0, fontWeight: '400', letterSpacing: '0.2px' },
  orb: { position: 'absolute', borderRadius: '50%', filter: 'blur(110px)', opacity: 0.35, zIndex: 1 },
  orb1: { top: '-5%', right: '-5%', width: '450px', height: '450px', backgroundColor: '#4f46e5' },
  orb2: { bottom: '5%', left: '-5%', width: '400px', height: '400px', backgroundColor: '#a855f7' }
};

export default Register;