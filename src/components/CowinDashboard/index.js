// Write your code here
import {Component} from 'react'

import VaccinationCoverage from '../VaccinationCoverage'
import './index.css'

const fetchState = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class CowinDashboard extends Component {
  state = {fetchStatus: 'INITIAL', vaccineCoverage: []}

  componentDidMount() {
    this.getFetchCovidDetail()
  }

  getFetchCovidDetail = async () => {
    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    const data = await response.json()
    console.log(data)
    const updateVaccineCoverage = data.last_7_days_vaccination.map(item => ({
      dose1: item.dose_1,
      dose2: item.dose_2,
      vaccineDate: item.vaccine_date,
    }))
    this.setState({
      vaccineCoverage: updateVaccineCoverage,
      fetchStatus: fetchState.success,
    })
  }

  renderSuccessPage = () => {
    const {vaccineCoverage} = this.state
    console.log(vaccineCoverage)

    return (
      <>
        <VaccinationCoverage coverageList={vaccineCoverage} />
      </>
    )
  }

  renderDisplayPage = () => {
    const {fetchStatus} = this.state
    switch (fetchStatus) {
      case fetchState.success:
        return this.renderSuccessPage()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-con">
        <div className="main-icon-con">
          <img
            className="plus-icon"
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <p className="main-icon-name">Co-WIN</p>
        </div>
        <h1 className="main-heading">CoWIN Vaccination in India</h1>
        {this.renderDisplayPage()}
      </div>
    )
  }
}
export default CowinDashboard
