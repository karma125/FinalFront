import { Login } from './pages/Log-In/Login';
import { Routes, Route, HashRouter as Router } from 'react-router-dom';
import { Signup } from './pages/Sign-up/Signup';
import { Home } from './pages/Home/Home';
import { useEffect, useState } from 'react';
import { userContext } from './general/userContext';
import { RequireAuth } from './routeGuard';

function App() {
	//const [user, setUser] = useState({ _id: null });
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('loggedUser')) || { _id: null });

	useEffect(() => {
		localStorage.setItem('loggedUser', JSON.stringify(user));
	}, [user]);

	return (
		<userContext.Provider value={{ user, setUser }}>
			<Router>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/signup' element={<Signup />} />
					<Route path='/home/*' element={<Home />} />
				</Routes>
				{/* <AppFooter /> */}
			</Router>
		</userContext.Provider>
	);
}

export default App;
