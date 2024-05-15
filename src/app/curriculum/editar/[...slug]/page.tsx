/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { ButtonBack } from '@/components/Buttons/back'

import * as Avatar from '@radix-ui/react-avatar'
import { formatRoute } from '@/utils/formatRoute'
import { ModalSaveCurriculum } from '@/components/Modals/save'
import { ModalAccessLevelCurriculum } from '@/components/Modals/publish'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/contexts/AuthContex'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { InputCurriculum } from '@/components/Inputs/inputCurriculum'
import { CreateCurriculumContext } from '@/contexts/CreateCurriculumContext'
import { ModalAddTopic } from '@/components/Modals/addTopic'
import { TopicItem } from '@/components/topicItem'
import { useGetCurriculum } from '@/hooks/curriculum/getCurriculum'
import { IoShareSocial } from 'react-icons/io5'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import { ModalDeletTopic } from '@/components/Modals/deleteTopic'
import * as Switch from '@radix-ui/react-switch'
import { EditResumeForm } from '@/components/Forms/editCurriculum/resume'
import { RiLogoutCircleLine } from 'react-icons/ri'
import { ErrorPage } from '@/components/Error'
import { SkeletonCurriculum } from '@/components/Skeletons/curriculum'
import { useRouter } from 'next/navigation'
import { useUpdateCurriculum } from '@/hooks/curriculum/updateCurriculum'
import { ModalDeleteCurriculum } from '@/components/Modals/delete'

const schema = z.object({
  user: z.object({
    name: z
      .string()
      .min(1, 'Campo obrigatório')
      .max(100, 'Máximo de 100 caracteres')
      .refine(
        (value) => {
          const names = value.split(' ')
          return names.length >= 2 && names.every((name) => name.length > 0)
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
})

type schemaCreateCurriculumProps = z.infer<typeof schema>

export default function CurriculumEdit({
  params,
}: {
  params: { slug: string }
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user, isAuthenticated, signOut } = useContext(AuthContext)
  const [acessLevel, setAccessLevel] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [dateUpdateFormated, setDateUpdateFormated] = useState('')
  const [dateCreateFormated, setDateCreateFormated] = useState('')

  const router = useRouter()

  const userID = params.slug[0]
  const key = params.slug[1]

  const {
    dataLinks,
    dataEducation,
    dataExperience,
    dataResume,
    dataSkills,
    dataCustom,
    resetValues,
    setDataCustom,
    setDataEducation,
    setDataExperience,
    setDataLinks,
    setDataResume,
    setDataSkills,
  } = useContext(CreateCurriculumContext)

  const { data, isLoading, error, refetch } = useGetCurriculum(userID, key)

  const { initials } = formatRoute(user?.user_name)

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<schemaCreateCurriculumProps>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (!isLoading && !error && data) {
      setDataCustom(data.Custom)
      setDataEducation(data.education)
      setDataExperience(data.experience)
      setDataLinks(data.links)
      setDataResume(data.user.description)
      setDataSkills(data.skills)
      setAccessLevel(data.user.accessLevel)

      setValue('user', {
        name: data.user.name,
        title: data.user.title,
        email: data.user.email,
        phone: data.user.phone,
        location: data.user.location,
        gender: data.user.location,
        pronoun: data.user.pronoun,
        published: data.user.published,
      })

      const updateDateFormatted =
        data &&
        format(new Date(data.user.updated_at), `dd/MM/yyyy 'às' HH'h'mm`)

      setDateUpdateFormated(updateDateFormatted)

      const createDateFormatted =
        data && format(new Date(data.user.created_at), `dd/MM/yyyy`)
      setDateCreateFormated(createDateFormatted)
    }
  }, [
    data,
    setValue,
    isLoading,
    error,
    setDataCustom,
    setDataEducation,
    setDataExperience,
    setDataLinks,
    setDataResume,
    setDataSkills,
    setAccessLevel,
  ])

  function revalidateData() {
    refetch()

    if (!isLoading && !error && data) {
      setDataCustom(data.Custom)
      setDataEducation(data.education)
      setDataExperience(data.experience)
      setDataLinks(data.links)
      setDataResume(data.user.description)
      setDataSkills(data.skills)
      setAccessLevel(data.user.accessLevel)

      setValue('user', {
        name: data.user.name,
        title: data.user.title,
        email: data.user.email,
        phone: data.user.phone,
        location: data.user.location,
        gender: data.user.gender,
        pronoun: data.user.pronoun,
        published: data.user.published,
      })
    }
  }

  const { mutateAsync } = useUpdateCurriculum(data?.user.key as string)

  useEffect(() => {
    if (data && !data?.user_admin) {
      toast.error('Você não tem permissão para acessar essa página.')
      router.push('/dashboard')
    }
  }, [user?.user_id, userID, router, data])

  async function handleUpdateCurriculum(data: schemaCreateCurriculumProps) {
    try {
      setIsSubmitting(true)
      await mutateAsync({
        user: {
          ...(data.user as any),
          id: user?.user_id as string,
          description: dataResume,
          access_level: acessLevel,
        },
        links: dataLinks || [],
        experience: dataExperience || [],
        education: dataEducation || [],
        skills: dataSkills || [],
        Custom: dataCustom || [],
        key,
      })

      setIsSubmitting(false)
      setDateUpdateFormated(
        new Date().toLocaleString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
        }),
      )

      resetValues()
      revalidateData()
    } catch (error) {
      setIsSubmitting(false)
      console.log(error)
    }
  }

  function handleCopy(value: string) {
    navigator.clipboard.writeText(value)
    setIsCopied(true)
    toast.success('Key copiada!')
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  return (
    <>
      {isLoading ? (
        <SkeletonCurriculum />
      ) : error ? (
        <ErrorPage />
      ) : (
        <main className="w-full">
          <div className="w-full flex justify-center py-16" id="quem-somos">
            <div className="max-w-screen-md w-full flex flex-col gap-4 justify-center px-4 md:px-0">
              <div className="flex w-full justify-between">
                <div>
                  <ButtonBack />
                </div>

                <div className="flex items-center gap-4">
                  {isAuthenticated && (
                    <RiLogoutCircleLine
                      size={40}
                      className="test-white cursor-pointer"
                      onClick={signOut}
                    />
                  )}
                  <span className="text-xl">ID</span>
                  <span
                    className={`rounded-md border text-center px-4 py-2 hover:bg-secondary hover:text-primary duration-300`}
                  >
                    {user?.user_id}
                  </span>
                </div>

                {isCopied ? (
                  <span className="text-green-400 font-medium flex items-center justify-center border rounded-md px-4 py-2 gap-4 hover:bg-secondary hover:text-primary duration-300">
                    Copiada!
                  </span>
                ) : (
                  <div
                    className="flex items-center justify-center border cursor-pointer rounded-md px-4 py-2 gap-4 hover:bg-secondary hover:text-primary duration-300"
                    onClick={() => handleCopy(data?.user.key as string)}
                  >
                    <span>Key</span>
                    <IoShareSocial size={25} />
                  </div>
                )}
              </div>

              <div className="w-full flex justify-center">
                <h2 className="text-3xl font-bold">Atualizar Currículum</h2>
              </div>

              <p className="text-2xl text-center md:text-left">
                Dados Pessoais
              </p>
              <div
                className={`w-full flex flex-col gap-y-4 text-center items-center border rounded-md`}
              >
                <div
                  className={`w-full flex p-4 justify-between flex-col gap-y-4 lg:flex-row text-center items-center`}
                >
                  <div className="w-full md:w-5/12 h-full flex items-center justify-center flex-col gap-4">
                    <Avatar.Root
                      className={`${isLoading && 'animate-pulse bg-slate-300'} border inline-flex h-[200px] w-[200px] select-none items-center justify-center overflow-hidden rounded-full align-middle`}
                    >
                      <Avatar.Fallback className="capitalize text-5xl flex h-full w-full items-center justify-center font-medium">
                        {initials}
                      </Avatar.Fallback>
                    </Avatar.Root>
                    <div className="text-green-500 flex justify-center items-center gap-3 w-full">
                      <span className="w-fit">Criado em:</span>
                      {isLoading ? (
                        <div className="bg-slate-300 w-20 h-2 rounded animate-pulse"></div>
                      ) : (
                        <span className="w-fit">{dateCreateFormated}</span>
                      )}
                    </div>
                    <div className="text-yellow-400 flex justify-center items-center gap-3 w-full">
                      <span className="w-fit">Atualizado em:</span>
                      {isLoading ? (
                        <div className="bg-slate-300 w-20 h-2 rounded animate-pulse"></div>
                      ) : (
                        <span className="w-fit">{dateUpdateFormated}</span>
                      )}
                    </div>
                  </div>
                  <form
                    className="flex flex-col gap-4 w-full md:w-6/12"
                    onSubmit={handleSubmit(handleUpdateCurriculum)}
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
                              defaultChecked={data?.user.published}
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
                        Obs: Ao deixar marcado e salvar, o seu currículum
                        deixará de ser um rascunho
                      </span>
                    </fieldset>
                  </form>
                </div>
                {dataResume && (
                  <div className="w-full flex flex-col gap-4 p-8">
                    <p className="text-2xl">Resumo</p>
                    <div className="flex flex-col md:flex-row gap-3 items-center">
                      <div className="border rounded-md w-full flex items-center flex-col gap-4 p-8">
                        <p>{dataResume}</p>
                      </div>
                      <div className="flex gap-3">
                        <ModalDeletTopic type="resume" />
                        <EditResumeForm />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {dataEducation.length > 0 && (
                <>
                  <p className="text-2xl">Dados Educacionais</p>
                  <div className="border rounded-md w-full flex items-center flex-col gap-4 p-8">
                    {dataEducation
                      .filter((education) => education.status !== false)
                      .map((education, index) => (
                        <TopicItem
                          key={index}
                          titleCollapse={education.institution}
                          contentCollapse={education.course}
                          type="education"
                          education={education}
                          isEdit
                        />
                      ))}
                  </div>
                </>
              )}
              {dataExperience.length > 0 && (
                <>
                  <p className="text-2xl">Dados Profissionais</p>
                  <div className="border rounded-md w-full flex items-center flex-col gap-4 p-8">
                    {dataExperience
                      .filter((experience) => experience.status !== false)
                      .map((experience, index) => (
                        <TopicItem
                          key={index}
                          titleCollapse={experience.company}
                          contentCollapse={experience.company}
                          type="experience"
                          experience={experience}
                          isEdit
                        />
                      ))}
                  </div>
                </>
              )}

              {dataLinks.length > 0 && (
                <>
                  <p className="text-2xl">Links</p>
                  <div className="border rounded-md w-full flex items-center flex-col gap-4 p-8">
                    {dataLinks
                      .filter((link) => link.status !== false)
                      .map((link, index) => (
                        <TopicItem
                          type="links"
                          key={index}
                          link={link}
                          titleCollapse={link.name}
                          contentCollapse={link.url}
                          isEdit
                        />
                      ))}
                  </div>
                </>
              )}

              {dataSkills.length > 0 && (
                <>
                  <p className="text-2xl">Skills</p>
                  <div className="border rounded-md w-full flex items-center flex-col gap-4 p-8">
                    {dataSkills
                      .filter((skill) => skill.status !== false)
                      .map((skill, index) => (
                        <TopicItem
                          type="skills"
                          key={index}
                          skill={skill}
                          titleCollapse="Skill"
                          contentCollapse={skill.name}
                          isEdit
                        />
                      ))}
                  </div>
                </>
              )}

              {dataCustom.length > 0 && (
                <>
                  <p className="text-2xl">Outros</p>
                  <div className="border rounded-md w-full flex items-center flex-col gap-4 p-8">
                    {dataCustom
                      .filter((custom) => custom.status !== false)
                      .map((custom, index) => (
                        <TopicItem
                          type="custom"
                          key={index}
                          custom={custom}
                          titleCollapse={custom.title}
                          contentCollapse={custom.description}
                          isEdit
                        />
                      ))}
                  </div>
                </>
              )}

              <div className="w-full flex flex-col md:flex-row items-center gap-4 md:justify-between">
                <ModalSaveCurriculum
                  handleSubmit={handleSubmit(handleUpdateCurriculum)}
                  isSubmitting={isSubmitting}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                />
                <ModalAddTopic isPulse />
                <ModalAccessLevelCurriculum
                  acessLevel={acessLevel}
                  setAccessLevel={setAccessLevel}
                />
                <ModalDeleteCurriculum keyCurriculum={key} userID={userID} />
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  )
}
