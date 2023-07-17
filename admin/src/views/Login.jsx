import React from 'react';
import { Navigate } from 'react-router-dom';
import axios from '../axios';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
	const { setUser, csrfToken } = useAuth();
	const [error, setError] = React.useState(null);

	// login user
	const handleSubmit = async (e) => {
		e.preventDefault();
		const { email, password } = e.target.elements;
		const body = {
			email: email.value,
			password: password.value,
		};
		await csrfToken();
		try {
			const resp = await axios.post('/login', body);
			if (resp.status === 200) {
				setUser(resp.data.user);
				return <Navigate to="/admin" />;
			}
		} catch (error) {
			if (error) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<section style={{ background: '#0f2557', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<div style={{ background: '#FFF', borderRadius: '0.5rem', width: '20vw', padding: '3rem' }}>
					<h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem', color: '#1F2937' }}>Sign in to your account</h1>
					{error && (
						<div style={{ padding: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem', color: '#EF4444', background: '#FEE2E2', borderRadius: '0.375rem' }}>
							{error}
						</div>
					)}
					<form onSubmit={handleSubmit}>
						<div style={{ marginBottom: '1rem' }}>
							<label htmlFor="email" style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 'medium', color: '#1F2937' }}>Your email</label>
							<input
								type="email"
								name="email"
								id="email"
								style={{
									background: '#FFF',
									border: '1px solid #D1D5DB',
									color: '#1F2937',
									fontSize: '0.875rem',
									borderRadius: '0.375rem',
									padding: '0.625rem',
									width: '100%',
								}}
								placeholder="name@company.com"
								required
							/>
						</div>
						<div style={{ marginBottom: '1rem' }}>
							<label htmlFor="password" style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 'medium', color: '#1F2937' }}>Password</label>
							<input
								type="password"
								name="password"
								id="password"
								style={{
									background: '#FFF',
									border: '1px solid #D1D5DB',
									color: '#1F2937',
									fontSize: '0.875rem',
									borderRadius: '0.375rem',
									padding: '0.625rem',
									width: '100%',
								}}
								placeholder=""
								required
							/>
						</div>
						<button
							type="submit"
							style={{
								width: '100%',
								background: '#3B82F6',
								color: '#FFF',
								fontSize: '0.875rem',
								borderRadius: '0.375rem',
								padding: '0.625rem',
								textAlign: 'center',
								outline: 'none',
								border: 'none',
								cursor: 'pointer',
							}}
						>
							Sign in
						</button>
					</form>
				</div>
			</div>
		</section>
	);
}
