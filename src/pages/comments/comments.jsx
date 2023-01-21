import React, { useState, useEffect } from 'react';
import { CommentsTable } from '../../components/comments-table/comments-table';
import { Filter } from '../../components/filter/filter';
import { ListTable } from '../../components/list-table/list-table';
import { ToggleNavigator } from '../../components/navigator/navigator';
import { getCommentsRequest } from '../../services/utils/api/get-comments';
import styles from './comments.module.css';

export default function CommentsPage() {
  const [header, setHeader] = useState([]);
  const [comments, setComments] = useState(null);

  useEffect(() => {
      setHeader(['Когорта', 'Дата', 'Отправитель', 'Получатель', 'Откуда комментарий', 'Текст комментария']);
      getCommentsRequest({})
        .then(res => setComments(res.items));

  }, [header.length, comments?.length])
  return(
    <main className={styles.main}>
      <ToggleNavigator />
      <Filter setFunc={setComments}/>
      {/* <CommentsTable /> */}
      <ListTable header={header} array={comments} setFunc={setComments} />
    </main>
  )
}