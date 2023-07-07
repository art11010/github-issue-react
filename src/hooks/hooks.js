import { useState } from 'react';

export function useForm({
  initialValues,
  validate,
  refs,
  onSuccess, // 성공했을 때
  onErrors, // 에러났을때
  onSubmit, // 값이 전달 됐을 때 함수 or 네트워크 호출
}) {
  const [inputValues, setInputValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function onChange(e) {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    const vaildateResulte = validate(inputValues);
    setErrors(vaildateResulte);

    const errorKeys = Object.keys(vaildateResulte);
    if (errorKeys.length !== 0) {
      const key = errorKeys[0];
      alert(vaildateResulte[key]);
      // onErrors();
      refs[key].current.focus();

      setIsSubmitting(false);
      return;
    } else {
      try {
        const result = await onSubmit();
        onSuccess(result);
      } catch (e) {
        console.log({ e });
        onErrors();
      }

      return;
    }
  }

  return {
    inputValues,
    onChange,
    isSubmitting,
    errors,
    handleSubmit,
  };
}
