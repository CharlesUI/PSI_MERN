import './componentStyles.css'
import { SlLogout } from 'react-icons/sl'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

const NavBar = () => {
  const { state } = useAuthContext()

  console.log("Initial State in the Nav Component", state)

  const { logout } = useLogout()

  const handleLogout = ():void => {
    logout()
  }
 
  return (
    <header>
      {
        !state.user ? (
          <div>LOGO</div>
        ) : (
          <nav className="nav-container">
        <div className="home-logo">
          <Link to={"/"}>Home</Link>
        </div>
          <div className="user-nav nav">
            <div className="user-nav-links">
              <Link to={"/inventory"}>Inventory</Link>
              <Link to={"/records"}>Records</Link>
            </div>
            <div className="user-nav-profile">
              <p>{state.user?.adminUser}</p>
              {state.user?.adminUser ? <button onClick={handleLogout} className="log-out-btn" ><SlLogout /></button> : null }
            </div>
          </div>
          {/* <div className="log-nav nav">
            <Link to={"/login"}>login</Link>
          </div> */}
      </nav>
        )
      }
    </header>
  )
}

export default NavBar