import Button from '../components/Button';
import cx from 'clsx';
import styles from './CreateIssue.module.css';
import { useRef } from 'react';
import TextField from '../components/TextField';
import { useForm } from '../hooks/hooks';

export default function CreateIssue() {
  // console.log({ ref });
  const inputRef = useRef();
  const textareaRef = useRef();
  // const refs = { title: inputRef, body: textareaRef };

  const { inputValues, onChange, isSubmitting, errors, handleSubmit } = useForm(
    {
      initialValues: { title: '', body: '' },
      validate,
      onSubmit: () => console.log('야야'),
      refs: { title: inputRef, body: textareaRef },
    },
  );

  return (
    <div className={styles.container}>
      <div className={styles.avatar}></div>
      <div className={cx(styles.inputWrapper, styles.border)}>
        <form onSubmit={handleSubmit}>
          <TextField
            ref={inputRef}
            name="title"
            placeholder="Title"
            value={inputValues.title}
            onChange={onChange}
            error={errors.title}
          />
          <TextField
            ref={textareaRef}
            type="textarea"
            name="body"
            placeholder="Leave a comment"
            value={inputValues.body}
            onChange={onChange}
            error={errors.body}
          />
          <div className={styles.buttonWrapper}>
            <Button type="submit" green disabled={isSubmitting}>
              Submit new issue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function validate(values) {
  let errors = {};
  if (values.title === '') {
    errors = { title: '타이틀은 필수값입니다.' };
  }
  return errors;
}
