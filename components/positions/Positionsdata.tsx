'use client'

import { useState, useEffect } from 'react'
import './positions.css'
import Image from 'next/image'
import EthereumIcon from '@/public/EthereumIcon.svg'
import Cookies from 'universal-cookie'
import './positionstitle.css'
import share from '@/public/shareicon.png'


function Positions() {
  const [notransfer,setNotransfer] = useState(true)
  const [tableData, setTableData] = useState([{
    id: 3,
    user: 2,
    market: "ETH-USD",
    long: true,
    size: 1.0,
    leverage: 20.0,
    realized_PL: 0.24,
    average_open: 2000.0,
    created_date: "2023-12-17T13:03:48.726063Z",
    updated_date: "2023-12-17T13:03:48.726071Z",
    unrealized_profit: 235.4,
    liq_price: 0,
    oracle: 2235.4,
    bying_power: 2000000.0,
    equity: 101706.21,
    size_dollar: 2235.4,
    margin_usage: 0.3,
    balance: 100000.0,
    account_leverage: 15.0,
    un_profit_perc:2}])


const [loading,setLoading] = useState(true)
const humanize = require('humanize-number')
  useEffect(() => {
    const fetchData = async () => {
      const cookieStore = new Cookies()
      const access = cookieStore.get('access')
      let jwt = ''
      if (access){
          
          jwt = 'Bearer '+ access
      }
      try{
        const response = await fetch("http://45.195.250.168/dydx/api/v1/positions/",{
          cache:'no-store',
          headers:{
              'Authorization': jwt,
              "Content-Type":"application/json"
          }})
        if (response.status==200){
          const data = await response.json()
          setTableData(data)
          setLoading(false)
          if (data[0].hasOwnProperty('size')){
            setNotransfer(false)
          }else{
            setNotransfer(true)
            console.log('yesss') 
          }
          }
        }catch{
          console.log('yesss') 
        }
      
      }
// Fetch data initially
      fetchData()

// Fetch data every 2 seconds
      const intervalId = setInterval(fetchData, 3000);

// Cleanup the interval on component unmount
      return () => clearInterval(intervalId);
    
}, [])


  return (
    <div>
      <div className={notransfer?'share-position-noposition':'share-position'}>
        <div className={"h2-position"}>Open Positions</div>
        {!notransfer?
        <div>
        <button className={'buttonshare'}><Image width={55} height={55} src={share} alt=''/></button>
        </div>:null}
        </div>
      <div className={'positionsheader'}>
        <div className={'titlemarket'}>
          <p>Market</p>
          <span className={'titleside'}>Side</span>
          </div>

        <div className={'titlesize-position'}>
          <p>Size</p>
          <span className={'titleleverage'}>Leverage</span>
          </div>

        <div className={'titleUnrealized'}>
          <p>Unrealized P&L</p>
          <span className={'titleRealized'}>Realized P&L</span>
          </div>

        <div className={'titleLiq-position'}>
          <p>Liq. Price</p>
          <span className={'titleoracle'}>Oracle</span>
          </div>
      </div>
      {notransfer?
      <div className='positiondata'>
      <div className='noposition'>
        <p>You have no open positions.</p>
        </div> 
      </div>:
  <div className='all-positions'>
      {tableData.map((pos)=>(
      <div key={pos.id} className='positiondata'>
        <div className='asset-logo'>
        <Image width={35} height={50} src={EthereumIcon} alt=''/>
          </div> 
        <div className='position-market'>
          <p>{pos.market}</p>
          <span className={pos.long?'sidelong':'sideshort'}>{pos.long?'Long':'Short'}</span>
          </div> 

        <div className='position-size'>
          <p>{humanize(pos.size)}</p>
          <span className='position-leverage'>{humanize(pos.leverage)}×</span>
          </div>

        <div className={pos.unrealized_profit>0?'position-unpl-long':
                        pos.unrealized_profit==0?'position-unpl-nutral':'position-unpl-short'}>
          <p>{pos.unrealized_profit<0?'-$'+(humanize(-pos.unrealized_profit)):'$'+humanize(pos.unrealized_profit)}</p>

          <span className={pos.realized_PL>0?'position-repl-long':
                        pos.realized_PL==0?'position-repl-nutral':'position-repl-short'}>
            {pos.realized_PL<0?'-$'+(humanize(-pos.realized_PL)):
          '$'+humanize(pos.realized_PL)}</span>
          </div>

        <div className='type'>
          <p>{pos.liq_price == 0? '-':'$'+humanize(pos.liq_price)}</p>
          <span className='liquidity'>${humanize(pos.oracle)}</span>
          </div>
    </div>
    ))}</div>}
  </div>

  )}

  

export default Positions
  
