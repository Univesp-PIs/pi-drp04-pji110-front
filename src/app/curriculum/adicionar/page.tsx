'use client'

import { ButtonBack } from '@/components/Buttons/back'
import { IoShareSocial } from 'react-icons/io5'

import * as Avatar from '@radix-ui/react-avatar'
import { formatRoute } from '@/utils/formatRoute'
import { ModalSaveCurriculum } from '@/components/Modals/save'
import { ModalPublishCurriculum } from '@/components/Modals/publish'
import { useContext, useState } from 'react'
import { AuthContext } from '@/contexts/AuthContex'
import { TopicItem } from '../editar/[slug]/components/topicItem'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCreateCurriculum } from '@/hooks/curriculum/createCurriculum'
import { InputCurriculum } from '@/components/Inputs/inputCurriculum'
import { CreateCurriculumContext } from '@/contexts/CreateCurriculumContext'
import { ModalAddTopic } from '@/components/Modals/addTopic'

const schema = z.object({
  user: z.object({
    name: z
      .string({ required_error: 'Nome obrigatório' })
      .max(100, 'Máximo de 100 caracteres')
      .refine(
        (value) => {
          const names = value.split(' ')
          return names.length === 2 && names.every((name) => name.length > 0)
        },
        {
          message: 'Por favor, insira o nome e sobrenome.',
        },
      ),
    title: z
      .string({ required_error: 'Profissão obrigatória' })
      .max(100, 'Máximo de 100 caracteres'),
    email: z
      .string({ required_error: 'Email obrigatório' })
      .max(100, 'Máximo de 100 caracteres')
      .email('Digite um e-mail válido'),
    phone: z
      .string({ required_error: 'Celular obrigatório' })
      .max(20, 'Máximo de 20 caracteres'),
    location: z
      .string({ required_error: 'Cidade/Estado obrigatória' })
      .max(100, 'Máximo de 100 caracteres'),
    gender: z
      .string({ required_error: 'Gênero obrigatório' })
      .max(20, 'Máximo de 20 caracteres'),
    pronoun: z
      .string({ required_error: 'Pronomes obrigatórios' })
      .max(20, 'Máximo de 20 caracteres'),
    description: z.string({ required_error: 'Descrição obrigatória' }),
  }),
  links: z
    .array(
      z.object({
        name: z.string(),
        url: z.string(),
      }),
    )
    .optional(),
  experience: z
    .array(
      z.object({
        company: z.string(),
        position: z.string(),
        period: z.string(),
        description: z.string(),
      }),
    )
    .optional(),
  education: z
    .array(
      z.object({
        institution: z.string(),
        course: z.string(),
        period: z.string(),
        description: z.string(),
      }),
    )
    .optional(),
  skills: z.array(z.string()).optional(),
  Custom: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
        topicType: z.object({
          type: z.enum(['graphic', 'topics']),
          description: z.string(),
          percentage: z.number().min(0).max(100),
          color: z.string(),
          topics: z.array(z.string()),
        }),
      }),
    )
    .optional(),
})

type schemaCreateCurriculumProps = z.infer<typeof schema>

export default function CurriculumAdd() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useContext(AuthContext)
  const [isPublished, setIsPublished] = useState(false)

  const { dataLinks, dataEducation, dataExperience, dataResume, dataSkills } =
    useContext(CreateCurriculumContext)

  console.log(dataLinks)

  const { mutateAsync } = useCreateCurriculum()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<schemaCreateCurriculumProps>({
    resolver: zodResolver(schema),
  })

  const { fullName, initials } = formatRoute(user?.user_name)

  async function handleCreateCurriculum(data: schemaCreateCurriculumProps) {
    setIsSubmitting(true)

    await mutateAsync({
      user: {
        ...data.user,
        id: user?.user_id as string,
      },
      links: data.links || [],
      experience: data.experience || [],
      education: data.education || [],
      skills: data.skills || [],
      Custom: data.Custom || [],
    })

    setIsSubmitting(false)

    reset()
  }

  return (
    <main className="w-full">
      <div className="w-full flex justify-center py-16" id="quem-somos">
        <div className="max-w-screen-md w-full flex flex-col gap-4 justify-center px-4 md:px-0">
          <div className="flex w-full justify-between">
            <div>
              <ButtonBack />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xl">ID</span>
              <span
                className={`rounded-md border text-center px-4 py-2 hover:bg-secondary hover:text-primary duration-300`}
              >
                Number
              </span>
            </div>
            <div
              className={`flex items-center justify-center border rounded-md px-4 py-2 gap-4 hover:bg-secondary hover:text-primary duration-300`}
            >
              <span>Key</span>
              <IoShareSocial size={25} />
            </div>
          </div>

          <p className="text-2xl">Dados Pessoais</p>
          <div
            className={`w-full flex flex-col gap-y-4 text-center items-center border rounded-md`}
          >
            <div
              className={`w-full flex p-4 justify-between flex-col gap-y-4 lg:flex-row text-center items-center`}
            >
              <div className="w-5/12 h-full flex items-center justify-center flex-col gap-4">
                <Avatar.Root
                  className={`border inline-flex h-[200px] w-[200px] select-none items-center justify-center overflow-hidden rounded-full align-middle`}
                >
                  <Avatar.Fallback className="capitalize text-5xl flex h-full w-full items-center justify-center font-medium">
                    {initials}
                  </Avatar.Fallback>
                </Avatar.Root>
                <div className="text-green-500">Criado em: 23/03/2024</div>
                <div className="text-yellow-400">Atualizado em: 23/03/2024</div>
              </div>
              <form
                className="flex flex-col gap-4 w-full md:w-6/12"
                onSubmit={handleSubmit(handleCreateCurriculum)}
              >
                <fieldset className="flex flex-col gap-2">
                  <InputCurriculum
                    label="Nome"
                    id="name"
                    placeholder="Digite seu nome completo"
                    {...register('user.name')}
                  />
                  {errors.user?.name && (
                    <p className="text-red-500 text-center md:text-left font-medium">
                      {errors.user.name.message}
                    </p>
                  )}
                </fieldset>
                <fieldset className="flex flex-col gap-2">
                  <InputCurriculum
                    label="Localização"
                    id="location"
                    placeholder="Digite sua cidade e estado"
                    {...register('user.location')}
                  />
                  {errors.user?.location && (
                    <p className="text-red-500 text-center md:text-left font-medium">
                      {errors.user.location.message}
                    </p>
                  )}
                </fieldset>
                <fieldset className="flex flex-col gap-2">
                  <InputCurriculum
                    label="Profissão"
                    id="career"
                    placeholder="Digite sua profissão"
                    {...register('user.title')}
                  />
                  {errors.user?.title && (
                    <p className="text-red-500 text-center md:text-left font-medium">
                      {errors.user.title.message}
                    </p>
                  )}
                </fieldset>
                <fieldset className="flex flex-col gap-2">
                  <InputCurriculum
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="Digite seu email"
                    {...register('user.email')}
                  />
                  {errors.user?.email && (
                    <p className="text-red-500 text-center md:text-left font-medium">
                      {errors.user.email.message}
                    </p>
                  )}
                </fieldset>
                <fieldset className="flex flex-col gap-2">
                  <InputCurriculum
                    label="Celular"
                    id="cellphone"
                    type="tel"
                    placeholder="Digite seu celular"
                    {...register('user.phone')}
                  />

                  {errors.user?.phone && (
                    <p className="text-red-500 text-center md:text-left font-medium">
                      {errors.user.phone.message}
                    </p>
                  )}
                </fieldset>
                <fieldset className="flex flex-col gap-2">
                  <InputCurriculum
                    label="Gênero"
                    id="gender"
                    placeholder="Digite seu gênero, ex: Masculino"
                    {...register('user.gender')}
                  />

                  {errors.user?.gender && (
                    <p className="text-red-500 text-center md:text-left font-medium">
                      {errors.user.gender.message}
                    </p>
                  )}
                </fieldset>

                <fieldset className="flex flex-col gap-2">
                  <InputCurriculum
                    label="Pronome"
                    id="pronoun"
                    placeholder="Digite seu pronome, ex: Ele/Dele"
                    {...register('user.pronoun')}
                  />
                  {errors.user?.pronoun && (
                    <p className="text-red-500 text-center md:text-left font-medium">
                      {errors.user.pronoun.message}
                    </p>
                  )}
                </fieldset>
              </form>
            </div>
          </div>
          {dataEducation.length > 0 && (
            <>
              <p className="text-2xl">Dados Educacionais</p>
              <div className="border rounded-md w-full flex items-center flex-col gap-4 p-8">
                {dataEducation.map((education) => (
                  <TopicItem
                    key={education.course}
                    titleCollapse="Educação"
                    contentCollapse={education.course}
                    type="education"
                    education={education}
                  />
                ))}
              </div>
            </>
          )}
          {dataExperience.length > 0 && (
            <>
              <p className="text-2xl">Dados Profissionais</p>
              <div className="border rounded-md w-full flex items-center flex-col gap-4 p-8">
                {dataExperience.map((experience) => (
                  <TopicItem
                    key={experience.company}
                    titleCollapse="Experiência"
                    contentCollapse={experience.company}
                    type="experience"
                    experience={experience}
                  />
                ))}
              </div>
            </>
          )}

          {dataLinks.length > 0 && (
            <>
              <p className="text-2xl">Links</p>
              <div className="border rounded-md w-full flex items-center flex-col gap-4 p-8">
                {dataLinks.map((link) => (
                  <TopicItem
                    type="links"
                    key={link.name}
                    link={link}
                    titleCollapse={link.name}
                    contentCollapse={link.url}
                  />
                ))}
              </div>
            </>
          )}

          {dataSkills.length > 0 && (
            <>
              <p className="text-2xl">Skills</p>
              <div className="border rounded-md w-full flex items-center flex-col gap-4 p-8">
                {dataSkills.map((skill) => (
                  <TopicItem
                    type="skills"
                    key={skill}
                    skill={skill}
                    titleCollapse="Skill"
                    contentCollapse={skill}
                  />
                ))}
              </div>
            </>
          )}

          <div className="w-full flex flex-col md:flex-row items-center gap-4 md:justify-between">
            <ModalSaveCurriculum />
            <ModalAddTopic />
            <ModalPublishCurriculum
              isPublished={isPublished}
              setIsPublished={setIsPublished}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
