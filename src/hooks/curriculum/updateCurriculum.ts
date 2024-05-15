import { IUpdateCurriculum } from '@/@types/curriculum'
import { api } from '@/services/apiClient'
import { AxiosErrorWithMessage } from '@/services/errorMessage'
import { queryClient } from '@/services/queryClient'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const fetchUpdateCurriculum = async (params: IUpdateCurriculum) => {
  const { data } = await api.put(
    `/curriculum/update_key/${params.user.id}?key=${params.key}`,
    {
      user: {
        ...params.user,
        avatar: '',
      },
      links: params.links,
      experience: params.experience,
      education: params.education,
      skills: params.skills,
      Custom: params.Custom,
    },
  )

  return data
}

export const useUpdateCurriculum = (key: string) => {
  return useMutation({
    mutationFn: fetchUpdateCurriculum,
    onSuccess: () => {
      toast.success('Curriculum editado com sucesso')
      queryClient.invalidateQueries({
        queryKey: ['get-curriculum', key],
      })

      queryClient.invalidateQueries({
        queryKey: ['list-curriculums', key],
      })
    },
    onError: (error) => {
      const err = error as AxiosErrorWithMessage

      toast.error(err.response?.data.error, {
        toastId: 'Error',
      })
    },
  })
}
