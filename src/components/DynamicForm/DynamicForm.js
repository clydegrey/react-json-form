import React, { useState } from 'react';
// import styles from './DynamicForm-module.css';
import styles from './DynamicForm.module.scss';

const DynamicForm = props => {
  const { title, model } = props;
  // const elementsRef = useRef(model.map(() => createRef()));
  const [formState, formSetState] = useState({});

  const onSubmitHandler = e => {
    e.preventDefault();
    props.onSubmitHandler(formState);
  };

  const onChangeHandler = (e, key) => {
    const value = e.target.value;
    formSetState(s => {
      return { ...s, [key]: value };
    });
  };

  const getSelectMarkup = ({ options, key }) => {
    const optionTags = options.map(({ value, text }) => (
      <option key={value} value={value}>
        {text}
      </option>
    ));
    return (
      <select
        id={key}
        onChange={e => onChangeHandler(e, key)}
        value={formState[key] || ''}
      >
        {!formState[key] && (
          <option selected value>
            select an option
          </option>
        )}
        {optionTags}
      </select>
    );
  };

  const renderForm = () => {
    const formUI = model.map(fieldModel => {
      let key = fieldModel.key;
      let error = fieldModel.error;
      let type = fieldModel.type || 'text';
      let props = fieldModel.props || {};
      console.log(type);
      const animatedText =
        type === ('text' || type === 'textarea') ? 'animated' : 'not_animated';
      const isDirty = !!formState[key] ? 'is_dirty' : '';

      console.log(isDirty);
      return (
        <div
          className={`${styles.nested_control} ${styles[animatedText]} ${
            styles[isDirty]
          }`}
          key={key}
        >
          <label htmlFor={key}>{key}</label>

          {type === 'text' && (
            <input
              value={formState[key] || ''}
              onChange={e => onChangeHandler(e, key)}
              id={key}
              type={type}
              placeholder={key}
              // ref={elementsRef.current[key]}
            />
          )}

          {type === 'select' && getSelectMarkup(fieldModel)}
          {error && <h3>Please fill this in</h3>}
        </div>
      );
    });
    return formUI;
  };

  return (
    <div className={styles.dynamic_form}>
      <h2>{title}</h2>
      <form className={styles.form} onSubmit={e => onSubmitHandler(e)}>
        {renderForm()}
        <button type="submit">Submit</button>
      </form>
      {JSON.stringify(formState)}
    </div>
  );
};

export default DynamicForm;
