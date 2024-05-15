import * as Dialog from '@radix-ui/react-dialog'
import { FaPlus, FaX } from 'react-icons/fa6'
import { ResumeForm } from '../Forms/createCurriculum/resume'
import { ExperienceForm } from '../Forms/createCurriculum/experience'
import { EducationForm } from '../Forms/createCurriculum/education'
import { SkillsForm } from '../Forms/createCurriculum/skills'
import { CustomForm } from '../Forms/createCurriculum/custom'
import { LinksForm } from '../Forms/createCurriculum/links'

interface ModalAddTopicProps {
  isPulse?: boolean
}

export function ModalAddTopic({ isPulse = false }: ModalAddTopicProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div
          className={`p-2 border rounded-full cursor-pointer hover:scale-95 duration-200 ${isPulse && 'animate-bounce'}`}
        >
          <FaPlus size={isPulse ? 30 : 20} />
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-primaryA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="overflow-y-auto flex flex-col gap-4 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[550px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-secondary p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]">
          <Dialog.Title className="text-primary font-semibold text-xl text-center">
            Selecione o tópico
          </Dialog.Title>
          <Dialog.Description className="text-primary text-center">
            Selecione o tipo de tópico que deseja adicionar
          </Dialog.Description>
          <div className="w-full flex flex-col gap-4">
            <ResumeForm />
            <EducationForm />
            <ExperienceForm />
            <LinksForm />
            <SkillsForm />
            <CustomForm />
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
