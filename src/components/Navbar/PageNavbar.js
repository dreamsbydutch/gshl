import React from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'
import './PageNavbar.css'

function PageNavbar(props) {
  return (
    <>
      <ButtonGroup className='page-nav-container'>
        {props.data.map((obj, i) => {
          const classNames = ['page-nav-btn'];
          if (props.active === obj.key) { classNames.push('active') };
          return <Button key={i} variant='outline-dark' className={classNames.join(' ')} onClick={obj.onClick} >{obj.text}</Button>
        })}
      </ButtonGroup>
    </>
  )
}

export default PageNavbar