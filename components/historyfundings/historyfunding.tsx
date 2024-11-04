'use client'

import './fundinghistorytitle.css'

function HistoryFunding() {
  
  return (
    <div>
        {/* title section */}
        <div className={'positionsheader'}>
        <div className={'funding-titlemarket'}>
          <p>Market</p>
          <span className={'funding-titlefundingrate'}>Funding Rate</span>
          </div>

        <div>
          <p className={'funding-titleapayment'}>Payment</p>
          </div>


          <div>
          <p className={'funding-titleposition'}>Position</p>
          </div>
      </div>

    {/* all transfers section */}
    <div className='positiondata'>
      <div className='noposition'>
        <p>You have no past funding payments.</p>
        </div> 
    </div>
  </div>
  )
}

export default HistoryFunding
  