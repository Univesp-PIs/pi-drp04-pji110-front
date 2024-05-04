'use client'

import { ICurriculums } from '@/@types/curriculum'
import { api } from '@/services/apiClient'
import { useQuery } from '@tanstack/react-query'

const fetchListCurriculums = async (id: string): Promise<ICurriculums> => {
  const { data } = await api.get<ICurriculums>(`/curriculum/list/${id}`)

  return data
}

export const useListCurriculums = (id: string) => {
  return useQuery({
    queryKey: ['list-curriculums', id],
    queryFn: () => fetchListCurriculums(id),
  })
}
