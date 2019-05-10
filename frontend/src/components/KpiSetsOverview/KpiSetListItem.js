import React from 'react'

import styles from './KpiSetListItem.module.css'

import { get } from 'lodash'

import moment from 'moment'

const NameAndDates = ({kpiSetName, dateCreated, dateLastUpdated}) => (
  <div className={styles.kpiSection}>
    <div className={styles.kpiNameLabel}>Name</div>
    <div className={styles.kpiName}>{kpiSetName}</div>
    <div className={styles.kpiDates}>
      <div>
        Created: {moment(dateCreated).format('DD.MM.YY') /* pretty date format */}
      </div>
      <div>
        Last updated: {moment(dateLastUpdated).format('DD.MM.YY') /* pretty date format */}
      </div>
    </div>
  </div>
)

const DataOwner = ({owner}) => (
  <div className={styles.kpiSection + " " + styles.ownerSection}>
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

const Buttons = ({editKpiSet, selectKpiSet, kpiSetIsSelected}) => (
  <div className={styles.kpiButtonSection}>
    <div className={styles.kpiOptionTop}>
      <div onClick={editKpiSet} className={styles.editButton}>
        Edit
      </div>
    </div>
    <div onClick={selectKpiSet} className={styles.kpiOptionBottom}>
      <div className={styles.selectButton + (kpiSetIsSelected ? (" " + styles.selectButtonSelected) : "")}>
        {kpiSetIsSelected ? "Unselect" : "Select"}
      </div>
    </div>
  </div>
)


/*
  This component is a list item box showing basic info about a kpiSet,
  with buttons for select and edit
*/

const KpiSetListItem = ({
  kpiSetIsSelected=false,
  isCalculatedKpi=false, // True -> cKpiSet, False -> rKpiSet
  showOwner=false,
  kpiSet={},
  editKpiSet=()=>{}, // function to open edit view
  selectKpiSet=()=>{}, // function to select the set
  //viewBuildingDetails=()=>{}
}) => (
  <div className={(isCalculatedKpi ? styles.kpiSet : styles.rKpiSet) + (kpiSetIsSelected ? (" " + styles.kpiSetSelected) : "")}>
    <NameAndDates
      kpiSetName={get(kpiSet, 'name', '')}
      dateCreated={get(kpiSet, 'created', new Date())}
      dateLastUpdated={get(kpiSet, 'lastUpdated', new Date())}
    />
    <Description description={get(kpiSet, 'description', '')}  />
    { showOwner ? <DataOwner owner={get(kpiSet, 'owner', '')}/> : <div /> }
    <Buttons editKpiSet={editKpiSet} selectKpiSet={selectKpiSet} kpiSetIsSelected={kpiSetIsSelected} />
  </div>
)

export default KpiSetListItem





/*const Building = ({buildingName, viewBuildingDetails}) => (
  <div className={styles.kpiSection}>
    <div className={styles.kpiNameLabel}>Building</div>
    <div className={styles.kpiName}>{buildingName}</div>
    <div onClick={viewBuildingDetails} className={styles.viewDetailsButton}>
      View Details
    </div>
  </div>
)*/

/*{isCalculatedKpi
? <Building buildingName={kpiSet.building.name} viewBuildingDetails={viewBuildingDetails} />
: <Description description={description}  />}*/
