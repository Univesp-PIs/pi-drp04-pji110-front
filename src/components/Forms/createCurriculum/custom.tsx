'use client'

import { CreateCurriculumContext } from '@/contexts/CreateCurriculumContext'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaX } from 'react-icons/fa6'
import { toast } from 'react-toastify'
import { z } from 'zod'

const schema = z.object({
  title: z.string().min(1, 'Campo obrigatório'),
  description: z.string().min(1, 'Campo obrigatório'),
  topic: z.string().optional(),
  topicType: z.object({
    type: z.string(),
    description: z.string().optional(),
    percentage: z.string().optional(),
    color: z.string().optional(),
    topics: z.array(z.string()).optional(),
  }),
})

type schemaAddCustomProps = z.infer<typeof schema>

export function CustomForm() {
  const { setDataCustom } = useContext(CreateCurriculumContext)
  const [topics, setTopics] = useState<string[]>([])

  function handleAddTopic(topic: string) {
    setTopics((prev) => [...prev, topic])
    setValue('topicType.topics', [...topics, topic])
    setValue('topic', '')
  }

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<schemaAddCustomProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      topicType: {
        type: 'graphic',
        topics: [],
      },
    },
  })

  const thisOption = watch('topicType.type')
  const topic = watch('topic')

  function handleAddCustom(data: schemaAddCustomProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setDataCustom((prev: any) => [...prev, data])
    toast.success('Tópico customizado adicionado com sucesso!')
    reset()
  }

  function handleRemoveTopic(index: number) {
    const newTopics = topics.filter((_, i) => i !== index)
    setTopics(newTopics)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="p-4 border border-primary rounded-md w-full text-center bg-transparent text-primary hover:bg-primary hover:text-secondary duration-300">
          Novo (+)
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-primaryA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="overflow-y-auto flex flex-col gap-4 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[550px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-secondary p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]">
          <Dialog.Title className="text-primary font-semibold text-xl text-center">
            Criar tópico customizado
          </Dialog.Title>
          <Dialog.Description className="text-primary text-center">
            Preencha os campos abaixo para adicionar um tópico customizado ao
            seu currículo
          </Dialog.Description>
          <form
            className="w-full flex flex-col gap-4"
            onSubmit={handleSubmit(handleAddCustom)}
          >
            <fieldset className="flex flex-col w-full gap-2">
              <label className="text-primary" htmlFor="title">
                Título
              </label>
              <input
                className="border border-primary rounded-md p-3 w-full bg-transparent text-primary"
                id="title"
                {...register('title')}
              />
              {errors.title && (
                <span className="text-red-500">{errors.title.message}</span>
              )}
            </fieldset>

            <fieldset className="flex flex-col w-full gap-2">
              <label className="text-primary" htmlFor="description">
                Descrição
              </label>
              <textarea
                className="border border-primary rounded-md p-3 w-full bg-transparent text-primary"
                id="description"
                {...register('description')}
              />
              {errors.description && (
                <span className="text-red-500">
                  {errors.description.message}
                </span>
              )}
            </fieldset>

            <fieldset className="flex flex-col w-full gap-2">
              <label className="text-primary" htmlFor="topicType.type">
                Tipo
              </label>
              <select
                className="border border-primary rounded-md p-3 w-full bg-transparent text-primary"
                id="topicType.type"
                {...register('topicType.type')}
              >
                <option value="graphic">Gráfico</option>
                <option value="topics">Tópicos</option>
              </select>
            </fieldset>

            {thisOption === 'graphic' && (
              <>
                <fieldset className="flex flex-col w-full gap-2">
                  <label
                    className="text-primary"
                    htmlFor="topicType.description"
                  >
                    Descrição
                  </label>
                  <textarea
                    className="border border-primary rounded-md p-3 w-full bg-transparent text-primary"
                    id="topicType.description"
                    {...register('topicType.description')}
                  />
                </fieldset>

                <fieldset className="flex flex-col w-full gap-2">
                  <label
                    className="text-primary"
                    htmlFor="topicType.percentage"
                  >
                    Porcentagem
                  </label>
                  <input
                    className="border border-primary rounded-md p-3 w-full bg-transparent text-primary"
                    id="topicType.percentage"
                    min={0}
                    max={100}
                    type="number"
                    {...register('topicType.percentage')}
                  />
                </fieldset>

                <fieldset className="flex flex-col w-full gap-2">
                  <label className="text-primary" htmlFor="topicType.color">
                    Cor
                  </label>
                  <input
                    className="border h-20 border-primary rounded-md p-3 w-full bg-transparent text-primary"
                    type="color"
                    id="topicType.color"
                    {...register('topicType.color')}
                  />
                </fieldset>
              </>
            )}

            {thisOption === 'topics' && (
              <fieldset className="flex flex-col items-end justify-center w-full gap-2">
                <div className="flex flex-col md:flex-row items-end justify-center w-full gap-2">
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-primary" htmlFor="topicType.topics">
                      Tópicos
                    </label>
                    <input
                      className="border border-primary rounded-md p-3 w-full bg-transparent text-primary"
                      id="topicType.topics"
                      {...register('topic')}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddTopic(topic as string)}
                    className="border border-primary rounded-md p-3 w-full bg-transparent text-primary"
                  >
                    Adicionar
                  </button>
                </div>
                {topics.length > 0 && (
                  <div className="w-full">
                    <p className="text-black text-lg">Tópicos Adicionados:</p>
                    <ul className="list-disc pl-6">
                      {topics.map((topic, index) => (
                        <li
                          key={index}
                          className="text-black flex gap-3 items-center"
                        >
                          <span>{topic}</span>
                          <FaX
                            size={13}
                            className="text-red-600 cursor-pointer"
                            onClick={() => handleRemoveTopic(index)}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </fieldset>
            )}

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
