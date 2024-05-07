'use client'

import { CreateCurriculumContext } from '@/contexts/CreateCurriculumContext'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { FaX } from 'react-icons/fa6'
import { toast } from 'react-toastify'
import { z } from 'zod'

const schema = z.object({
  description: z.string().min(1, 'Campo obrigatório'),
})

type schemaAddResumeProps = z.infer<typeof schema>

export function ResumeForm() {
  const { setDataResume } = useContext(CreateCurriculumContext)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<schemaAddResumeProps>({
    resolver: zodResolver(schema),
  })

  function handleAddResume(data: schemaAddResumeProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

    setDataResume(data.description)

    toast.success('Resumo adicionado com sucesso!')
    reset()
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="p-4 border border-primary rounded-md w-full text-center bg-transparent text-primary hover:bg-primary hover:text-secondary duration-300">
          Resumo
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-primaryA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="overflow-y-auto flex flex-col gap-4 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[700px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-secondary p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]">
          <Dialog.Title className="text-primary font-semibold text-xl text-center">
            Adicionar Resumo
          </Dialog.Title>
          <Dialog.Description className="text-primary text-center">
            Preencha o campo abaixo para adicionar um resumo ao seu currículo
          </Dialog.Description>
          <form
            className="w-full flex flex-col gap-4"
            onSubmit={handleSubmit(handleAddResume)}
          >
            <fieldset className="flex flex-col w-full gap-2">
              <label className="text-primary" htmlFor="description">
                Resumo
              </label>
              <textarea
                id="description"
                {...register('description')}
                className="border border-primary rounded-md p-3 w-full bg-transparent text-primary"
                placeholder="Digite o resumo do seu currículo"
              />
              {errors.description && (
                <span className="text-red-500">
                  {errors.description.message}
                </span>
              )}
            </fieldset>

            <div className="w-full flex gap-4">
              <Dialog.Close asChild type="button">
                <button
                  type="button"
                  className="p-4 border rounded-md w-full text-center bg-red-500 text-white"
                >
                  Cancelar
                </button>
              </Dialog.Close>
              <button
                type="submit"
                className="p-4 border rounded-md w-full text-center bg-green-500 text-white"
              >
                Salvar
              </button>
            </div>
          </form>

          <Dialog.Close asChild type="button">
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
