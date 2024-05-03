/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { ReactNode, createContext, useState } from 'react'

type createLink = {
  name: string
  url: string
}[]

type createResume = {
  description: string
}

type createExperience = {
  company: string
  position: string
  period: string
  description: string
}[]

type createEducation = {
  institution: string
  course: string
  period: string
  description: string
}[]

type createSkills = string[]

interface DataCreateCurriculumContextType {
  dataLinks: {
    name: string
    url: string
  }[]
  setDataLinks: (data: createLink | any) => void
  dataResume: string
  setDataResume: ({ description }: createResume | any) => void
  dataExperience: {
    company: string
    position: string
    period: string
    description: string
  }[]
  setDataExperience: (data: createExperience | any) => void
  dataEducation: {
    institution: string
    course: string
    period: string
    description: string
  }[]
  setDataEducation: (data: createEducation | any) => void
  dataSkills: string[]
  setDataSkills: (data: createSkills | any) => void
}

export const CreateCurriculumContext = createContext(
  {} as DataCreateCurriculumContextType,
)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CreateCurriculumContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [dataResume, setDataResume] = useState('')
  const [dataLinks, setDataLinks] = useState([])
  const [dataExperience, setDataExperience] = useState([])
  const [dataEducation, setDataEducation] = useState([])
  const [dataSkills, setDataSkills] = useState([])

  return (
    <CreateCurriculumContext.Provider
      value={{
        dataLinks,
        dataEducation,
        dataExperience,
        dataSkills,
        dataResume,
        setDataLinks,
        setDataEducation,
        setDataExperience,
        setDataSkills,
        setDataResume,
      }}
    >
      {children}
    </CreateCurriculumContext.Provider>
  )
}
