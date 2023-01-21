import styles from './list-line.module.css'
import deletePic from './../../images/delete.svg';
import { useEffect, useState } from 'react';

import { useLocation } from 'react-router';
// import { getCommentsRequest } from '../../services/utils/api/tokenApi';
import { getStudentsRequest } from '../../services/utils/api/get-students';
import { getCommentsRequest } from '../../services/utils/api/get-comments';

export const ListLine = ({ array, setFunc }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/students') {
      getStudentsRequest({})
        .then(res => setFunc(res.items));
    }
    if (location.pathname === '/comments') {
      getCommentsRequest({})
        .then(res => {
          setFunc(res.items)
        });
    }
  }, [array?.length])
  if (array?.length && location.pathname === '/students' ) {
    return (
      array.map(user => {
        return (
          <tr className={styles.line} key={user._id}>
            <td className={styles.line}>{user.cohort}</td>
            <td className={styles.line}>{user.email}</td>
            <td className={styles.line}>{user.name}</td>
          </tr >
        )
      })
    )
  }
  if (array?.length && location.pathname === '/comments') {
    return (
      array.map(comment => {
        return (
          <tr className={styles.line} key={comment._id}>
            <td className={styles.line}>{comment.cohort}</td>
            <td className={styles.line}>{comment.date}</td>
            <td className={styles.line}>{comment.from.name}</td>
            <td className={styles.line}>{comment.to.name}</td>
            <td className={styles.line}>{comment.target}</td>
            <td className={styles.line}>{comment.text}</td>
            <td className={styles.button_container}>
              <button className={styles.button} style={{ backgroundImage: `url(${deletePic})` }} ></button>
            </td>
          </tr >
        )
      })
    )
  }
}