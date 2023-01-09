import { Route, Routes } from 'react-router-dom';
import { Admin } from './pages/Admin/Admin';
import { Client } from './pages/Client/Client';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Client />} />
				<Route path='/admin/*' element={<Admin />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
			</Routes>
		</div>
	);
}

export default App;
