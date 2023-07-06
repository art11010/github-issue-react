import Button from '../components/Button';
import cx from 'clsx';
import styles from './CreateIssue.module.css';
import { useRef } from 'react';
import TextField from '../components/TextField';

export default function CreateIssue() {
  const ref = useRef();
  console.log({ ref });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    if (e.target.elements.title.value === '') {
      alert('타이틀을 입력해주세요.');
      return;
    }
    ref.current.focus();
  };

  return (
    <div className={styles.container}>
      <div className={styles.avatar}></div>
      <div className={cx(styles.inputWrapper, styles.border)}>
        <form onSubmit={handleSubmit}>
          <TextField name="title" placeholder="Title" />
          <TextField
            type="textarea"
            name="body"
            placeholder="Leave a comment"
          />
          <div className={styles.buttonWrapper}>
            <Button type="submit" green>
              Submit new issue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
