'use client'

import { CreateCurriculumContext } from '@/contexts/CreateCurriculumContext'
import * as Dialog from '@radix-ui/react-dialog'
import { useContext } from 'react'
import { FaMinus, FaX } from 'react-icons/fa6'
import { toast } from 'react-toastify'

interface ModalDeletTopicProps {
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
}

export function ModalDeletTopic({
  link,
  experience,
  education,
  skill,
  custom,
  type,
}: ModalDeletTopicProps) {
  const {
    dataEducation,
    dataExperience,
    dataLinks,
    dataSkills,
    dataCustom,
    setDataEducation,
    setDataExperience,
    setDataLinks,
    setDataResume,
    setDataSkills,
    setDataCustom,
  } = useContext(CreateCurriculumContext)

  function handleDelete() {
    if (type === 'education') {
      const newData = dataEducation.filter(
        (item) =>
          item.institution !== education?.institution &&
          item.course !== education?.course &&
          item.period !== education?.period,
      )
      setDataEducation(newData)
    } else if (type === 'experience') {
      const newData = dataExperience.filter(
        (item) =>
          item.company !== experience?.company &&
          item.position !== experience?.position &&
          item.period !== experience?.period,
      )
      setDataExperience(newData)
    } else if (type === 'links') {
      const newData = dataLinks.filter(
        (item) => item.name !== link?.name && item.url !== link?.url,
      )
      setDataLinks(newData)
    } else if (type === 'resume') {
      setDataResume('')
    } else if (type === 'skills') {
      const newData = dataSkills.filter((item) => item !== skill)
      setDataSkills(newData)
    } else if (type === 'custom') {
      const newData = dataCustom.filter(
        (item) =>
          item.title !== custom?.title &&
          item.description !== custom?.description,
      )
      setDataCustom(newData)
    }

    toast.success('Removido com sucesso!')
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div className="p-2 border rounded-full cursor-pointer hover:scale-95 duration-200">
          <FaMinus className="" size={20} />
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-primaryA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="overflow-y-auto flex flex-col gap-4 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[550px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-secondary p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]">
          <Dialog.Title className="text-primary font-semibold text-xl">
            Deletar
          </Dialog.Title>
          <Dialog.Description className="text-primary">
            Tem certeza que deseja deletar?
          </Dialog.Description>
          <div className="w-full flex gap-4">
            <Dialog.Close asChild>
              <button className="p-4 border rounded-md w-full text-center bg-green-500 text-white">
                Não
              </button>
            </Dialog.Close>
            <Dialog.Close asChild onClick={handleDelete}>
              <button className="p-4 border rounded-md w-full text-center bg-red-500 text-white">
                Sim
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-primary p-2 hover:bg-primary hover:text-secondary focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none duration-100"
              aria-label="Close"
            >
              <FaX size={20} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
