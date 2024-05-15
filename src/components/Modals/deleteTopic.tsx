'use client'

import { CreateCurriculumContext } from '@/contexts/CreateCurriculumContext'
import * as Dialog from '@radix-ui/react-dialog'
import { useContext } from 'react'
import { FaMinus, FaX } from 'react-icons/fa6'
import { toast } from 'react-toastify'

interface ModalDeletTopicProps {
  link?: {
    id?: number
    status?: boolean
    name?: string
    url?: string
  }
  experience?: {
    id?: number
    status?: boolean
    company?: string
    position?: string
    period?: string
    description?: string
  }
  education?: {
    id?: number
    status?: boolean
    institution?: string
    course?: string
    period?: string
    description?: string
  }
  skill?: {
    id?: number
    name?: string
    status?: boolean
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
    status?: boolean
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
      if (education?.id) {
        const educationToUpdate = dataEducation.find(
          (item) => item.id === education.id,
        )

        if (educationToUpdate) {
          const updatedEducation = [...dataEducation]

          const updatedEducationItem = {
            id: educationToUpdate.id,
            status: false,
          }

          const indexToUpdate = updatedEducation.findIndex(
            (item) => item.id === education.id,
          )

          // 6. Substitua o objeto antigo pelo objeto atualizado no novo array
          updatedEducation[indexToUpdate] = updatedEducationItem

          // 7. Atualize o estado do contexto com o novo array
          setDataEducation(updatedEducation)
        }
      } else {
        const newData = dataEducation.filter(
          (item) =>
            item.institution !== education?.institution &&
            item.course !== education?.course &&
            item.period !== education?.period,
        )
        setDataEducation(newData)
      }
    } else if (type === 'experience') {
      if (experience?.id) {
        const experienceToUpdate = dataExperience.find(
          (item) => item.id === experience.id,
        )

        if (experienceToUpdate) {
          const updatedExperience = [...dataExperience]

          const updatedExperienceItem = {
            id: experienceToUpdate.id,
            status: false,
          }

          const indexToUpdate = updatedExperience.findIndex(
            (item) => item.id === experience.id,
          )

          // 6. Substitua o objeto antigo pelo objeto atualizado no novo array
          updatedExperience[indexToUpdate] = updatedExperienceItem

          // 7. Atualize o estado do contexto com o novo array
          setDataExperience(updatedExperience)
        }
      } else {
        const newData = dataExperience.filter(
          (item) =>
            item.company !== experience?.company &&
            item.position !== experience?.position &&
            item.period !== experience?.period,
        )
        setDataExperience(newData)
      }
    } else if (type === 'links') {
      if (link?.id) {
        const linkToUpdate = dataLinks.find((item) => item.id === link.id)

        if (linkToUpdate) {
          const updatedLinks = [...dataLinks]

          const updatedLinkItem = {
            id: linkToUpdate.id,
            status: false,
          }

          const indexToUpdate = updatedLinks.findIndex(
            (item) => item.id === link.id,
          )

          // 6. Substitua o objeto antigo pelo objeto atualizado no novo array
          updatedLinks[indexToUpdate] = updatedLinkItem

          // 7. Atualize o estado do contexto com o novo array
          setDataLinks(updatedLinks)
        }
      } else {
        const newData = dataLinks.filter(
          (item) => item.name !== link?.name && item.url !== link?.url,
        )
        setDataLinks(newData)
      }
    } else if (type === 'resume') {
      setDataResume('')
    } else if (type === 'skills') {
      if (skill?.id) {
        const skillToUpdate = dataSkills.find((item) => item.id === skill.id)

        if (skillToUpdate) {
          const updatedSkills = [...dataSkills]

          const updatedSkillItem = {
            id: skillToUpdate.id,
            status: false,
          }

          const indexToUpdate = updatedSkills.findIndex(
            (item) => item.id === skill.id,
          )

          // 6. Substitua o objeto antigo pelo objeto atualizado no novo array
          updatedSkills[indexToUpdate] = updatedSkillItem

          // 7. Atualize o estado do contexto com o novo array
          setDataSkills(updatedSkills)
        }
      } else {
        const newData = dataSkills.filter((item) => item.name !== skill?.name)
        setDataSkills(newData)
      }
    } else if (type === 'custom') {
      if (custom?.id) {
        const customToUpdate = dataCustom.find((item) => item.id === custom.id)

        if (customToUpdate) {
          const updatedCustom = [...dataCustom]

          const updatedCustomItem = {
            id: customToUpdate.id,
            status: false,
            topicType: {
              type: customToUpdate.topicType?.type as 'graphic' | 'topics',
            },
          }

          const indexToUpdate = updatedCustom.findIndex(
            (item) => item.id === custom.id,
          )

          // 6. Substitua o objeto antigo pelo objeto atualizado no novo array
          updatedCustom[indexToUpdate] = updatedCustomItem

          // 7. Atualize o estado do contexto com o novo array
          setDataCustom(updatedCustom)
        }
      } else {
        const newData = dataCustom.filter(
          (item) =>
            item.title !== custom?.title &&
            item.description !== custom?.description,
        )
        setDataCustom(newData)
      }
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
