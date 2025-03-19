import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { IFormData } from '@/types/types'
import { serverLogin } from '@/utils/server/login-server'
import { MutationKeys } from '@/config/tanstack/mutationKeys'

export function useAuthForm(isLogin: boolean) {
	const { register, handleSubmit, reset } = useForm<IFormData>()

	const router = useRouter()
	const [isPending, startTransition] = useTransition()


	const { mutate: mutateLogin, isPending: isLoginPending } = useMutation({
		mutationKey: [MutationKeys.LOGIN],
		mutationFn: (data: IFormData) =>
			serverLogin('login', data),
		onSuccess() {
			startTransition(() => {
				reset()
				router.push('/')
			})
		},
		onError(error) {
			if (axios.isAxiosError(error)) {
				toast.error(error.response?.data?.message)
			}
		}
	})

	const { mutate: mutateRegister, isPending: isRegisterPending } = useMutation({
		mutationKey: [MutationKeys.REGISTER],
		mutationFn: (data: IFormData) =>
      serverLogin('register', data),
		onSuccess() {
			startTransition(() => {
				reset()
				router.push('/')
			})
		},
		onError(error) {
			if (axios.isAxiosError(error)) {
				toast.error(error.response?.data?.message)
			}
		}
	})

	const onSubmit: SubmitHandler<IFormData> = data => {
    if (isLogin) {
      mutateLogin(data)
    } else {
      mutateRegister(data)
    }
	}

	const isLoading = isPending || isLoginPending || isRegisterPending

	return {
		register,
		handleSubmit,
		onSubmit,
		isLoading
	}
}

