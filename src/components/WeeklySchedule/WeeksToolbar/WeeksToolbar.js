import React from 'react'
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap'

function WeeksToolbar(props) {
    return (
        <ButtonToolbar className='weekly-schedule-toolbar justify-content-center'>
            <ButtonGroup >
                <Button variant="outline-secondary" onClick={() => setWeekID(1)} className={weekID === 1 ? 'active' : null} >1</Button>
                <Button variant="outline-secondary" onClick={() => setWeekID(2)} className={weekID === 2 ? 'active' : null} >2</Button>
                <Button variant="outline-secondary" onClick={() => setWeekID(3)} className={weekID === 3 ? 'active' : null} >3</Button>
                <Button variant="outline-secondary" onClick={() => setWeekID(4)} className={weekID === 4 ? 'active' : null} >4</Button>
                <Button variant="outline-secondary" onClick={() => setWeekID(5)} className={weekID === 5 ? 'active' : null} >5</Button>
                <Button variant="outline-secondary" onClick={() => setWeekID(6)} className={weekID === 6 ? 'active' : null} >6</Button>
                <Button variant="outline-secondary" onClick={() => setWeekID(7)} className={weekID === 7 ? 'active' : null} >7</Button>
            </ButtonGroup>
            <ButtonGroup >
                <Button variant="outline-secondary" onClick={() => setWeekID(8)} className={weekID === 8 ? 'active' : null} >8</Button>
                <Button variant="outline-secondary" onClick={() => setWeekID(9)} className={weekID === 9 ? 'active' : null} >9</Button>
                <Button variant="outline-secondary" onClick={() => setWeekID(10)} className={weekID === 10 ? 'active' : null} >10</Button>
                <Button variant="outline-secondary" onClick={() => setWeekID(11)} className={weekID === 11 ? 'active' : null} >11</Button>
                <Button variant="outline-secondary" onClick={() => setWeekID(12)} className={weekID === 12 ? 'active' : null} >12</Button>
                <Button variant="outline-secondary" onClick={() => setWeekID(13)} className={weekID === 13 ? 'active' : null} >13</Button>
                <Button variant="outline-secondary" onClick={() => setWeekID(14)} className={weekID === 14 ? 'active' : null} >14</Button>
                <Button variant="outline-secondary" onClick={() => setWeekID(15)} className={weekID === 15 ? 'active' : null} >15</Button>
            </ButtonGroup>
            <ButtonGroup >
                <Button variant="outline-secondary" onClick={() => setWeekID(16)} className={weekID === 16 ? 'active' : null} >16</Button>
                <Button variant="outline-secondary" onClick={() => setWeekID(17)} className={weekID === 17 ? 'active' : null} >17</Button>
                <Button variant="outline-secondary" onClick={() => setWeekID(18)} className={weekID === 18 ? 'active' : null} >18</Button>
                <Button variant="outline-secondary" onClick={() => setWeekID(19)} className={weekID === 19 ? 'active' : null} >19</Button>
                <Button variant="outline-secondary" onClick={() => setWeekID(20)} className={weekID === 20 ? 'active' : null} >20</Button>
                <Button variant="outline-secondary" onClick={() => setWeekID(21)} className={weekID === 21 ? 'active' : null} >21</Button>
                <Button variant="outline-secondary" onClick={() => setWeekID(22)} className={weekID === 22 ? 'active' : null} >22</Button>
            </ButtonGroup>
            <ButtonGroup >
                <Button variant="outline-warning" onClick={() => setWeekID(23)} className={weekID === 23 ? 'active' : null} >CSF</Button>
                <Button variant="outline-warning" onClick={() => setWeekID(24)} className={weekID === 24 ? 'active' : null} >CF</Button>
                <Button variant="outline-warning" onClick={() => setWeekID(25)} className={weekID === 25 ? 'active' : null} >F</Button>
            </ButtonGroup>
        </ButtonToolbar>
    )
}

export default WeeksToolbar