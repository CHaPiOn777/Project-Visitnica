import styles from './input.module.css';
export const Input = () => {
  return (
    <form>
      <fieldset className={styles.inputs_container}>
        <label htmlFor='small_field' className={styles.input_name} >Узкое поле ввода</label>
        <input type='text' className={styles.input} id='small_field' ></input>
        <label htmlFor='large_field' className={styles.input_name} >Широкое поле ввода</label>
        <textarea type='text' className={`${styles.input} ${styles.large}`} id='large_field' placeholder='Даешь место для высказаться' ></textarea>
        <input type='email' className={styles.input}></input>
        <select>
          <option>Москва</option>
          <option>Томск</option>
          <option>Владивосток</option>
        </select>
      </fieldset>
    </form>
  )
}