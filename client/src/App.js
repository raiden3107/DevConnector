import React, {
  Fragment, useEffect
} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Navbar from './Components/Layout/Navbar'
import Landing from './Components/Layout/Landing'
import Register from './Components/Auth/Register'
import Login from './Components/Auth/Login'
import { Provider } from 'react-redux'
import store from './store'
import Alert from './Components/Layout/Alert'
import { loadUser } from './actions/register'
import PrivateRoute from './Components/routing/PrivateRoute'
import Dashboard from './Components/dashboard/Dashboard'
import setAuthToken from './utils/setAuthToken';
import CreateProfile from './Components/profileForms/CreateProfile'
import EditProfile from './Components/profileForms/EditProfile'
import AddExperience from './Components/profileForms/AddExperience'
import AddEducation from './Components/profileForms/AddEducation'
import Profiles from './Components/Profiles/Profiles'
import Profile from './Components/Profile/Profile'
import Posts from './Components/Posts/Posts'
import Post from './Components/Post/Post'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}


const App = () => {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/profile/:id' component={Profile} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/create-profile' component={CreateProfile} />
              <PrivateRoute exact path='/edit-profile' component={EditProfile} />
              <PrivateRoute exact path='/add-experience' component={AddExperience} />
              <PrivateRoute exact path='/add-education' component={AddEducation} />
              <PrivateRoute exact path='/posts' component={Posts} />
              <PrivateRoute exact path='/posts/:id' component={Post} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>)
}
export default App;