import React from 'react'
import { Cards, Chart, CountryPicker, Footer } from './components'
import styles from './App.module.css'
import virus from './images/corona.png'
import { fetchData } from './api'
import Loader from 'react-loader-spinner'

class App extends React.Component {

  state = {
    data: {},
    country: '',
  }
  async componentDidMount() {
    const fetchedData = await fetchData()
    this.setState({ data: fetchedData })
    
  }
  
  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country)


    // console.log(fetchedData)
    // console.log(country)
    
    this.setState({data: fetchedData, country: country})
  }
  render() {
    const { data, country } = this.state
   
    return (
      <div className={styles.container}>
        <Loader
          className={styles.loading}
          type='TailSpin'
          color='#5eff8c'
          height={100}
          width={100}
          timeout={4000} //3 secs
        />
        <p className={styles.title}>
          C<img className={styles.virus} src={virus} alt='' />
          vid-19
        </p>
        <Cards data={data} country={country} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
        <Footer />
      </div>
    )
  }
}

export default App
