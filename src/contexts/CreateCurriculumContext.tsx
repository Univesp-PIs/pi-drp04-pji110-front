/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { ReactNode, createContext, useState } from 'react'

type createLink = {
  id?: number
  status?: boolean
  name?: string
  url?: string
}[]

type createResume = {
  description: string
}

type createExperience = {
  id?: number
  status?: boolean
  company?: string
  position?: string
  period?: string
  description?: string
}[]

type createEducation = {
  id?: number
  status?: boolean
  institution?: string
  course?: string
  period?: string
  description?: string
}[]

type createSkills = {
  id?: number
  status?: boolean
  name?: string
}[]

type createCustom = {
  id?: number
  status?: boolean
  title?: string
  description?: string
  topicType?: {
    type: 'graphic' | 'topics'
    description?: string
    percentage?: number
    color?: string
    topics?: string[]
  }
}[]

interface DataCreateCurriculumContextType {
  dataLinks: createLink
  setDataLinks: (data: createLink | any) => void

  dataResume: string
  setDataResume: ({ description }: createResume | any) => void

  dataExperience: createExperience
  setDataExperience: (data: createExperience | any) => void

  dataEducation: createEducation
  setDataEducation: (data: createEducation | any) => void

  dataSkills: createSkills
  setDataSkills: (data: createSkills | any) => void

  dataCustom: createCustom
  setDataCustom: (data: createCustom | any) => void

  resetValues: () => void
}

export const CreateCurriculumContext = createContext(
  {} as DataCreateCurriculumContextType,
)

interface CurriculumContextProviderProps {
  children: ReactNode
}

export function CreateCurriculumContextProvider({
  children,
}: CurriculumContextProviderProps) {
  const [dataResume, setDataResume] = useState('')
  const [dataLinks, setDataLinks] = useState([])
  const [dataExperience, setDataExperience] = useState([])
  const [dataEducation, setDataEducation] = useState([])
  const [dataSkills, setDataSkills] = useState([])
  const [dataCustom, setDataCustom] = useState([])

  function resetValues() {
    setDataResume('')
    setDataLinks([])
    setDataExperience([])
    setDataEducation([])
    setDataSkills([])
    setDataCustom([])
  }

  return (
    <CreateCurriculumContext.Provider
      value={{
        dataLinks,
        dataEducation,
        dataExperience,
        dataSkills,
        dataResume,
        dataCustom,
        resetValues,
        setDataLinks,
        setDataEducation,
        setDataExperience,
        setDataSkills,
        setDataResume,
        setDataCustom,
      }}
    >
      {children}
    </CreateCurriculumContext.Provider>
  )
}
