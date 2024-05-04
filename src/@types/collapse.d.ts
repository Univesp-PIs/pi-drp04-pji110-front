export interface CollapseProps {
  id?: number
  title: string
  content: string
  link?: {
    name: string
    url: string
  }
  experience?: {
    company: string
    position: string
    period: string
    description: string
  }
  education?: {
    institution: string
    course: string
    period: string
    description: string
  }
  skill?: string
  custom?: {
    title: string
    description: string
    topicType: {
      type: 'graphic' | 'topics'
      description?: string
      percentage?: number
      color?: string
      topics?: string[]
    }
  }

  type?:
    | 'default'
    | 'custom'
    | 'education'
    | 'experience'
    | 'skills'
    | 'links'
    | 'resume'
}
