import React from 'react'

import styles from './UploadNewKpiSet.module.css'

const UploadNewKpiSet = ({uploadNew=()=>{}, text=""}) => (
  <div>
    <div onClick={uploadNew} className={styles.uploadButton}>Upload New</div>
    <div className={styles.orTextContainer}>
      <div className={styles.separationLine} />
      <div className={styles.orText}>or choose from<br/>{text}</div>
    </div>
  </div>
)

export default UploadNewKpiSet
