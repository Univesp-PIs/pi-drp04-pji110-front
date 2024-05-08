'use client'

import { ButtonBack } from '@/components/Buttons/back'

import * as Avatar from '@radix-ui/react-avatar'
import * as Switch from '@radix-ui/react-switch'
import { formatRoute } from '@/utils/formatRoute'
import { ModalSaveCurriculum } from '@/components/Modals/save'
import { ModalPublishCurriculum } from '@/components/Modals/publish'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/contexts/AuthContex'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCreateCurriculum } from '@/hooks/curriculum/createCurriculum'
import { InputCurriculum } from '@/components/Inputs/inputCurriculum'
import { CreateCurriculumContext } from '@/contexts/CreateCurriculumContext'
import { ModalAddTopic } from '@/components/Modals/addTopic'
import { TopicItem } from '@/components/topicItem'

const schema = z.object({
  user: z.object({
    name: z
      .string()
      .min(1, 'Campo obrigatório')
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
      .string()
      .min(1, 'Campo obrigatório')
      .max(100, 'Máximo de 100 caracteres'),
    email: z
      .string()
      .min(1, 'Campo obrigatório')
      .max(100, 'Máximo de 100 caracteres')
      .email('Digite um e-mail válido'),
    phone: z
      .string()
      .min(1, 'Campo obrigatório')
      .max(20, 'Máximo de 20 caracteres'),
    location: z
      .string()
      .min(1, 'Campo obrigatório')
      .max(100, 'Máximo de 100 caracteres'),
    gender: z
      .string()
      .min(1, 'Campo obrigatório')
      .max(20, 'Máximo de 20 caracteres'),
    pronoun: z
      .string()
      .min(1, 'Campo obrigatório')
      .max(20, 'Máximo de 20 caracteres'),
    description: z.string().optional(),
    published: z.boolean(),
    access_level: z.string().optional(),
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
          description: z.string().optional(),
          percentage: z.number().min(0).max(100).optional(),
          color: z.string().optional(),
          topics: z.array(z.string()).optional(),
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
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    dataLinks,
    dataEducation,
    dataExperience,
    dataResume,
    dataSkills,
    dataCustom,
  } = useContext(CreateCurriculumContext)

  const { mutateAsync } = useCreateCurriculum()
  const { fullName, initials } = formatRoute(user?.user_name)

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<schemaCreateCurriculumProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      user: {
        name: fullName || '',
        published: false,
      },
    },
  })

  useEffect(() => {
    if (user?.user_name) {
      reset({
        user: {
          name: fullName,
        },
      })
    }
  }, [reset, fullName, user?.user_name])

  async function handleCreateCurriculum(data: schemaCreateCurriculumProps) {
    try {
      setIsSubmitting(true)

      const AccessLevel = isPublished ? 'Public' : 'Private'

      setValue('user.description', dataResume)
      setValue('education', dataEducation)
      setValue('experience', dataExperience)
      setValue('links', dataLinks)
      setValue('skills', dataSkills)
      setValue('Custom', dataCustom)
      setValue('user.access_level', AccessLevel)

      await mutateAsync({
        user: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(data.user as any),
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
    } catch (error) {
      setIsSubmitting(false)
      console.log(error)
    }
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
                {user?.user_id}
                {user?.user_id}
              </span>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <h2 className="text-3xl font-bold">Criar Currículum</h2>
          </div>

          <p className="text-2xl">Dados Pessoais</p>
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
                    <p className="text-red-500 text-center font-medium">
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
                    <p className="text-red-500 text-center font-medium">
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
                    <p className="text-red-500 text-center font-medium">
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
                    <p className="text-red-500 text-center font-medium">
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
                    <p className="text-red-500 text-center font-medium">
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
                    <p className="text-red-500 text-center font-medium">
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
                    <p className="text-red-500 text-center font-medium">
                      {errors.user.pronoun.message}
                    </p>
                  )}
                </fieldset>
                <fieldset className="flex items-center justify-center flex-col gap-2">
                  <div className="flex items-center justify-center gap-2">
                    <label
                      className="text-white text-lg leading-none"
                      htmlFor="airplane-mode"
                    >
                      Publicado:
                    </label>
                    <Controller
                      control={control}
                      name="user.published"
                      render={({ field }) => (
                        <Switch.Root
                          className="w-[42px] h-[25px] bg-white rounded-full relative shadow-[0_2px_10px] shadow-white focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-green-500 outline-none cursor-default"
                          id="airplane-mode"
                          onCheckedChange={(checked: boolean) =>
                            field.onChange(checked)
                          }
                        >
                          <Switch.Thumb className="block w-[21px] h-[21px] bg-green-500 rounded-full shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:bg-white data-[state=checked]:translate-x-[19px]" />
                        </Switch.Root>
                      )}
                    />
                  </div>
                  <span className="text-red-600">
                    Obs: Ao deixar marcado e salvar, o seu currículum deixará de
                    ser um rascunho
                  </span>
                </fieldset>
              </form>
            </div>
            {dataResume && (
              <div className="w-full flex flex-col gap-4 p-8">
                <p className="text-2xl">Resumo</p>
                <div className="border rounded-md w-full flex items-center flex-col gap-4 p-8">
                  <div>
                    <p>{dataResume}</p>
                  </div>
                </div>
              </div>
            )}
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

          {dataCustom.length > 0 && (
            <>
              <p className="text-2xl">Outros</p>
              <div className="border rounded-md w-full flex items-center flex-col gap-4 p-8">
                {dataCustom.map((custom) => (
                  <TopicItem
                    type="custom"
                    key={custom.title}
                    custom={custom}
                    titleCollapse={custom.title}
                    contentCollapse={custom.description}
                  />
                ))}
              </div>
            </>
          )}

          <div className="w-full flex flex-col md:flex-row items-center gap-4 md:justify-between">
            <ModalSaveCurriculum
              handleSubmit={handleSubmit(handleCreateCurriculum)}
              isSubmitting={isSubmitting}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
            <ModalAddTopic isPulse />
            <ModalPublishCurriculum
              isPublished={isPublished}
              setIsPublished={setIsPublished}
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

          {dataCustom.length > 0 && (
            <>
              <p className="text-2xl">Outros</p>
              <div className="border rounded-md w-full flex items-center flex-col gap-4 p-8">
                {dataCustom.map((custom) => (
                  <TopicItem
                    type="custom"
                    key={custom.title}
                    custom={custom}
                    titleCollapse={custom.title}
                    contentCollapse={custom.description}
                  />
                ))}
              </div>
            </>
          )}

          <div className="w-full flex flex-col md:flex-row items-center gap-4 md:justify-between">
            <ModalSaveCurriculum
              handleSubmit={handleSubmit(handleCreateCurriculum)}
              isSubmitting={isSubmitting}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
            <ModalAddTopic isPulse />
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
