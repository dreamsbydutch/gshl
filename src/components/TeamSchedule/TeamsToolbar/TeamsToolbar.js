import React from 'react'
import { Button, ButtonGroup, Stack } from 'react-bootstrap'
import ErrorPage from '../../../pages/ErrorPage/ErrorPage'
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner'
import './TeamsToolbar.css'
import { useFetchTeams } from '../../../hooks/teams'

function TeamsToolbar(props) {
  const teamsData = useFetchTeams('2021-22')
  if (teamsData.loading) { return <LoadingSpinner /> }
  if (teamsData.error) { return <ErrorPage /> }
  const data = [teamsData.data.filter(obj => obj.Conference === 'HH'),teamsData.data.filter(obj => obj.Conference === 'SV')]
  return (
    <Stack gap={2} className='team-schedule-toolbar justify-content-center'>
        {data.map((group,i) => (
            <ButtonGroup key={i}>
                {group.map((item,j) => (
                    <Button key={j} variant={props.variant} onClick={() => props.setter(item.id)} className={props.active===item.id ? 'active team-toolbar-logo' : 'team-toolbar-logo'} >
                      <img src={item.LogoURL} alt='Team logo' />
                    </Button>
                ))}
            </ButtonGroup>
        ))}
    </Stack>
  )
}

export default TeamsToolbar