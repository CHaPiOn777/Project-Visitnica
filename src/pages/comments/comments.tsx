import React, { useState, useEffect } from 'react';
import { Filter } from '../../components/filter/filter';
import { ListTable } from '../../components/list-table/list-table';
import { ToggleNavigator } from '../../components/navigator/navigator';
import { getCommentsRequest } from '../../services/utils/api/admin-comments';
import { TAdminComment } from '../../services/utils/types';
import styles from './comments.module.css';

// кураторская страница редактирования комментариев
export default function CommentsPage() {
  const [header, setHeader] = useState(Array<string>);
  const [comments, setComments] = useState(Array<TAdminComment>);

  useEffect(() => {
      setHeader(['Когорта', 'Дата', 'Отправитель', 'Получатель', 'Откуда комментарий', 'Текст комментария']);
      getCommentsRequest({})
        .then(res => setComments(res.items))
        .catch((err) => { console.error(`Ошибка загрузки комментариев: ${err}`) });

  }, [header.length])
  return(
    <main className={styles.main}>
      <ToggleNavigator />
      <Filter setFunc={setComments}/>
      <ListTable header={header} array={comments} setFunc={setComments} />
    </main>
  )
}