import styles from './list-line.module.css'
import deletePic from './../../images/delete.svg';
import { useEffect, useState } from 'react';

import { useLocation } from 'react-router';
import { getCommentsRequest, getStudentsRequest } from '../../services/utils/api/tokenApi';

export const ListLine = () => {
  const [users, setUsers] = useState(null);
  const [comments, setComments] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/students') {
      getStudentsRequest()
        .then(res => setUsers(res.items));
    }
    if (location.pathname === '/comments') {
      getCommentsRequest()
        .then(res => {debugger
          setComments(res.items)});
    }
  }, [users?.length])
  if (users?.length) {
    return (
      users.map(user => {
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
  if (comments?.length) {
    return (
      comments.map(comment => {
        return (
          <tr className={styles.line} key={comment._id}>
            <td className={styles.line}>{comment.cohort}</td>
            <td className={styles.line}>{comment.date}</td>
            <td className={styles.line}>{comment.from.name}</td>
            <td className={styles.line}>{comment.to.name}</td>
            <td className={styles.line}>{comment.target}</td>
            <td className={styles.line}>{comment.text}</td>
          </tr >
        )
      })
    )
  }
}