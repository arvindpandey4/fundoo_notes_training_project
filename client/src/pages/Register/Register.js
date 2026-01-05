import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Register.scss';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        setLoading(true);

        try {
            const { confirmPassword, ...registerData } = formData;
            await register(registerData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="register-page">
            <div className="register-card">
                <div className="register-content">
                    <div className="register-form-section">
                        <div className="google-logo">
                            <span style={{ color: '#4285F4' }}>G</span>
                            <span style={{ color: '#EA4335' }}>o</span>
                            <span style={{ color: '#FBBC05' }}>o</span>
                            <span style={{ color: '#4285F4' }}>g</span>
                            <span style={{ color: '#34A853' }}>l</span>
                            <span style={{ color: '#EA4335' }}>e</span>
                        </div>
                        <h2 className="register-heading">Create your Google Account</h2>

                        {error && <div className="error-message">{error}</div>}

                        <form onSubmit={handleSubmit} className="register-form">
                            <div className="form-row">
                                <div className="form-group half-width">
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First name"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group half-width">
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last name"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Username"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                />
                                <span className="helper-text">You can use letters, numbers & periods</span>
                            </div>

                            <div className="current-email-link-container">
                                <button type="button" className="btn-link">Use my current email instead</button>
                            </div>

                            <div className="form-row password-row">
                                <div className="form-group half-width">
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group half-width">
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            <div className="password-helper-text">
                                Use 8 or more characters with a mix of letters, numbers & symbols
                            </div>

                            <div className="show-password-container">
                                <input type="checkbox" id="showPass" />
                                <label htmlFor="showPass">Show Password</label>
                            </div>

                            <div className="form-actions">
                                <Link to="/login" className="sign-in-link">
                                    Sign in instead
                                </Link>
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Creating...' : 'Next'}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="register-graphic-section">
                        <div className="shield-graphic">
                            <svg viewBox="0 0 244 244" width="244" height="244" className="shield-svg">
                                {/* Simple representation of the shield graphic */}
                                <path fill="#E8F1FC" d="M122 244C122 244 122 244 122 244C54.6 244 0 189.4 0 122C0 54.6 54.6 0 122 0C189.4 0 244 54.6 244 122C244 189.4 189.4 244 122 244Z" />
                                <path fill="#4285F4" d="M122,25.6c-51.2,0-92,40.8-92,92c0,50.4,40.8,92,92,92s92-40.8,92-92C214,66.4,173.2,25.6,122,25.6z M122,176.4c-32.4,0-58.8-26.4-58.8-58.8s26.4-58.8,58.8-58.8s58.8,26.4,58.8,58.8S154.4,176.4,122,176.4z" />
                                {/* Just a basic blue circle shield concept placeholder since exact SVG path is complex */}
                                <rect x="90" y="90" width="64" height="64" rx="32" fill="white" />
                                <path fill="#4285F4" d="M122,122L122,122c0,15,14,35,14,35s14-20,14-35h0c0-8-6-14-14-14S122,114,122,122z" />
                            </svg>
                            <p className="graphic-caption">One account. All of Google working for you.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
