import React from 'react'
import { currentSeason } from '../../../../utils/constants'
import { usePlayerSalaries } from '../../../../utils/fetchData'

const TeamPlayerSaleries = () => {
    console.log(usePlayerSalaries(currentSeason.key).data)

    return (
    <div>TeamPlayerSaleries</div>
  )
}

export default TeamPlayerSaleries