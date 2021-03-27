import React, {useEffect, useState} from 'react'
import {fetchDailyData} from '../../api'
import {Line, Bar} from 'react-chartjs-2'
import styles from './Chart.module.css'
const Chart = ({data : {confirmed, recovered, deaths}, country}) => {

    const [dailyData, setDailyData] = useState([])

    //Fetch data to dailyData
    const fetchAPI = async () => {
        setDailyData(await fetchDailyData());
    }
    useEffect(() => {
        fetchAPI();
    }, [])

    //Line chart
    const lineChart =
      dailyData.length !== 0 ? (
        <Line
          data={{
            labels: dailyData.map(({ date }) => date),
            datasets: [
              {
                data: dailyData.map(({ confirmed }) => confirmed),
                label: 'Infected',
                borderColor: '#3333ff',
                fill: true,
              },
              {
                data: dailyData.map(({ deaths }) => deaths),
                label: 'Deaths',
                borderColor: 'red',
                fill: true,
              },
              //No data recovered yet
            //   {
            //     data: dailyData(({ recovered }) => recovered),
            //     labels: 'recovered',
            //     borderColor: 'red',
            //     fill: true,
            //   },
            ],
          }}
        />
      ) : (
        ''
      )

      // console.log(confirmed, recovered, deaths)
      const barChart = confirmed ? (
        <Bar
          data={{
            labels: ['Infected', 'Recovered', 'Deaths', 'Active'],
            datasets: [
              {
                label: 'People',
                backgroundColor: ['#ff1717', '#8ab3ff', '#0af7ff'],
                data: [
                  confirmed.value, 
                  recovered.value,
                  deaths.value,
                  confirmed.value - (recovered.value + deaths.value)

                ],
              },
            ],
          }}
          options={{
            legend: { display: false },
            title: { display: true, text: `Current state in ${country}` },
          }}
        />
      ) : (
        'null'
      )

  //  console.log(dailyData)
    return (
        <div className={styles.container}>
            {country ?  barChart : lineChart}
        </div>
    )
}

export default Chart
