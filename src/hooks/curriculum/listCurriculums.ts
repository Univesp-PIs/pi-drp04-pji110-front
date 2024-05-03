'use client'
import { ICurriculums } from '@/@types/curriculum'
import { api } from '@/services/apiClient'
import { useQuery } from '@tanstack/react-query'

const fetchListCurriculums = async (): Promise<ICurriculums> => {
  const { data } = await api.get<ICurriculums>('/curriculum/list/1')

  return data
}

export const useListCurriculums = () => {
  return useQuery({
    queryKey: ['list-curriculums'],
    queryFn: fetchListCurriculums,
  })
}
