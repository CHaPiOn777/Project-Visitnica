import styles from './btn.module.css';

type TProps = { 
  text: string, 
  size?: string, 
  type?: 'submit' | 'button' | 'reset', 
  disabled?: boolean,
  onClick: () => void,
}

export default function PurpleBtn({ text, size, type, disabled, onClick }: TProps) {
  return (
    <button 
      className={size === 's' ? styles.btn_size_s : styles.btn}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  )
} 