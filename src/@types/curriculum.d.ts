interface ICurriculum {
  name: string
  title: string
  id: string
  key: string
}

export interface ICurriculums {
  cvs: ICurriculum[]
  myCvs: ICurriculum[]
}

export interface IGetCurriculum {
  user: {
    id: number
    name: string
    title: string
    email: string
    phone: string
    location: string
    avatar: string
    gender: string
    pronoun: string
    description: string
    accessLevel: 'public' | 'private'
    published: boolean
    created_at: string
    updated_at: string
    key: string
  }
  links: {
    id: number
    name: string
    url: string
  }[]

  experience: {
    id: number
    company: string
    position: string
    period: string
    description: string
  }[]

  education: {
    id: number
    institution: string
    course: string
    period: string
    description: string
  }[]

  skills: {
    id: number
    name: string
  }[]
  Custom: {
    id: number
    title: string
    description: string
    topicType: {
      type: 'graphic' | 'topics'
      description: string
      percentage: number
      color: string
      type: string
      topics: string[]
    }
  }[]
  user_admin: boolean
  user_credential_id: string
  credential_id: string
}

export interface ICreateCurriculum {
  user: {
    id?: string
    name: string
    title: string
    email: string
    phone: string
    location: string
    avatar: string
    gender: string
    pronoun: string
    description: string
    access_level: 'Private' | 'Public'
    published: boolean
  }
  links: {
    name?: string
    url?: string
  }[]

  experience: {
    company?: string
    position?: string
    period?: string
    description?: string
  }[]

  education: {
    institution?: string
    course?: string
    period?: string
    description?: string
  }[]

  skills: {
    name?: string
  }[]

  Custom: {
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
}
export interface IUpdateCurriculum {
  user: {
    id?: number
    name: string
    title: string
    email: string
    phone: string
    location: string
    avatar: string
    gender: string
    pronoun: string
    description: string
    access_level: 'Private' | 'Public'
    published: boolean
  }

  links: {
    id?: number
    name?: string
    url?: string
  }[]

  experience: {
    id?: number
    company?: string
    position?: string
    period?: string
    description?: string
  }[]

  education: {
    id?: number
    institution?: string
    course?: string
    period?: string
    description?: string
  }[]

  skills: {
    id?: number
    name?: string
  }[]

  Custom: {
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
  }[]

  key: string
}
