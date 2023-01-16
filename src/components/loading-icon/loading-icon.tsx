import styles from "./loading-icon.module.css";

export default function LoadingIcon () {
  return (
    <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none"><path fill="#FF00A8" fillRule="evenodd" d="M15 2.667C8.188 2.667 2.666 8.188 2.666 15c0 6.811 5.522 12.333 12.334 12.333 6.811 0 12.333-5.521 12.333-12.333a1 1 0 1 1 2 0c0 7.916-6.417 14.333-14.333 14.333S.667 22.916.667 15 7.084.667 15 .667a1 1 0 1 1 0 2Z" clipRule="evenodd"/></svg>
  )
}