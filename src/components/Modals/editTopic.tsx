'use client'

import { EditEducationForm } from '../Forms/editCurriculum/education'
import { EditCustomForm } from '../Forms/editCurriculum/custom'
import { EditExperienceForm } from '../Forms/editCurriculum/experience'
import { EditSkillsForm } from '../Forms/editCurriculum/skills'
import { EditLinksForm } from '../Forms/editCurriculum/links'

interface ModalEditTopicProps {
  link?: {
    id?: number
    name?: string
    url?: string
  }
  experience?: {
    id?: number
    company?: string
    position?: string
    period?: string
    description?: string
  }
  education?: {
    id?: number
    institution?: string
    course?: string
    period?: string
    description?: string
  }
  skill?: {
    id?: number
    name?: string
  }
  type?:
    | 'default'
    | 'custom'
    | 'education'
    | 'experience'
    | 'skills'
    | 'links'
    | 'resume'

  custom?: {
    id?: number
    title?: string
    description?: string
    topicType?: {
      type: 'graphic' | 'topics'
      description?: string
      percentage?: number
      color?: string
      topics?: string[]
    }
  }
}

export function ModalEditTopic({
  link,
  experience,
  education,
  skill,
  custom,
  type,
}: ModalEditTopicProps) {
  if (type === 'education') {
    return <EditEducationForm education={education && education} />
  }

  if (type === 'custom') {
    return <EditCustomForm custom={custom && custom} />
  }

  if (type === 'links') {
    return <EditLinksForm link={link && link} />
  }

  if (type === 'experience') {
    return <EditExperienceForm experience={experience && experience} />
  }

  if (type === 'skills') {
    return <EditSkillsForm skill={skill && skill} />
  }

  // return (

  // )
}
