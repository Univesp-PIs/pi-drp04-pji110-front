'use client'
import { IGetCurriculum } from '@/@types/curriculum'
import { api } from '@/services/apiClient'
import { useQuery } from '@tanstack/react-query'

<<<<<<< HEAD
const fetchGetCurriculum = async (userID: string): Promise<IGetCurriculum> => {
  const { data } = await api.get<IGetCurriculum>(
    `/curriculum/profile/${userID}`,
=======
const fetchGetCurriculum = async (
  curriculumId: string,
): Promise<IGetCurriculum> => {
  const { data } = await api.get<IGetCurriculum>(
    `/curriculum/profile/${curriculumId}`,
>>>>>>> 2584e4dded57bb7be574b90bbceeeafc35194246
  )

  return data
}

<<<<<<< HEAD
export const useGetCurriculum = (userID: string) => {
  return useQuery({
    queryKey: ['get-curriculum', userID],
    queryFn: () => fetchGetCurriculum(userID),
=======
export const useGetCurriculum = (curriculumId: string) => {
  return useQuery({
    queryKey: ['get-curriculum', curriculumId],
    queryFn: () => fetchGetCurriculum(curriculumId),
>>>>>>> 2584e4dded57bb7be574b90bbceeeafc35194246
  })
}
