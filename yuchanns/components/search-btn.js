import React from 'react'
import { useState, useRef } from 'react'
import useOutsideClick from '../utils/use-outside-click'
import CrossSvg from './icons/cross'
import TickSvg from './icons/tick'
import styles from '../styles/common.module.scss'

const SearchBtn = ({ label, set, setLabel, selected }) => {
  const [isShow, setShow] = useState(false)
  const hideLabel = () => {
    setShow(false)
  }
  const toggleLabel = () => {
    setShow(!isShow)
  }
  const ref = useRef()
  useOutsideClick(ref, hideLabel)

  return (
    <div className={styles.searchBtnBox} ref={ref}>
      <button className={styles.searchBtn} onClick={toggleLabel}>
        <i>{label}:</i>
        <span>{selected}</span>
        <span className={styles.searchBtnDownCaret}></span>
      </button>
      {isShow &&
      <div className={styles.selectMenu}>
        <div className={styles.selectMenuModal}>
          <header className={styles.selectMenuHeader}>
            <span className={styles.selectMenuTitle}>Select Category</span>
            <button className={styles.selectMenuClosebtn} onClick={hideLabel}>
              <CrossSvg />
            </button>
          </header>
          <div className={styles.selectMenuList}>
            {set.map(item => {
              let tickClass = styles.selectMenuIcon
              if (String(selected) === String(item)) {
                tickClass = `${tickClass} ${styles.selectMenuIconChecked}`
              }
              return (
                <label
                  key={item}
                  htmlFor={item}
                  className={styles.selectMenuItem}>
                  <TickSvg className={tickClass} />
                  <input
                    type="radio"
                    name={label}
                    id={item}
                    value={item}
                    onClick={() => {
                      hideLabel()
                      setLabel(item)
                    }}
                    hidden="hidden"
                  />
                  <span className={styles.selectMenuItemText}>{item}</span>
                </label>
              )
            })}
          </div>
        </div>
      </div>
      }
    </div>
  )
}

export default SearchBtn