import React from 'react'

import styles from './UploadNewKpiSet.module.css'

const UploadNewKpiSet = ({uploadNew=()=>{}}) => (
  <div>
    <div onClick={uploadNew} className={styles.uploadButton}>Upload New</div>
    <div className={styles.orTextContainer}>
      <div className={styles.separationLine} />
      <div className={styles.orText}>or choose from<br/>existing sets of calculated KPIs</div>
    </div>
  </div>
)

export default UploadNewKpiSet
