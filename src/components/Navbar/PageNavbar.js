import React from 'react'
import './PageNavbar.css'

function PageNavbar(props) {
  return (
    <div className="page-navbar-container">
      <ul className='page-navbar-list'>
        {props.data.map((obj, i) => {
          const classNames = ['page-navbar-btn'];
          if (obj.classes) {classNames.push(...obj.classes)}
          if (props.activeKey === obj.key) { classNames.push('active') };
          return (
            <li key={i} className={classNames.join(' ')} onClick={() => props.setter(obj.key)} >{obj.content}</li>
          )
        })}
      </ul>
    </div>
  )
}

export default PageNavbar