import React, { useState } from 'react'
// import PageNavbar from '../../components/Navbar/PageNavbar'
// import { leagueOfficeNavData } from '../../utils/constants'
import Awards from './components/Awards/Awards'
import FreeAgency from './components/FreeAgency/FreeAgency'
import HallofFame from './components/HallofFame/HallofFame'
import Rulebook from './components/Rulebook/Rulebook'
import TradeMarket from './components/TradeMarket/TradeMarket'

function LeagueOffice() {
  const [type, setType] = useState("Rulebook")

  return (
    <>
    {/* <PageNavbar data={leagueOfficeNavData} setter={setType} activeKey={type} /> */}
    {{
      'Awards': <Awards />,
      'FreeAgency': <FreeAgency />,
      'Rulebook': <Rulebook />,
      'HallofFame': <HallofFame />,
      'TradeMarket': <TradeMarket />
    }[type]}
    </>
  )
}

export default LeagueOffice