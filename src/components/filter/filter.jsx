import styles from './filter.module.css';

export const Filter = () => {
  return(
    <form className={styles.container} >
      <label htmlFor='filter_input' className={styles.name} >Фильтровать</label>
      <input 
      id='filter_input' 
      className={styles.input}
      placeholder='По имени или фамилии или почте или номеру когорты (введите любой из этих параметров)' ></input>
    </form>
  )
}