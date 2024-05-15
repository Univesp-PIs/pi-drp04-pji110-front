import { Collapse } from '@/components/Collapses/collapse'
import { ModalAddTopic } from '@/components/Modals/addTopic'
import { ModalDeletTopic } from '@/components/Modals/deleteTopic'
import { ModalEditTopic } from './Modals/editTopic'

interface TopicItemProps {
  titleCollapse?: string
  contentCollapse?: string
  link?: {
    name?: string
    url?: string
  }
  experience?: {
    company?: string
    position?: string
    period?: string
    description?: string
  }
  education?: {
    institution?: string
    course?: string
    period?: string
    description?: string
  }
  skill?: {
    name?: string
  }
  custom?: {
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
  isEdit?: boolean
}

export function TopicItem({
  contentCollapse = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit cupiditate beatae magni eaque fuga id ducimus adipisci ex. Dolorum iure quia iusto optio quam eligendi a dolores et magni impedit!',
  titleCollapse = 'Slot',
  type,
  link,
  experience,
  education,
  skill,
  custom,
  isEdit = false,
}: TopicItemProps) {
  return (
    <div className="flex w-full gap-4 flex-col md:flex-row justify-center items-center">
      <Collapse
        title={titleCollapse}
        content={contentCollapse}
        type={type}
        link={link}
        skill={skill}
        education={education}
        experience={experience}
        custom={custom}
      />
      <div className="flex gap-3 items-center">
        <ModalAddTopic />
        <ModalDeletTopic
          link={link}
          skill={skill}
          education={education}
          experience={experience}
          custom={custom}
          type={type}
        />
        {isEdit && (
          <ModalEditTopic
            link={link}
            skill={skill}
            education={education}
            experience={experience}
            custom={custom}
            type={type}
          />
        )}
      </div>
    </div>
  )
}
