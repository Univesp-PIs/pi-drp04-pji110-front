interface ICurriculum {
  id: string
  title: string
  name: string
  key: string
}

export interface ICurriculums {
  cvs: ICurriculum[]
  myCvs: ICurriculum[]
}

export interface IGetCurriculum {
  user: {
    name: string
    title: string
    email: string
    phone: string
    location: string
    avatar: string
    gender: string
    pronoun: string
    description: string
    accessLevel: string
    published: boolean
    created_at: string
    updated_at: string
    key: string
    id: number
  }
  links: {
    name: string
    url: string
  }[]

  experience: {
    company: string
    position: string
    period: string
    description: string
  }[]

  education: {
    institution: string
    course: string
    period: string
    description: string
  }[]

  skills: string[]
  Custom: {
    title: string
    description: string
    topicType: {
      type: string
      description: string
      percentage: number
      color: string
      type: string
      topics: string[]
    }
  }[]
}

export interface ICreateCurriculum {
  user: {
    name: string
    title: string
    email: string
    phone: string
    location: string
    gender: string
    pronoun: string
    description: string
    id: string
    published: boolean
    access_level: 'Private' | 'Public'
  }
  links: {
    name: string
    url: string
  }[]

  experience: {
    company: string
    position: string
    period: string
    description: string
  }[]

  education: {
    institution: string
    course: string
    period: string
    description: string
  }[]

  skills: string[]
  Custom: {
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
}
