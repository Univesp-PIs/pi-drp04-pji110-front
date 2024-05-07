'use client'
import { IGetCurriculum } from '@/@types/curriculum'
import { api } from '@/services/apiClient'
import { useQuery } from '@tanstack/react-query'

const fetchGetCurriculum = async (userID: string): Promise<IGetCurriculum> => {
  const { data } = await api.get<IGetCurriculum>(
    `/curriculum/profile/${userID}`,
  )

  return data
}

export const useGetCurriculum = (userID: string) => {
  return useQuery({
    queryKey: ['get-curriculum', userID],
    queryFn: () => fetchGetCurriculum(userID),
  })
}
