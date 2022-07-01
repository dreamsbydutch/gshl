import React from 'react'
import './PageNavbar.css'

function PageNavbar(props) {
  return (
    <div className='page-navbar-container'>
      {props.data.map((obj, i) => {
        const classNames = ['page-nav-btn'];
        if (props.active === obj.key) { classNames.push('active') };
        return (
          <>
            {i !== 0 && <span className='nav-border-line' />}
            <div className={classNames.join(' ')} onClick={obj.onClick} >{obj.image}</div>
          </>
        )
      })}
    </div>
  )
}

export default PageNavbar