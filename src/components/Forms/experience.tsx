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
  company: z.string().min(1, 'Campo obrigatório'),
  position: z.string().min(1, 'Campo obrigatório'),
  period: z.string().min(1, 'Campo obrigatório'),
  description: z.string().min(1, 'Campo obrigatório'),
})

type schemaAddExperienceProps = z.infer<typeof schema>

export function ExperienceForm() {
  const { setDataExperience } = useContext(CreateCurriculumContext)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<schemaAddExperienceProps>({
    resolver: zodResolver(schema),
  })

  function handleAddExperience(data: schemaAddExperienceProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setDataExperience((prev: any) => [...prev, data])
    toast.success('Experiência adicionada com sucesso!')
    reset()
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="p-4 border border-primary rounded-md w-full text-center bg-transparent text-primary hover:bg-primary hover:text-secondary duration-300">
          Experiência
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-primaryA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="overflow-y-auto flex flex-col gap-4 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[550px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-secondary p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]">
          <Dialog.Title className="text-primary font-semibold text-xl text-center">
            Criar experiência
          </Dialog.Title>
          <Dialog.Description className="text-primary text-center">
            Preencha os campos abaixo para adicionar experiências ao seu
            currículo
          </Dialog.Description>
          <form
            className="w-full flex flex-col gap-4"
            onSubmit={handleSubmit(handleAddExperience)}
          >
            <fieldset className="flex flex-col w-full gap-2">
              <label className="text-primary" htmlFor="company">
                Empresa
              </label>
              <input
                className="border border-primary rounded-md p-3 w-full bg-transparent text-primary"
                id="company"
                {...register('company')}
                placeholder="Digite o nome da empresa, ex: Google"
              />
              {errors.company && (
                <span className="text-red-500 text-sm">
                  {errors.company.message}
                </span>
              )}
            </fieldset>
            <fieldset className="flex flex-col w-full gap-2">
              <label className="text-primary" htmlFor="position">
                Cargo
              </label>
              <input
                className="border border-primary rounded-md p-3 w-full bg-transparent text-primary"
                id="position"
                {...register('position')}
                placeholder="Digite o cargo, ex: Desenvolvedor Front-end"
              />
              {errors.position && (
                <span className="text-red-500 text-sm">
                  {errors.position.message}
                </span>
              )}
            </fieldset>
            <fieldset className="flex flex-col w-full gap-2">
              <label className="text-primary" htmlFor="period">
                Período
              </label>
              <input
                id="period"
                {...register('period')}
                className="border border-primary rounded-md p-3 w-full bg-transparent text-primary"
                placeholder="Digite o período, ex: 2020 - 2021"
              />
              {errors.period && (
                <span className="text-red-500 text-sm">
                  {errors.period.message}
                </span>
              )}
            </fieldset>
            <fieldset className="flex flex-col w-full gap-2">
              <label className="text-primary" htmlFor="description">
                Descrição
              </label>
              <textarea
                id="description"
                {...register('description')}
                className="border border-primary rounded-md p-3 w-full bg-transparent text-primary"
                placeholder="Digite a descrição, ex: Desenvolvimento de aplicações web."
              />
              {errors.description && (
                <span className="text-red-500 text-sm">
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
