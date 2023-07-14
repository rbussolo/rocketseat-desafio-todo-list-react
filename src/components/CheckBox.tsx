import styles from './CheckBox.module.css';
import checkedImg from '../assets/checked.svg';

interface CheckBoxProps {
  isChecked?: boolean;
  onChecked: () => void;
}

export function CheckBox({ isChecked = false, onChecked }: CheckBoxProps) {
  const classIfChecked = isChecked ? ' ' + styles.isChecked : '';

  function handleCheckClick() {
    onChecked();
  }

  return (
    <div className={styles.checkbox + classIfChecked} onClick={handleCheckClick}>
      <input 
        type="checkbox" 
        hidden 
        checked={isChecked}
      />
      <img src={checkedImg}/>
    </div>
  );
}