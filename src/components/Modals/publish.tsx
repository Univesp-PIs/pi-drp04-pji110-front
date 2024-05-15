import * as Dialog from '@radix-ui/react-dialog'
import { FaX } from 'react-icons/fa6'

interface IModalAccessLevelCurriculumProps {
  acessLevel: string
  setAccessLevel: (value: string) => void
}

export function ModalAccessLevelCurriculum({
  acessLevel,
  setAccessLevel,
}: IModalAccessLevelCurriculumProps) {
  const accessLevelPublic = acessLevel === 'public'

  function handlePublish(value: boolean) {
    const newValue = value ? 'public' : 'private'
    setAccessLevel(newValue)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          className={`${accessLevelPublic ? 'bg-green-500' : 'bg-red-600'} w-full md:w-1/4 p-4 rounded-md text-center hover:bg-secondary hover:text-primary duration-300`}
        >
          {accessLevelPublic ? 'Publico' : 'Privado'}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-primaryA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="overflow-y-auto flex flex-col gap-4 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[550px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-secondary p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]">
          <Dialog.Title className="text-primary font-semibold text-xl">
            {accessLevelPublic ? 'Deixar Privado' : 'Deixar Público'}
          </Dialog.Title>
          <Dialog.Description className="text-primary">
            {accessLevelPublic
              ? 'Deseja deixar seu currículo privado? isso permitirá que apenas pessoas com o link possam ver seu currículo.'
              : 'Deseja deixar seu currículo público? isso permitirá que outras pessoas vejam seu currículo.'}
          </Dialog.Description>
          <div className="w-full flex gap-4">
            <Dialog.Close asChild>
              <button className="p-4 border rounded-md w-full text-center bg-red-500 text-white">
                Não
              </button>
            </Dialog.Close>
            <Dialog.Close
              asChild
              onClick={() => handlePublish(!accessLevelPublic)}
            >
              <button className="p-4 border rounded-md w-full text-center bg-green-500 text-white">
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
