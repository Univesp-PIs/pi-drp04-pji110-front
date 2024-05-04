'use client'
import { IGetCurriculum } from '@/@types/curriculum'
import { api } from '@/services/apiClient'
import { useQuery } from '@tanstack/react-query'

const fetchGetCurriculum = async (
  curriculumId: string,
): Promise<IGetCurriculum> => {
  const { data } = await api.get<IGetCurriculum>(
    `/curriculum/profile/${curriculumId}`,
  )

  return data
}

export const useGetCurriculum = (curriculumId: string) => {
  return useQuery({
    queryKey: ['get-curriculum', curriculumId],
    queryFn: () => fetchGetCurriculum(curriculumId),
  })
}
