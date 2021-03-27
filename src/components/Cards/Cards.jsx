import React from 'react'
import { Card, CardContent, Typography, Grid } from '@material-ui/core'
import CountUp from 'react-countup'
import styles from './Cards.module.css'
import cx from 'classnames'
const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate }, country }) => {
  if (!confirmed) {
    return ''
  }
  
  const active = confirmed.value - (recovered.value + deaths.value)
  console.log(active)

  let cardDetails = [
    {
      style: styles.infected,
      text: 'Infected',
      value: confirmed.value,
      description: 'Number of infected cases of COVID-19',
    },
    {
      style: styles.recovered,
      text: 'Recovered',
      value: recovered.value,
      description: 'Number of infected cases of COVID-19',
    },
    {
      style: styles.death,
      text: 'Deaths',
      value: deaths.value,
      description: 'Number of infected cases of COVID-19',
    },
    {
      style: styles.death,
      text: 'Active Cases Today',
      value: active,
      description: 'Number of active cases of COVID-19',
    },
  ]
  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify='center'>
        {cardDetails.map((detail, index) => {
          return (
            <>
              <Grid
                item
                component={Card}
                xs={12}
                md={2}
                className={cx(styles.card, detail.style)}
                key={index}
              >
                <CardContent key={index}>
                  <Typography color='initial' gutterBottom>
                    {detail.text}
                  </Typography>
                  <Typography variant='h5'>
                    <CountUp
                      start={0}
                      end={detail.value}
                      duration={3}
                      separator=','
                    ></CountUp>
                  </Typography>
                  <Typography color='initial'>
                    {new Date(lastUpdate).toDateString()}
                  </Typography>
                  <Typography variant='body2'>
                    {country
                      ? ` ${detail.description} in the ${country}`
                      : detail.description}
                  </Typography>
                </CardContent>
              </Grid>
            </>
          )
        })}
      </Grid>
    </div>
  )
}

export default Cards
