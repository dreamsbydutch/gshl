import React from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'

function PageNavbar(props) {
  return (
      <>
      <ButtonGroup className='page-nav-container'>
        {props.data.map(obj => <Button className='page-nav-btn' onClick={obj.onClick}>{obj.text}</Button>)}
      </ButtonGroup>
      </>
  )
}

export default PageNavbar