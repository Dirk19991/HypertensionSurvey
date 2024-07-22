import { useState } from 'react';
import styles from './App.module.scss';
import Modal from './Modal';
import { useForm, SubmitHandler } from 'react-hook-form';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

interface Questions {
  [key: string]: {
    question: string;
    description?: string | string[];
    answers?: {
      answer: string;
      points: number;
    }[];
  };
}

type Inputs = {
  [key: string]: string;
};

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [modalOpen, setModalOpen] = useState(false);
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setPoints(
      Object.values(data)
        .slice(1)
        .reduce((acc, elem) => (acc += +elem), 0)
    );
    setLoading(true);
    try {
      await addDoc(collection(db, 'users'), {
        name: data['q0'],
        points: +Object.values(data)
          .slice(1)
          .reduce((acc, elem) => (acc += +elem), 0),
      });

      setLoading(false);
    } catch (error) {
      console.error('Error adding document: ', error);
      setLoading(false);
    }

    setModalOpen(true);
  };

  const questions: Questions = {
    q0: {
      question: 'Введите имя и фамилию',
    },
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
        'Были ли у Ваших родственников сердечно-сосудистые заболевания (гипертоническая болезнь, ишемическая болезнь сердца, инфаркт миокарда)?',
      answers: [
        { answer: 'Да', points: 1 },
        { answer: 'Нет', points: 0 },
        { answer: 'Не знаю', points: 0 },
      ],
    },
    q3: {
      question: 'Страдаете ли Вы сахарным диабетом или почечной недостаточностью?',
      answers: [
        { answer: 'Да', points: 1 },
        { answer: 'Нет', points: 0 },
      ],
    },
    q4: {
      question: 'Вы курите?',
      answers: [
        { answer: 'Да', points: 1 },
        { answer: 'Нет', points: 0 },
      ],
    },
    q5: {
      question: 'Носит ли Ваша жизнь стрессовый характер?',
      answers: [
        { answer: 'Да', points: 1 },
        { answer: 'Нет', points: 0 },
      ],
    },
    q6: {
      question: 'Правильно ли Вы питаетесь?',
      answers: [
        {
          answer: 'Питаюсь в одно и то же время, до 4-5 раз в сутки, соблюдаю солевой и питьевой режим.',
          points: 0,
        },
        {
          answer: 'Иногда употребляю вредную пищу (жареное, копченое, соленое)',
          points: 1,
        },
        { answer: 'Я себя не ограничиваю в питании', points: 2 },
      ],
    },
    q7: {
      question:
        'Рассчитайте свой индекс массы тела (вес/рост). Пример: вес = 53 кг, рост = 1,58 м, формула расчета: вес / (рост в квадрате) = 53/2,496 = 21,23',
      description:
        'В первую очередь лишний вес влияет на сердечно-сосудистую систему. Атеросклероз, гипертония, ишемия, а также инфаркт миокарда — очень частые спутники ожирения.',
      answers: [
        { answer: 'От 18 до 24', points: 0 },
        { answer: 'От 25 до 30', points: 1 },
        { answer: 'От 30 и более', points: 2 },
      ],
    },
    q8: {
      question: 'Есть ли в Вашей жизни физические нагрузки (пешие прогулки, бег, спорт, растяжка, йога)?',
      description:
        'Для поддержания здорового состояния сердечно-сосудистой системы необходима регулярная физическая активность, минимум в течение получаса ежедневно; физическая активность в течение одного часа несколько раз в неделю способствует поддержанию здорового веса.',
      answers: [
        {
          answer: 'Пешие прогулки, бег, спорт, растяжка, йога в течение получаса ежедневно',
          points: 0,
        },
        {
          answer: 'Нерегулярная физическая нагрузка',
          points: 1,
        },
        { answer: 'Отсутствие физической нагрузки', points: 2 },
      ],
    },
    q9: {
      question:
        'Замечали ли Вы у себя повышение артериального давления (в том числе однократное) до показателя более 140/90 мм рт. ст.?',
      description:
        'Очень важно контролировать свое кровяное давление. Даже высокое кровяное давление может не сопровождаться какими-либо симптомами, но может привести к внезапному инсульту или инфаркту.',
      answers: [
        { answer: 'Да', points: 0 },
        { answer: 'Нет', points: 1 },
      ],
    },
    q10: {
      question: 'Замечали ли вы у себя какое-либо из перечисленных состояний?',
      description: [
        '- одышка при привычной физической нагрузке',
        '- головные боли, боли в грудной клетке при волнении/физической нагрузке',
        '- отеки нижних конечностей',
        '- повышенная утомляемость',
        '- снижение переносимости физической/умственной нагрузки',
        '- нарушения сна',
      ],
      answers: [
        { answer: 'Да', points: 1 },
        { answer: 'Нет', points: 0 },
      ],
    },
  };

  return (
    <>
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {Object.keys(questions).map((question, index) => (
            <div className={styles.questionContainer} key={index}>
              <label className={styles.question}>
                <div>
                  Вопрос {index + 1}: {questions[question].question}
                </div>
                <div className={styles.description}>
                  {questions[question].description &&
                    !Array.isArray(questions[question].description) &&
                    questions[question].description}
                  {questions[question].description &&
                    Array.isArray(questions[question].description) &&
                    questions[question].description.map((el, i) => <div key={i}>{el}</div>)}
                </div>
                {!questions[question].answers ? (
                  <input {...register(`q${index}`, { required: true })} defaultValue='' />
                ) : (
                  <select className={styles.select} defaultValue={''} {...register(`q${index}`, { required: true })}>
                    <option value='' disabled>
                      Выберите вариант ответа
                    </option>
                    {questions[question].answers.map((el, i) => (
                      <option key={i} value={el.points}>
                        {el.answer}
                      </option>
                    ))}
                  </select>
                )}
                {errors[`q${index}`]?.type === 'required' && (
                  <p className={styles.error} role='alert'>
                    Ответ обязателен
                  </p>
                )}
              </label>
            </div>
          ))}
          <button className={styles.submitButton} type='submit'>
            {loading ? <div className={styles.loader}></div> : <div>Отправить ответы</div>}
          </button>
        </form>
      </div>
      <Modal open={modalOpen} setOpen={setModalOpen} points={points} />
    </>
  );
}

export default App;
