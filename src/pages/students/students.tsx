import React, { useState, useEffect } from 'react';
import styles from './students.module.css';
import { Filter } from "../../components/filter/filter";
import { ToggleNavigator } from "../../components/navigator/navigator";
import { ListTable } from '../../components/list-table/list-table';
import { getStudentsRequest } from '../../services/utils/api/admin-students';
import { TStudent } from '../../services/utils/types';

// кураторская страница редактирования информации о студентах
export default function StudentsPage() {
  const [header, setHeader] = useState(Array<string>);
  const [users, setUsers] = useState(Array<TStudent>);
  useEffect(() => {
    setHeader(['Номер когорты', 'E-mail', 'Имя и фамилия студента']);
    getStudentsRequest({})
      .then(res => setUsers(res.items));
  }, [header.length, users?.length])


  return (
    <main className={styles.main}>
      <ToggleNavigator />
      <Filter setFunc={setUsers} />
      <ListTable header={header} array={users} setFunc={setUsers} />
    </main>
  )
}