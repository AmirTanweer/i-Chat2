import React from 'react'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
const UserDetails = () => {
    const {userdetails}=useContext(AuthContext)
    console.log("userdetails -> ",userdetails)
  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">User Details</h2>
        <div className="row">
          <div className="col-12">
            <p>
              <strong>ID:</strong> {userdetails._id || 'N/A'}
            </p>
          </div>
          <div className="col-12">
            <p>
              <strong>Username:</strong> {userdetails.username || 'N/A'}
            </p>
          </div>
          <div className="col-12">
            <p>
              <strong>Email:</strong> {userdetails.email || 'N/A'}
            </p>
          </div>
        </div>
        <div className="text-center mt-3">
          <button className="btn btn-primary" onClick={() => alert('Profile settings coming soon!')}>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserDetails