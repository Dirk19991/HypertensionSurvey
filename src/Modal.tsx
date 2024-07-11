import Dialog from '@mui/material/Dialog';
import styles from './Modal.module.scss';

interface ModalProps {
  open: boolean;
  setOpen: (arg: boolean) => void;
  points: number;
}

export default function Modal({ open, setOpen, points }: ModalProps) {
  const handleClose = () => setOpen(false);
  let message = '';
  if (points < 5) {
    message = 'Поздравляем! Вы не подвержены гипертонии. Так держать!';
  } else if (points < 10) {
    message = 'У вас есть некоторый риск гипертонии. Следите за здоровьем!';
  } else {
    message =
      'У вас серьезный риск гипертонии. Советуем обратиться за консультацией к врачу';
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: '20px',
          },
        }}
      >
        <div className={styles.wrapper}>
          <div>Ваш результат: {points} баллов</div>
          <div className={styles.message}>{message}</div>
          <button className={styles.button} onClick={() => setOpen(false)}>
            OK
          </button>
        </div>
      </Dialog>
    </div>
  );
}
