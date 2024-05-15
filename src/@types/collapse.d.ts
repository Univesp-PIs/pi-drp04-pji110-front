export interface CollapseProps {
  id?: number
  title: string
  content?: string
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

  type?:
    | 'default'
    | 'custom'
    | 'education'
    | 'experience'
    | 'skills'
    | 'links'
    | 'resume'
}
