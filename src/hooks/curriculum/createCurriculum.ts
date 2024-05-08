import { ICreateCurriculum } from '@/@types/curriculum'
import { api } from '@/services/apiClient'
import { AxiosErrorWithMessage } from '@/services/errorMessage'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const fetchCreateCurriculum = async (params: ICreateCurriculum) => {
  const { data } = await api.post(`/curriculum/create/${params.user.id}`, {
    user: {
      name: params.user.name,
      title: params.user.title,
      email: params.user.email,
      phone: params.user.phone,
      location: params.user.location,
      avatar: '',
      gender: params.user.gender,
      pronoun: params.user.pronoun,
      description: params.user.description,
      published: params.user.published,
      access_level: params.user.access_level,
    },
    links: params.links,
    experience: params.experience,
    education: params.education,
    skills: params.skills,
    Custom: params.Custom,
  })

  return data
}

export const useCreateCurriculum = () => {
  return useMutation({
    mutationFn: fetchCreateCurriculum,
    onSuccess: () => {
      toast.success('Curriculum criado com sucesso')
    },
    onError: (error) => {
      const err = error as AxiosErrorWithMessage

      toast.error(err.response?.data.message, {
        toastId: 'Error',
      })
    },
  })
}
