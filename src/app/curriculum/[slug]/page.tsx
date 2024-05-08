'use client'

import { ButtonBack } from '@/components/Buttons/back'
import { Collapse } from '@/components/Collapses/collapse'
import Link from 'next/link'
import { IoShareSocial } from 'react-icons/io5'

import * as Avatar from '@radix-ui/react-avatar'
import { formatRoute } from '@/utils/formatRoute'
import { toast } from 'react-toastify'
import { usePDF } from 'react-to-pdf'
import { useState } from 'react'
import { useGetCurriculum } from '@/hooks/curriculum/getCurriculum'

export default function CurriculumSlug({
  params,
}: {
  params: { slug: string }
}) {
  const {
    data: dataGetCurriculum,
    // isLoading: isLoadingGetCurriculum,
    // isFetching: isFetchingGetCurriculum,
    // error: errorGetCurriculum,
  } = useGetCurriculum(params.slug)

  const [isGenetatingPdf, setIsGenetatingPdf] = useState(false)
  const { fullName, initials } = formatRoute(dataGetCurriculum?.user.name)
  const { toPDF, targetRef } = usePDF({ filename: 'curriculum.pdf' })

  async function handleGeneratePDF() {
    await setIsGenetatingPdf(true)
    try {
      toPDF()
      toast.success('PDF gerado com sucesso.')
      setIsGenetatingPdf(false)
    } catch (error) {
      toast.error(`Erro ao gerar o PDF: ${error}`)
      setIsGenetatingPdf(false)
    }
  }
  return (
    <main
      className={`w-full ${isGenetatingPdf && 'text-primary'}`}
      ref={targetRef}
    >
      <div className="w-full flex justify-center py-16" id="quem-somos">
        <div className="max-w-screen-md w-full flex flex-col gap-8 justify-center px-4 md:px-0">
          <div className="flex w-full justify-between">
            <div>
              <ButtonBack />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xl">ID</span>
              <span className="rounded-md border text-center px-4 py-2 hover:bg-secondary hover:text-primary duration-300">
                {dataGetCurriculum?.user.id}
              </span>
            </div>
            <div className="flex items-center justify-center border rounded-md px-4 py-2 gap-4 hover:bg-secondary hover:text-primary duration-300">
              <span>Key</span>
              <IoShareSocial onClick={handleGeneratePDF} size={25} />
            </div>
          </div>

          <p className="text-xl font-medium">Dados Pessoais</p>

          <div className="w-full flex flex-col md:flex-row gap-4 p-4 justify-between text-center items-center border rounded-md">
            <div className="w-full md:w-5/12 h-full flex items-center justify-center">
              <Avatar.Root className="border inline-flex h-[200px] w-[200px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
                <Avatar.Fallback className="capitalize text-5xl flex h-full w-full items-center justify-center font-medium">
                  {initials}
                </Avatar.Fallback>
              </Avatar.Root>
            </div>
            <div className="flex flex-col gap-4 w-6/12">
              <div className="w-full text-center border rounded-md py-2">
                {fullName}
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
          <p className="text-xl font-medium">Dados Educacionais</p>
          <div className="rounded-md w-full flex items-center flex-col gap-4">
            {dataGetCurriculum?.education.map((education) => (
              <Collapse
                key={education.course}
                title={education.course}
                content={education.description}
              />
            ))}
          </div>
          <p className="text-xl font-medium">Dados Profissionais</p>
          <div className="rounded-md w-full flex items-center flex-col gap-4">
            {dataGetCurriculum?.experience.map((experience) => (
              <Collapse
                key={experience.company}
                title={experience.company}
                content={experience.description}
              />
            ))}
          </div>
          <p className="text-xl font-medium">Links</p>
          <div className="border rounded-md w-full flex items-center flex-col md:flex-row gap-4 p-4">
            {dataGetCurriculum?.links.map((link) => (
              <Link
                key={link.url}
                className="p-3 rounded-md text-center hover:bg-secondary hover:text-primary duration-300"
                target="_blank"
                href={link.url}
              >
                {link.name}
              </Link>
            ))}
          </div>
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
  )
}
