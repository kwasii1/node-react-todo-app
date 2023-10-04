import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import './App.css'
import Login from './containers/auth/Login'
import Home from './containers/Home'
import Register from './containers/auth/Register'
import AddTask from './containers/AddTask'
import ViewTask from './containers/ViewTask'
import EditTask from './containers/EditTask'
import Profile from './containers/Profile'
import EditProfile from './containers/EditProfile'

function App() {
	
	return (
		<Router>
			<Routes>
				<Route exact path='/' element={<Home/>} />
				<Route path="/login" Component={Login} />
				<Route path="/register" Component={Register} />
				<Route path="/addtask" Component={AddTask} />
				<Route path="/viewtask" Component={ViewTask} />
				<Route path="/edittask" Component={EditTask} />
				<Route path="/profile" Component={Profile} />
				<Route path="/editprofile" Component={EditProfile} />
			</Routes>
		</Router>
		)
	}
	
	export default App
	