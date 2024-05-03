import { Collapse } from '@/components/Collapses/collapse'
import { ModalAddTopic } from '@/components/Modals/addTopic'
import { ModalDeletTopic } from '@/components/Modals/deleteTopic'

interface TopicItemProps {
  titleCollapse: string
  contentCollapse: string
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
  type?:
    | 'default'
    | 'custom'
    | 'education'
    | 'experience'
    | 'skills'
    | 'links'
    | 'resume'
}

export function TopicItem({
  contentCollapse = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit cupiditate beatae magni eaque fuga id ducimus adipisci ex. Dolorum iure quia iusto optio quam eligendi a dolores et magni impedit!',
  titleCollapse = 'Slot',
  type,
  link,
  experience,
  education,
  skill,
}: TopicItemProps) {
  return (
    <div className="flex w-full gap-4">
      <Collapse
        title={titleCollapse}
        content={contentCollapse}
        type={type}
        link={link}
        skill={skill}
        education={education}
        experience={experience}
      />
      <div className="flex gap-3 items-center">
        <ModalAddTopic />
        <ModalDeletTopic />
      </div>
    </div>
  )
}
