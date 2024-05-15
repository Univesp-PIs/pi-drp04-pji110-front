'use client'

import { ButtonBack } from '@/components/Buttons/back'
import { LuDot } from 'react-icons/lu'
import Link from 'next/link'
import { IoShareSocial } from 'react-icons/io5'

import * as Avatar from '@radix-ui/react-avatar'
import { formatRoute } from '@/utils/formatRoute'
import { toast } from 'react-toastify'
import { useGetCurriculum } from '@/hooks/curriculum/getCurriculum'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { SkeletonCurriculum } from '@/components/Skeletons/curriculum'
import { ErrorPage } from '@/components/Error'
import { CollapseView } from '@/components/Collapses/collapseView'
import { IoIosArrowForward } from 'react-icons/io'

export default function CurriculumSlug({
  params,
}: {
  params: { slug: string }
}) {
  const userID = params.slug[0]
  const key = params.slug[1]

  const {
    data: dataGetCurriculum,
    isLoading: isLoadingGetCurriculum,
    error: errorGetCurriculum,
  } = useGetCurriculum(userID, key)

  const [isCopied, setIsCopied] = useState(false)
  const [dateUpdateFormated, setDateUpdateFormated] = useState('')
  const [dateCreateFormated, setDateCreateFormated] = useState('')

  const { fullName, initials } = formatRoute(dataGetCurriculum?.user.name)

  useEffect(() => {
    if (dataGetCurriculum) {
      const updateDateFormatted =
        dataGetCurriculum &&
        format(
          new Date(dataGetCurriculum.user.updated_at),
          `dd/MM/yyyy 'às' HH'h'mm`,
        )

      setDateUpdateFormated(updateDateFormatted)

      const createDateFormatted =
        dataGetCurriculum &&
        format(new Date(dataGetCurriculum.user.created_at), `dd/MM/yyyy`)
      setDateCreateFormated(createDateFormatted)
    }
  }, [dataGetCurriculum])

  function handleCopy(value: string) {
    navigator.clipboard.writeText(value)
    setIsCopied(true)
    toast.success('Key copiada!')
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  const accessLevelIsPublic = dataGetCurriculum?.user.accessLevel === 'public'

  return (
    <>
      {isLoadingGetCurriculum ? (
        <SkeletonCurriculum />
      ) : errorGetCurriculum ? (
        <ErrorPage />
      ) : (
        <main className="w-full">
          <div className="w-full flex justify-center py-16" id="quem-somos">
            <div className="max-w-screen-md w-full flex flex-col gap-8 justify-center px-4 md:px-0">
              <div className="flex w-full justify-between">
                <div>
                  <ButtonBack />
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xl">ID</span>
                  <span className="rounded-md border text-center px-4 py-2 hover:bg-secondary hover:text-primary duration-300">
                    {userID}
                  </span>
                </div>
                {isCopied ? (
                  <span className="text-green-400 font-medium flex items-center justify-center border rounded-md px-4 py-2 gap-4 hover:bg-secondary hover:text-primary duration-300">
                    Copiada!
                  </span>
                ) : (
                  <div
                    className="flex items-center justify-center border cursor-pointer rounded-md px-4 py-2 gap-4 hover:bg-secondary hover:text-primary duration-300"
                    onClick={() => handleCopy(key)}
                  >
                    <span>Key</span>
                    <IoShareSocial size={25} />
                  </div>
                )}
              </div>
              <div className="flex justify-between">
                <p className="text-2xl font-medium">Dados Pessoais</p>
                <span
                  className={`p-3 rounded-md bg-${accessLevelIsPublic ? 'green-600' : 'red-600'}`}
                >
                  {accessLevelIsPublic ? 'Público' : 'Privado'}
                </span>
              </div>

              <div className="w-full flex flex-col gap-4 p-4 justify-between text-center items-center border rounded-md">
                <div className="w-full flex justify-between items-center flex-col md:flex-row gap-10 md:gap-0">
                  <div className="w-full md:w-5/12 h-full flex items-center justify-center flex-col gap-4">
                    <Avatar.Root className="border inline-flex h-[200px] w-[200px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
                      <Avatar.Fallback className="capitalize text-5xl flex h-full w-full items-center justify-center font-medium">
                        {initials}
                      </Avatar.Fallback>
                    </Avatar.Root>
                    <div className="text-green-500 flex justify-center items-center gap-3 w-full">
                      <span className="w-fit">Criado em:</span>
                      {isLoadingGetCurriculum ? (
                        <div className="bg-slate-300 w-20 h-2 rounded animate-pulse"></div>
                      ) : (
                        <span className="w-fit">{dateCreateFormated}</span>
                      )}
                    </div>
                    <div className="text-yellow-400 flex justify-center items-center gap-3 w-full">
                      <span className="w-fit">Atualizado em:</span>
                      {isLoadingGetCurriculum ? (
                        <div className="bg-slate-300 w-20 h-2 rounded animate-pulse"></div>
                      ) : (
                        <span className="w-fit">{dateUpdateFormated}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 w-full md:w-6/12">
                    <div className="w-full text-center border rounded-md py-2">
                      {fullName}
                    </div>
                    <div className="w-full text-center border rounded-md py-2">
                      {dataGetCurriculum?.user.location}
                    </div>
                    <div className="w-full text-center border rounded-md py-2">
                      {dataGetCurriculum?.user.title}
                    </div>
                    <div className="w-full text-center border rounded-md py-2">
                      {dataGetCurriculum?.user.email}
                    </div>
                    <div className="w-full text-center border rounded-md py-2">
                      {dataGetCurriculum?.user.phone}
                    </div>
                    <div className="w-full text-center border rounded-md py-2">
                      {dataGetCurriculum?.user.gender}
                    </div>
                    <div className="w-full text-center border rounded-md py-2">
                      {dataGetCurriculum?.user.pronoun}
                    </div>
                  </div>
                </div>

                <div className="w-full flex flex-col gap-4">
                  <p className="text-2xl">Resumo</p>
                  <div className="flex flex-col md:flex-row gap-3 items-center">
                    <div className="border rounded-md w-full flex items-center flex-col gap-4 p-4">
                      <p>{dataGetCurriculum?.user.description}</p>
                    </div>
                  </div>
                </div>
              </div>
              {dataGetCurriculum && dataGetCurriculum?.education.length > 0 && (
                <>
                  <p className="text-2xl font-medium">Dados Educacionais</p>
                  <div className="rounded-md w-full flex items-center flex-col gap-4">
                    {dataGetCurriculum?.education.map((education) => (
                      <CollapseView
                        key={education.id}
                        title={education.course}
                        content={education.description}
                        education={education}
                        type="education"
                      />
                    ))}
                  </div>
                </>
              )}
              {dataGetCurriculum &&
                dataGetCurriculum?.experience.length > 0 && (
                  <>
                    <p className="text-2xl font-medium">Dados Profissionais</p>
                    <div className="rounded-md w-full flex items-center flex-col gap-4">
                      {dataGetCurriculum?.experience.map((experience) => (
                        <CollapseView
                          key={experience.company}
                          title={experience.company}
                          experience={experience}
                          type="experience"
                          content={experience.description}
                        />
                      ))}
                    </div>
                  </>
                )}
              {dataGetCurriculum && dataGetCurriculum?.links.length > 0 && (
                <>
                  <p className="text-2xl font-medium">Links</p>
                  <div className="border rounded-md w-full flex items-center flex-col md:flex-row gap-4 p-3">
                    {dataGetCurriculum?.links.map((link) => (
                      <Link
                        key={link.url}
                        className="p-2 rounded-md flex items-center gap-2 text-center hover:bg-secondary hover:text-primary duration-300"
                        target="_blank"
                        href={link.url}
                      >
                        <IoIosArrowForward />
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </>
              )}
              {dataGetCurriculum && dataGetCurriculum?.skills.length > 0 && (
                <>
                  <p className="text-2xl font-medium">Skills</p>
                  <ul className="border rounded-md w-full flex items-center flex-row gap-4 p-4">
                    {dataGetCurriculum?.skills.map((skill) => (
                      <li
                        className="flex items-center cursor-pointer hover:scale-110 duration-300"
                        key={skill.id}
                      >
                        <LuDot size={20} className="text-white" />
                        <span>{skill.name}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {dataGetCurriculum &&
                dataGetCurriculum?.Custom.length > 0 &&
                dataGetCurriculum?.Custom.map((custom) => (
                  <CollapseView
                    key={custom.title}
                    title={custom.title}
                    custom={custom}
                    type="custom"
                  />
                ))}
              <div className="w-full flex justify-between">
                <Link
                  className="w-1/3 md:w-1/4 border p-4 rounded-md text-center hover:bg-secondary hover:text-primary duration-300"
                  href="/"
                >
                  Sobre
                </Link>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  )
}
