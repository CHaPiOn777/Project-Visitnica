import React, { useState, useEffect } from 'react';
import styles from './students.module.css';
import { Filter } from "../../components/filter/filter";
import { ToggleNavigator } from "../../components/navigator/navigator";
import { ListTable } from '../../components/list-table/list-table';
import { getStudentsRequest } from '../../services/utils/api/admin-students';
import { TStudent } from '../../services/utils/types';
import { AddStudents } from '../../components/add-students/add-students';

// кураторская страница редактирования информации о студентах
export default function StudentsPage() {
  const [header, setHeader] = useState(Array<string>);
  const [users, setUsers] = useState(Array<TStudent>);
  useEffect(() => {
    setHeader(['Номер когорты', 'E-mail', 'Имя и фамилия студента']);
    getStudentsRequest({})
      .then(res => {
        const students = res.items.sort((a, b) => (b.createdAt - a.createdAt)) 
        //сортировка от новых изменений к старым
        setUsers(students)
      })
      .catch((err) => {
        console.error(`Ошибка загрузки данных студентов: ${err}`);
      });
  }, [header.length, users?.length])

  return (
    <main className={styles.main}>
      <ToggleNavigator />
      <div className={styles.container}>
        <Filter setFunc={setUsers} />
        <ListTable header={header} array={users} setFunc={setUsers} />
        <AddStudents setUsers={setUsers} users={users} />
      </div>
    </main>
  )
}