import {
  FocusEventHandler,
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useCallback,
  useRef,
  useState,
  useEffect,
  FocusEvent,
  useMemo
} from 'react';
import { IFormProps } from './types';
import { easyValidInputs } from '../../utils/valid';
import styles from './form.module.css';
import clsx from 'clsx';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
// Используйте для проверки формата введённого имени
import { namePattern } from '../../utils/constants';
import { ObjectFlags } from 'typescript';
import { use } from 'chai';

const initInputState = {
  name: '',
  email: '',
  password: '',
  repeatPassword: ''
};

export const Form: FC<IFormProps> = ({ setMode, className }) => {
  const [firstRender, setFirstRender] = useState(true);
  const [inputValues, setInputValues] = useState(initInputState);
  const [isNameError, setNameError] = useState(false);
  const [repeatPassErr, setRepeatPassErr] = useState({
    passLength: false,
    passCopy: false
  });

  // Контроль состояния повторяшки пароля
  const repeatPassRef = useRef<HTMLInputElement>(null);
  const [showRepeat, setShowRepeat] = useState(false);

  // Контроль ввода в поля
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (firstRender) {
      setFirstRender(false);
    }
    if (event.target) {
      const { name, value } = event.target;
      setInputValues((prev) => ({ ...prev, [name]: value }));
      if (name === 'password' || name === 'repeatPassword') {
        setRepeatPassErr((prev) => ({ ...prev, passCopy: false }));
      }
      if (name === 'name') {
        if (value === '') {
          setNameError(false);
        } else {
          const result = easyValidInputs({ name: value.trim() });
          setNameError(!result.isNameValid);
        }
      }
    }
  };

  // Сосотояние фокуса поля repeatPass
  const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    if (event.target.name === 'repeatPassword') {
      setRepeatPassErr((prev) => ({ ...prev, passLength: false }));
    }
  };

  // Состояние Blur поля repeatPass
  const handleBlurRepeatPass = (event: FocusEvent<HTMLInputElement>) => {
    setShowRepeat(false);
    const value = event.target.value;
    if (value === '') {
      setRepeatPassErr((prev) => ({ ...prev, passLength: false }));
    } else {
      const result = easyValidInputs({ repeatPassword: value });
      setRepeatPassErr((prev) => ({
        ...prev,
        passLength: !result.isRepeatPassValid!
      }));
    }
  };

  // Валидация всей формы (используется для смены обводки если все поля валидны )
  const formValid = useMemo(() => {
    const result = easyValidInputs(inputValues);
    return result.isFormValid!;
  }, [inputValues]);

  // Submit формы
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    // Отмена submit только если несовпадение обоих паролей (для тестов)
    if (inputValues.password !== inputValues.repeatPassword) {
      setRepeatPassErr((prev) => ({ ...prev, passCopy: true }));
      setTimeout(() => {
        repeatPassRef.current?.focus();
      }, 0);
      return;
    }
    setMode('complete');
  };

  return (
    <form
      className={clsx(styles.form, className)}
      data-testid='form'
      onSubmit={handleSubmit}
    >
      <div className={styles.icon} />
      <div className={styles.text_box}>
        <p className='text text_type_main-large'>Мы нуждаемся в вашей силе!</p>
        <p className={clsx(styles.text, 'text text_type_main-medium')}>
          Зарегистрируйтесь на нашей платформе, чтобы присоединиться к списку
          контрибьюторов
        </p>
      </div>
      <fieldset className={styles.fieldset}>
        {/* Ваш код здесь */}
        <Input
          value={inputValues.name}
          placeholder='Имя'
          onChange={handleInputChange}
          onFocus={handleFocus}
          name='name'
          type='text'
          data-testid='name-input'
          error={isNameError}
          errorText='Некорректный формат имени'
          extraClass={styles.input__Container}
          required
          allValid={formValid && !repeatPassErr.passCopy}
        />
        <EmailInput
          value={inputValues.email}
          onChange={handleInputChange}
          name='email'
          data-testid='email-input'
          extraClass={styles.input__Container}
          required
          allValid={formValid && !repeatPassErr.passCopy}
        />
        <PasswordInput
          value={inputValues.password}
          onChange={handleInputChange}
          name='password'
          data-testid='password-input'
          extraClass={styles.input__Container}
          required
          allValid={formValid && !repeatPassErr.passCopy}
        />
        {/*Кастомный инпут */}
        <Input
          ref={repeatPassRef}
          disabled={false}
          data-testid='repeat-password-input'
          type={showRepeat ? 'text' : 'password'}
          icon={showRepeat ? 'HideIcon' : 'ShowIcon'}
          placeholder='Повторите пароль'
          value={inputValues.repeatPassword}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlurRepeatPass}
          name='repeatPassword'
          error={repeatPassErr.passCopy || repeatPassErr.passLength}
          errorText={
            repeatPassErr.passCopy
              ? 'Пароли не совпадают'
              : 'Некорректный пароль'
          }
          extraClass={styles.input__Container}
          required
          allValid={formValid && !repeatPassErr.passCopy}
          onIconClick={() => {
            setShowRepeat((prev) => !prev);
            // важно — возвращаем фокус
            setTimeout(() => repeatPassRef.current?.focus(), 0);
          }}
        />
        <Button
          htmlType='submit'
          size='medium'
          extraClass={styles.signin_btn}
          disabled={!formValid}
        >
          Зарегистрироваться
        </Button>
      </fieldset>
      <div className={styles.signin_box}>
        <p className='text text_type_main-default text_color_inactive'>
          Уже зарегистрированы?
        </p>
        <Button
          htmlType='button'
          type='secondary'
          size='medium'
          extraClass={styles.signin_btn}
        >
          Войти
        </Button>
      </div>
    </form>
  );
};
