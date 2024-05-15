'use client'
import { IGetCurriculum } from '@/@types/curriculum'
import { api } from '@/services/apiClient'
import { useQuery } from '@tanstack/react-query'

const fetchGetCurriculum = async (
  userID: string,
  key: string,
): Promise<IGetCurriculum> => {
  const { data } = await api.get<IGetCurriculum>(
    `/curriculum/profile_key/${userID}`,
    {
      params: {
        key,
      },
    },
  )

  return data
}

export const useGetCurriculum = (userID: string, key: string) => {
  return useQuery({
    queryKey: ['get-curriculum', userID, key],
    queryFn: () => fetchGetCurriculum(userID, key),
  })
}
