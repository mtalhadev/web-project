import React, { useEffect } from 'react';
// import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Home'
import Chat from './Chat'
function App(props) {

  return (
    <div>
      <Router>
      
          <>
            <Route path="/chat" component={Chat} />
            <Route exact path="/" render={(props) => {
              return (
                <React.Fragment>
                  <Home />
                </React.Fragment>
              )
            }} />
          </>
      </Router>
    </div>
  )

}

// const mapStateToProps = state => ({
//   profile: state.profileFetch.profile,
//   profileStaff:state.profileFetch.profileStaff,
//   loginStatus: state.profileFetch.loginStatus,
//   loginHome: state.profileFetch.loginHome,
//   loginStatusStaff:state.profileFetch.loginStatusStaff
// })
// export default connect(mapStateToProps, { fetchProfile, fetchLoginStatus, fetchLoginHome,fetchLoginStatusStaff })(App);
export default App
