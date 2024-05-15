/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { CreateCurriculumContext } from '@/contexts/CreateCurriculumContext'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FaPencil, FaX } from 'react-icons/fa6'
import { toast } from 'react-toastify'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1, 'Campo obrigatório'),
  url: z.string().url({ message: 'URL inválida' }),
})

type schemaEditLinkProps = z.infer<typeof schema>

interface EditLinkFormProps {
  link?: {
    id?: number
    name?: string
    url?: string
  }
}

export function EditLinksForm({ link }: EditLinkFormProps) {
  const { setDataLinks, dataLinks } = useContext(CreateCurriculumContext)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<schemaEditLinkProps>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (link) {
      setValue('name', link.name ?? '')
      setValue('url', link.url ?? '')
    }
  }, [link, setValue])

  function handleEditLink(data: schemaEditLinkProps) {
    const updatedLinks = dataLinks.map((item) => {
      if (item.id === link?.id) {
        return {
          ...item,
          ...data,
        }
      }
      return item
    })

    setDataLinks(updatedLinks)

    toast.success('Link editado com sucesso!')
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div className="p-2 border rounded-full cursor-pointer hover:scale-95 duration-200">
          <FaPencil size={20} />
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-primaryA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="overflow-y-auto flex flex-col gap-4 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[550px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-secondary p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]">
          <Dialog.Title className="text-primary font-semibold text-xl text-center">
            Editar link
          </Dialog.Title>
          <Dialog.Description className="text-primary text-center">
            Preencha os campos abaixo para editar um link do seu currículo
          </Dialog.Description>
          <form
            className="w-full flex flex-col gap-4"
            onSubmit={handleSubmit(handleEditLink)}
          >
            <fieldset className="flex flex-col w-full gap-2">
              <label className="text-primary" htmlFor="name">
                Nome do link
              </label>
              <input
                className="border border-primary rounded-md p-3 w-full bg-transparent text-primary"
                id="name"
                {...register('name')}
                placeholder="Digite o nome do link"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </fieldset>
            <fieldset className="flex flex-col w-full gap-2">
              <label className="text-primary" htmlFor="url">
                URL do link
              </label>
              <input
                id="url"
                {...register('url')}
                className="border border-primary rounded-md p-3 w-full bg-transparent text-primary"
                placeholder="Digite a URL do link"
              />
              {errors.url && (
                <span className="text-red-500 text-sm">
                  {errors.url.message}
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
