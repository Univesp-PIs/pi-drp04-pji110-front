import { api } from '@/services/apiClient'
import { AxiosErrorWithMessage } from '@/services/errorMessage'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const fetchCreateUser = async (params: ICreateUser) => {
  const { data } = await api.post('/account/signup', {
    name: params.name,
    email: params.email,
    password: params.password,
  })

  return data
}

export const useCreateUser = () => {
  return useMutation({
    mutationFn: fetchCreateUser,
    onSuccess: () => {
      toast.success('Usuário cadastrado com sucesso')
    },
    onError: (error) => {
      const err = error as AxiosErrorWithMessage

      toast.error(err.response?.data.error, {
        toastId: 'Error',
      })
    },
  })
}
