
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './auth/Login';
import { Register } from './auth/Register';
import { NavBar } from './nav/NavBar';
import { ApplicationViews } from './views/ApplicationViews';
import { Authorized } from './views/Authorized';

//import { ThirstForTravel } from './ThirstForTravel';


function App() {

  return <>
   <h1 className='title'>Off the Beaten Path</h1>
   <Routes>
        <Route path="/login" element={<Login />} />
		  <Route path="/register" element={<Register />} />  

		<Route path="*" element={
			<Authorized>
				<>
					<NavBar />
					<ApplicationViews />
				</>
			</Authorized>

		} />
	</Routes>
   </>
}

export default App;
