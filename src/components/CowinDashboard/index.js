// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationCoverage from '../VaccinationCoverage'
import './index.css'

const fetchState = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class CowinDashboard extends Component {
  state = {
    fetchStatus: 'INITIAL',
    vaccineCoverage: [],
    vaccinationByAge: [],
    vaccinationByGender: [],
  }

  componentDidMount() {
    this.getFetchCovidDetail()
  }

  getFetchCovidDetail = async () => {
    this.setState({fetchStatus: fetchState.loading})
    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    const data = await response.json()
    if (response.ok) {
      const updateVaccineCoverage = data.last_7_days_vaccination.map(item => ({
        dose1: item.dose_1,
        dose2: item.dose_2,
        vaccineDate: item.vaccine_date,
      }))
      this.setState({
        vaccineCoverage: updateVaccineCoverage,
        fetchStatus: fetchState.success,
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      })
    } else {
      this.setState({fetchStatus: fetchState.failure})
    }
  }

  renderSuccessPage = () => {
    const {vaccineCoverage, vaccinationByAge, vaccinationByGender} = this.state
    console.log(vaccineCoverage)

    return (
      <>
        <div className="card-container">
          <h1 className="card-heading">Vaccination Coverage</h1>
          <VaccinationCoverage coverageList={vaccineCoverage} />
        </div>
        <div className="card-container">
          <h1 className="card-heading">Vaccination by gender</h1>
          <VaccinationByGender byGenderDetails={vaccinationByGender} />
        </div>
        <div className="card-container">
          <h1 className="card-heading">Vaccination by Age</h1>
          <VaccinationByAge byAgeDetails={vaccinationByAge} />
        </div>
      </>
    )
  }

  renderFailurePage = () => (
    <div className="fail-cont">
      <img
        className="fail-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderFailureView = () => (
    <div data-testid="loader" className="loader-con">
      <Loader type="ThreeDots" color="#fff" width={50} height={50} />
    </div>
  )

  renderDisplayPage = () => {
    const {fetchStatus} = this.state
    switch (fetchStatus) {
      case fetchState.success:
        return this.renderSuccessPage()
      case fetchState.failure:
        return this.renderFailurePage()
      case fetchState.loading:
        return this.renderFailureView()
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
        <div>{this.renderDisplayPage()}</div>
      </div>
    )
  }
}
export default CowinDashboard
