import React from 'react'

import styles from './Profile.module.css'

const Profile = () => (
  <div className={styles.ProfileContainer}>
    <div className={styles.ProfileMain}>
      <div>
        <h1>Profile</h1>
      </div>
      <div>
        <h3>Name</h3>
        <p>User One</p>
        <div className={styles.paddingBottom} />
      </div>
    </div>
  </div>
)

export default Profile
