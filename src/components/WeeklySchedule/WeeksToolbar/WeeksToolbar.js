import React from 'react'
import { Button, ButtonGroup, Stack } from 'react-bootstrap'
import './WeeksToolbar.css'

function WeeksToolbar(props) {
    return (
        <Stack gap={2} className='weekly-schedule-toolbar justify-content-center'>
            {props.data.map((group,i) => {
                const grouptype = group.type;
                return (
                <ButtonGroup key={i}>
                    {group.data.map((item,j) => (
                        <Button key={j} variant={props.variant[grouptype]} onClick={() => props.setter(item)} className={props.active===item ? 'active' : null} >{item}</Button>
                    ))}
                </ButtonGroup>
            )})}
        </Stack>
    )
}

export default WeeksToolbar