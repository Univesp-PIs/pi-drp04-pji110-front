import { api } from '@/services/apiClient'
import { AxiosErrorWithMessage } from '@/services/errorMessage'
import { queryClient } from '@/services/queryClient'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

interface IDeleteCurriculum {
  userID: string
  keyCurriculum: string
}

const fetchDeleteCurriculum = async (params: IDeleteCurriculum) => {
  const { data } = await api.delete(
    `/curriculum/delete_key/${params.userID}?key=${params.keyCurriculum}`,
  )

  return data
}

export const useDeleteCurriculum = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: fetchDeleteCurriculum,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-curriculum'],
      })

      queryClient.invalidateQueries({
        queryKey: ['list-curriculums'],
      })

      toast.success('Curriculum deletado com sucesso')
      router.push('/dashboard')
    },
    onError: (error) => {
      const err = error as AxiosErrorWithMessage

      toast.error(err.response?.data.error, {
        toastId: 'Error',
      })
    },
  })
}
