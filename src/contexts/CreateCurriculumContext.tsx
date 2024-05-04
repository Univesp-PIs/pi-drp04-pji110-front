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

type createCustom = {
  title: string
  description: string
  topicType: {
    type: 'graphic' | 'topics'
    description?: string
    percentage?: number
    color?: string
    topics?: string[]
  }
}[]

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

  dataCustom: {
    title: string
    description: string
    topicType: {
      type: 'graphic' | 'topics'
      description?: string
      percentage?: number
      color?: string
      topics?: string[]
    }
  }[]
  setDataCustom: (data: createCustom | any) => void
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
  const [dataCustom, setDataCustom] = useState([])

  return (
    <CreateCurriculumContext.Provider
      value={{
        dataLinks,
        dataEducation,
        dataExperience,
        dataSkills,
        dataResume,
        dataCustom,
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
