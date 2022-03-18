import React from 'react'
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap'

function WeeksToolbar(props) {
    return (
        <ButtonToolbar className='weekly-schedule-toolbar justify-content-center'>
            {props.data.map((group,i) => {
                const grouptype = group.type;
                return (
                <ButtonGroup key={i}>
                    {group.data.map((item,j) => (
                        <Button key={j} variant={props.variant[grouptype]} onClick={() => props.setter(item)} className={props.active===item ? 'active' : null} >{item}</Button>
                    ))}
                </ButtonGroup>
            )})}
        </ButtonToolbar>
    )
}

export default WeeksToolbar