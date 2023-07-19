import { useRef } from 'react';
import axios from 'axios';

import Button from '../components/Button';
import TextField from '../components/TextField';
import { useForm, /* useUser */ } from '../hooks/hooks';
import { GITHUB_API } from '../api/api';

import cx from 'clsx';
import styles from './CreateIssue.module.css';
import { useNavigate } from 'react-router-dom';

export default function CreateIssue() {
  // console.log({ ref });
  const inputRef = useRef();
  const textareaRef = useRef();
  // const refs = { title: inputRef, body: textareaRef };
  const navigate = useNavigate();

  // const user = useUser();
  // console.log(user);

  const { inputValues, onChange, isSubmitting, errors, handleSubmit } = useForm(
    {
      initialValues: { title: '', body: '' },
      validate,
      onSubmit: async () => {
        const result = await axios.post(
          `${GITHUB_API}/repos/art11010/github-issue-react/issues`,
          inputValues,
          {
            headers: {
              Authorization: process.env.REACT_APP_GITHUB_TOKEN,
              'Content-Type': 'application/json',
            },
          },
        );
        return result;
      },
      refs: { title: inputRef, body: textareaRef },
      onErrors: () => console.log('error'),
      onSuccess: (result) => {
        // console.log({ result });
        navigate('/', { replace: true });
        window.open('https://github.com/art11010/github-issue-react/issues');
      },
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
