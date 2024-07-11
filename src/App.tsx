import { useState } from 'react';
import styles from './App.module.css';

interface Responses {
  [key: string]: string;
}

interface Questions {
  [key: string]: {
    question: string;
    answers: {
      answer: string;
      points: number;
    }[];
  };
}

function App() {
  const [responses, setResponses] = useState<Responses>({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
  });

  const questions: Questions = {
    q1: {
      question: 'Укажите Ваш возраст',
      answers: [
        { answer: 'До 30 лет', points: 0 },
        { answer: '30-40 лет', points: 1 },
        { answer: '40-50 лет', points: 2 },
        { answer: '50-60 лет', points: 3 },
        { answer: 'Старше 60 лет', points: 4 },
      ],
    },
    q2: {
      question:
        'ЕСТЬ/БЫЛИ У ВАШИХ РОДСТВЕННИКОВ СЕРДЕЧНО-СОСУДИСТЫЕ ЗАБОЛЕВАНИЯ (гипертоническая болезнь, ишемическая болезнь сердца, инфаркт миокарда)?',
      answers: [
        { answer: 'Да', points: 0 },
        { answer: 'Нет', points: 1 },
      ],
    },
    q3: {
      question: 'СТРАДАЕТЕ ЛИ ВЫ САХАРНЫМ ДИАБЕТОМ ИЛИ ХРОНИЧЕСКОЙ ПОЧЕЧНОЙ НЕДОСТАТОЧНОСТЬЮ?',
      answers: [
        { answer: 'Да', points: 0 },
        { answer: 'Нет', points: 1 },
      ],
    },
    q4: {
      question: 'Вы курите?',
      answers: [
        { answer: 'Да', points: 0 },
        { answer: 'Нет', points: 1 },
      ],
    },
    q5: {
      question: 'НОСИТ ЛИ ВАША ЖИЗНЬ СТРЕССОВЫЙ ХАРАКТЕР?',
      answers: [
        { answer: 'Да', points: 0 },
        { answer: 'Нет', points: 1 },
      ],
    },
  };

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { name, value } = e.target;
    setResponses({
      ...responses,
      [name]: value,
    });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log('Survey responses:', responses);
  };

  console.log(responses);

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {Object.keys(responses).map((question, index) => (
          <div key={index}>
            <label className={styles.question}>
              Вопрос {index + 1}: {questions[question].question}
              <select name={question} value={responses[question]} onChange={handleChange}>
                <option value='' disabled>
                  Выберите вариант ответа
                </option>
                {questions[question].answers.map((el, i) => (
                  <option key={i} value={el.points}>
                    {el.answer}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ))}
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default App;
