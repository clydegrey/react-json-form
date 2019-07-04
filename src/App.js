import React, { useState, useEffect } from 'react';
import './App.css';
import DynamicForm from './components/DynamicForm';

// const dummyData = [
//   { id: 1, name: 'a', age: 29, qualification: 'BSc', rating: 3 },
//   { id: 2, name: 'b', age: 31, qualification: 'B.Com', rating: 5 },
//   { id: 3, name: 'c', age: 25, qualification: 'B.E.', rating: 3 }
// ];

const model = [
  {
    key: 'newSlect2',
    label: 'New Select2',
    type: 'select',
    options: [{ value: 'ON', text: 'Ontario' }, { value: 'SK', text: 'Sask' }]
  },
  { key: 'name', label: 'Name', props: { required: true } },
  { key: 'age', label: 'Age', type: 'number' },
  { key: 'qualification', label: 'Qualification' },
  { key: 'newElement', label: 'New Element' },
  {
    key: 'newSlect',
    label: 'New Select',
    type: 'select',
    options: [{ value: 'ON', text: 'Ontario' }, { value: 'SK', text: 'Sask' }]
  }
];

const App = () => {
  const [formModel, setFormModelState] = useState(model);
  const onSubmitHandler = formState => {
    alert(JSON.stringify(formState));
    validateForm(formState);
  };

  async function fetchData() {
    const res = await fetch('https://swapi.co/api/planets/4/');
    res.json();
    // .then(res => setPlanets(res))
    // .catch(err => setErrors(err));
  }

  useEffect(() => {
    // fetchData();
  }, []);

  const validateForm = formState => {
    model.map(field => {
      if (!formState[field]) {
        console.log('google!');
        field.error = true;
      }
    });
  };

  return (
    <div className="App">
      <DynamicForm
        title="Registration"
        model={model}
        onSubmitHandler={model => onSubmitHandler(model)}
      />
      <hr />
      {JSON.stringify(model)}
    </div>
  );
};

// props.model is an array of objects

export default App;
