import { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGitHubLogin = () => {
    setIsLoading(true);
    const isProduction = import.meta.env.PROD;
    const BACKEND_URL = isProduction ? import.meta.env.VITE_BACKEND_URL : 'http://localhost:3000';

    window.location.href = `${BACKEND_URL}/api/auth/github`;
  };

  return (
    <div className="split-screen">
      <div className="form-panel">
        <div className="form-container">
          <h1 className="welcome-title">Welcome back</h1>
          <p className="welcome-subtitle">Sign in to Insighta Labs+</p>

          <div className="email-field">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="separator">
            <div></div>
            <span>OR</span>
            <div></div>
          </div>

          <button className="oauthButton github-btn" onClick={handleGitHubLogin} disabled={isLoading}>
            <svg className="github-icon" viewBox="0 0 24 24" width="20" height="20">
              <path
                fill="currentColor"
                d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.26.82-.58 0-.287-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.3-.535-1.52.117-3.16 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.653 1.64.24 2.86.118 3.16.768.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.62-5.476 5.92.43.37.824 1.102.824 2.22 0 1.602-.015 2.894-.015 3.287 0 .322.216.698.83.578C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"
              />
            </svg>
            {isLoading ? 'Redirecting...' : 'Continue with GitHub'}
          </button>

          <p className="terms">
            By signing in, you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.
          </p>
        </div>
      </div>

      <div className="visual-panel">
        <div className="branding">
          <div className="logo-large">Insighta Labs+</div>
          <p className="tagline">Intelligent profile analytics at your fingertips</p>
          <div className="mock-illustration">
            <div className="illustration-placeholder">
              <span className="emoji-big">Data</span>
              <span className="mock-text">Real-time analytics, natural language search, and secure access.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
