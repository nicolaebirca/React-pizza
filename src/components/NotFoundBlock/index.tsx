import React from 'react'
import styles from './NotFoundBlock.module.scss'

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
    <h2>
        <span>
            <span>
            😟
            </span>
            <br />
        </span>
        <br />
      You didn't find anything here.
      </h2>
      <p className={styles.description}>
      I'm sorry, but this page was not found.
      </p>
    </div>
      
      
    
  )
}

export default NotFoundBlock;
