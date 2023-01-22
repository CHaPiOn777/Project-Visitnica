import styles from "./city-selector.module.css";

type TCitySelectorProps = {
  cities: Set<string> | null;
  setFunction: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function CitySelector (props: TCitySelectorProps) {
  const options = props.cities ? Array.from(props.cities).sort() : null;
  console.log(options);
  const optElements = options?.map((item) => {
    return (
      <option key={item} value={item}>{item}</option>
    )
  })
  
  function handleChange (evt: React.ChangeEvent<HTMLSelectElement>) {
    props.setFunction(evt.target.value ? evt.target.value : null);
  }
  return (
    <>
      <select onChange={handleChange} className={styles.cityInput}>
      <option value=''>Все города</option>
      {optElements}
      </select>
    </>
  )
}