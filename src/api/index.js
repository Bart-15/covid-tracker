import axios from 'axios'

//This is the API URL
const url = 'https://covid19.mathdro.id/api'

const fetchData = async (country) => {
  let changeableUrl = url;

  if(country) {
    changeableUrl = `${url}/countries/${country}`
  }
  try{
    const {data : {confirmed, recovered, deaths, lastUpdate}} = await axios.get(changeableUrl)

    return {confirmed, recovered, deaths, lastUpdate}
    
  }catch (error) {
    console.log(error)
  }
}

//Make a request from the api and map them
const fetchDailyData = async () => {
  try{
    const {data} = await axios.get(`${url}/daily`)

    const modifiedData = data.map((dailyData) => ({
      confirmed : dailyData.confirmed.total,
      deaths : dailyData.deaths.total,
      date : dailyData.reportDate
    }))

    return modifiedData;
    
  } catch(error) {
    console.log(error)
  }
}


//Make a request from api wioth selectedCountry
const fetchCountries = async () => {
  try {
    // const response = await axios.get(`${url}/countries`)
  
    // console.log(response)

    const {
      data: { countries },
    } = await axios.get(`${url}/countries`)

    return countries.map((country) => country.name)
  } catch(error) {

  }
}

export { fetchData, fetchDailyData, fetchCountries }
