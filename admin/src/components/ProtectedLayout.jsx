import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from '../axios';
import { useAuth } from '../contexts/AuthContext';

export default function DefaultLayout() {
	const { user, setUser } = useAuth();

	// check if user is logged in or not from server
	useEffect(() => {
		(async () => {
			try {
				const resp = await axios.get('/user');
				if (resp.status === 200) {
					setUser(resp.data.data);
				}
			} catch (error) {
				if (error.response.status === 401) {
					localStorage.removeItem('user');
					<Navigate to="/" />;
				}
			}
		})();
	}, []);

	// if user is not logged in, redirect to login page
	if (!user) {
		return <Navigate to="/" />;
	}


	return (
		<>
			<main>
				<Outlet />
			</main>
		</>
	);
}
