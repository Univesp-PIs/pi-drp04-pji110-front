import { ICreateCurriculum } from '@/@types/curriculum'
import { CreateCurriculumContext } from '@/contexts/CreateCurriculumContext'
import { api } from '@/services/apiClient'
import { AxiosErrorWithMessage } from '@/services/errorMessage'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { toast } from 'react-toastify'

interface ICreateCurriculumResponse {
  message: string
  user_id: number
  user_key: string
}

const fetchCreateCurriculum = async (params: ICreateCurriculum) => {
  const { data } = await api.post(`/curriculum/create_key/${params.user.id}`, {
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
  const router = useRouter()
  const { resetValues } = useContext(CreateCurriculumContext)

  return useMutation({
    mutationFn: fetchCreateCurriculum,
    onSuccess: (data: ICreateCurriculumResponse) => {
      toast.success('Curriculum criado com sucesso')
      resetValues()
      router.push(`/curriculum/${data.user_id}/${data.user_key}`)
    },
    onError: (error) => {
      const err = error as AxiosErrorWithMessage

      toast.error(err.response?.data.error, {
        toastId: 'Error',
      })
    },
  })
}
