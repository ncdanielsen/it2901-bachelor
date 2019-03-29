import React from 'react'

import styles from './KpiSetListItem.module.css'

import moment from 'moment'

const NameAndDates = ({kpiSetName, dateCreated, dateLastUpdated}) => (
  <div className={styles.kpiSection}>
    <div className={styles.kpiNameLabel}>Name</div>
    <div className={styles.kpiName}>{kpiSetName}</div>
    <div className={styles.kpiDates}>
      <div>
        Created: {moment(dateCreated).format('DD.MM.YY')}
      </div>
      <div>
        Last updated: {moment(dateLastUpdated).format('DD.MM.YY')}
      </div>
    </div>
  </div>
)

const Building = ({buildingName, viewBuildingDetails}) => (
  <div className={styles.kpiSection}>
    <div className={styles.kpiNameLabel}>Building</div>
    <div className={styles.kpiName}>{buildingName}</div>
    <div onClick={viewBuildingDetails} className={styles.viewDetailsButton}>
      View Details
    </div>
  </div>
)

const DataOwner = ({owner}) => (
  <div className={styles.kpiSection}>
    <div className={styles.kpiNameLabel}>Owner</div>
    <div className={styles.kpiName}>{owner}</div>
  </div>
)

const Description = ({description}) => (
  <div className={styles.kpiSection}>
    <div className={styles.kpiNameLabel}>Description</div>
    <div className={styles.kpiName}>{description}</div>
  </div>
)

const Buttons = ({editKpiSet, selectKpiSet, kpiSetName}) => (
  <div className={styles.kpiButtonSection}>
    <div className={styles.kpiOptionTop}>
      <div onClick={editKpiSet} className={styles.editButton}>
        Edit
      </div>
    </div>
    <div onClick={selectKpiSet} className={styles.kpiOptionBottom}>
      <div className={styles.selectButton}>
        Select
      </div>
    </div>
  </div>
)

const KpiSetListItem = ({isCalculatedKpi, showOwner, kpiSet, editKpiSet, selectKpiSet, description="", viewBuildingDetails=()=>{}}) => (
  <div className={isCalculatedKpi ? styles.kpiSet : styles.rKpiSet}>
    <NameAndDates kpiSetName={kpiSet.name} dateCreated={kpiSet.created} dateLastUpdated={kpiSet.lastUpdated} />
    {
      isCalculatedKpi
      ? <Building buildingName={kpiSet.building.name} viewBuildingDetails={viewBuildingDetails} />
      : <Description description={description}  />
    }
    {
      showOwner
      ? <DataOwner owner={kpiSet.owner}/>
      : <div />
    }
    <Buttons editKpiSet={editKpiSet} selectKpiSet={selectKpiSet} />
  </div>
)

export default KpiSetListItem
