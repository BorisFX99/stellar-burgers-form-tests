import { namePattern } from './constants';

// Простая валидация для полей userName |email | password | repeatPassword
// вывод соответствующих ошибок для форм Логина и Регистрации
const REGEX = {
  EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
} as const;

type TEasyValidInputsParams = {
  name?: string;
  email?: string;
  password?: string;
  repeatPassword?: string;
};

type TEasyValidInputsResult = {
  isNameValid?: boolean;
  isEmailValid?: boolean;
  isPassValid?: boolean;
  isRepeatPassValid?: boolean;
  isFormValid?: boolean;
};

export type TEasyValidInputsFunc = (
  value: TEasyValidInputsParams
) => TEasyValidInputsResult;

export const easyValidInputs: TEasyValidInputsFunc = ({
  name,
  email,
  password,
  repeatPassword
}: TEasyValidInputsParams) => {
  const emailRegex = REGEX.EMAIL;
  const result: TEasyValidInputsResult = {};

  if (name != undefined) result.isNameValid = namePattern.test(name);
  if (email != undefined) result.isEmailValid = emailRegex.test(email);
  if (password != undefined) result.isPassValid = password.length >= 6;
  if (repeatPassword != undefined)
    (result.isRepeatPassValid = repeatPassword.length >= 6),
      (result.isFormValid = Object.values(result).every((el) => el === true));
  return result;
};
