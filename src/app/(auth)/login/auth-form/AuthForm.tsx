'use client'

import clsx from 'clsx'

import styles from './AuthForm.module.scss'
import { AuthToggle } from './AuthToggle'

import { useAuthForm } from './useAuthForm'
import AuthFormInputs from './components/Inputs'

interface AuthFormProps {
	isLogin: boolean
}

export function AuthForm({ isLogin }: AuthFormProps) {
	const { handleSubmit, isLoading, onSubmit, register } =
		useAuthForm(isLogin)

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="max-w-sm mx-auto"
		>
			{ isLogin ?
        (
          <>
            <AuthFormInputs.Email register={register}/>
            <AuthFormInputs.Password register={register}/>
          </>
        ) : (
          <>
            <AuthFormInputs.Email register={register}/>
            <AuthFormInputs.Name register={register}/>
            <AuthFormInputs.LastName register={register}/>
            <AuthFormInputs.Password register={register}/>
          </>
        )
      }

			<div className="mb-3">
				<button
					type="submit"
					className={clsx(
						styles['btn-primary'],
						isLogin ? 'bg-indigo-500' : 'bg-green-500',
						isLoading ? 'opacity-75 cursor-not-allowed' : ''
					)}
					disabled={isLoading}
				>
					{isLoading ? 'Загрузка...' : isLogin ? 'Войти' : 'Зарегистрироваться'}
				</button>
			</div>

			{/* <SocialMediaButtons /> */}

			<AuthToggle isLogin={isLogin} />
		</form>
	)
}
