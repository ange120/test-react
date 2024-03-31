import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CouterBTN, CounterBtnClass, CouterBtnFunc } from './shared'

export function App() {
  const [cars, setCars] = useState()

  useEffect(() => {
    fetch('https://myfakeapi.com/api/cars')
      .then(async res => {
        if (res.ok) {
          const response = await res.json()
          setCars(response.cars)
        }
      })
  }, [])

  return (
    <div>
      {cars?.length && cars.slice(0, 10).map((el, idx) => (
        <button key={idx}>
          <p>{el.car} {el.car_model}</p>
        </button>
      ))}
    </div>
  )

  /* return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>Class</p>
        <CounterBtnClass
          initial={localStorage.getItem('couterValue')}
        />
      </div>
      <div className="card">
        <p>Function</p>
        <CouterBtnFunc
          initial={localStorage.getItem('couterValue')}
        />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  ) */
}