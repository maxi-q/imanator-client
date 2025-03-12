'use client';

import clsx from 'clsx';
import { UseFormRegister } from 'react-hook-form';
import { IFormData } from '@/types/types';

const styles = {
  'input-field':
    'w-full p-2 border border-neutral-700 rounded focus:outline-none focus:border-indigo-500 bg-transparent text-white transition-colors mt-2',
};

interface AuthFormInputsProps {
  register: UseFormRegister<IFormData>;
}

class AuthFormInputs {

  static Email({ register }: AuthFormInputsProps) {
    return (
      <div className="mb-4">
        <label className="text-gray-600">
          Email
          <input
            type="email"
            placeholder="Enter email: "
            {...register('email', { required: true })}
            className={clsx(
              styles['input-field'],
              'w-full p-2 border rounded focus:outline-none focus:border-indigo-500'
            )}
          />
        </label>
      </div>
    );
  }

  static Name({ register }: AuthFormInputsProps) {
    return (
      <div className="mb-4">
        <label className="text-gray-600">
          Имя
          <input
            type="text"
            placeholder="Enter firstName: "
            {...register('firstName', { required: true })}
            className={clsx(
              styles['input-field'],
              'w-full p-2 border rounded focus:outline-none focus:border-indigo-500'
            )}
          />
        </label>
      </div>
    );
  }

  static LastName({ register }: AuthFormInputsProps) {
    return (
      <div className="mb-4">
        <label className="text-gray-600">
          Фамилия
          <input
            type="text"
            placeholder="Enter lastName: "
            {...register('lastName', { required: true })}
            className={clsx(
              styles['input-field'],
              'w-full p-2 border rounded focus:outline-none focus:border-indigo-500'
            )}
          />
        </label>
      </div>
    );
  }

  static Password({ register }: AuthFormInputsProps) {
    return (
      <div className="mb-4">
        <label className="text-gray-600">
          Пароль
          <input
            type="password"
            placeholder="Enter password: "
            {...register('password', { required: true })}
            className={clsx(
              styles['input-field'],
              'w-full p-2 border rounded focus:outline-none focus:border-indigo-500'
            )}
          />
        </label>
      </div>
    );
  }
}

export default AuthFormInputs;