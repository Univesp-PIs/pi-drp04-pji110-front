'use client'

import { CollapseProps } from '@/@types/collapse'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { LuDot } from 'react-icons/lu'
import ProgressBar from '@ramonak/react-progress-bar'

export function CollapseView({
  title = 'Vazio',
  content = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, exercitationem nihil recusandae qui facere aut architecto molestias, impedit asperiores alias corrupti ullam eveniet inventore.',
  type = 'default',
  experience,
  education,
  custom,
}: CollapseProps) {
  const [open, setOpen] = useState(false)

  if (type === 'default') {
    return (
      <Collapsible.Root
        defaultOpen
        className="border rounded-md w-full text-center hover:bg-neutral-900 duration-300"
        open={open}
        onOpenChange={setOpen}
      >
        <div
          className={`flex items-center p-4 cursor-pointer justify-between ${open && 'pb-3'}`}
          onClick={() => setOpen(!open)}
        >
          {title}
          <Collapsible.Trigger asChild>
            <IoIosArrowDown
              size={20}
              className={`${open && 'rotate-180'} duration-300`}
            />
          </Collapsible.Trigger>
        </div>

        <Collapsible.Content className="CollapsibleContent">
          <div
            className="p-4 text-left border-t"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Collapsible.Content>
      </Collapsible.Root>
    )
  }

  if (type === 'education') {
    return (
      <Collapsible.Root
        defaultOpen
        className="border rounded-md p-4 w-full text-center hover:bg-neutral-900 duration-300"
        open={open}
        onOpenChange={setOpen}
      >
        <div
          className={`flex items-center cursor-pointer justify-between ${open && 'pb-3'}`}
          onClick={() => setOpen(!open)}
        >
          <span className="font-medium">
            {title} ({education?.period})
          </span>
          <Collapsible.Trigger asChild>
            <IoIosArrowDown
              size={20}
              className={`${open && 'rotate-180'} duration-300`}
            />
          </Collapsible.Trigger>
        </div>

        <Collapsible.Content className="CollapsibleContent">
          <div className="py-4 text-left border-t">
            <div className="flex flex-col gap-4">
              <p>Instituição: {education?.institution}</p>
              <p>Curso: {education?.course}</p>
              <p>Período: {education?.period}</p>
              <p>Descrição: {education?.description}</p>
            </div>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    )
  }

  if (type === 'experience') {
    return (
      <Collapsible.Root
        defaultOpen
        className="border rounded-md p-4 w-full text-center hover:bg-neutral-900 duration-300"
        open={open}
        onOpenChange={setOpen}
      >
        <div
          className={`flex items-center cursor-pointer justify-between ${open && 'pb-3'}`}
          onClick={() => setOpen(!open)}
        >
          <span className="font-medium">
            {title} ({experience?.period})
          </span>
          <Collapsible.Trigger asChild>
            <IoIosArrowDown
              size={20}
              className={`${open && 'rotate-180'} duration-300`}
            />
          </Collapsible.Trigger>
        </div>

        <Collapsible.Content className="CollapsibleContent">
          <div className="py-4 text-left border-t">
            <div className="flex flex-col gap-4">
              <p>Empresa: {experience?.company}</p>
              <p>Cargo: {experience?.position}</p>
              <p>Período: {experience?.period}</p>
              <p>Descrição: {experience?.description}</p>
            </div>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    )
  }

  if (type === 'custom') {
    const isGraphic = custom?.topicType?.type.toLowerCase() === 'graphic'
    return (
      <>
        <p className="text-2xl font-medium">{custom?.title}</p>
        <div className="rounded-md w-full flex items-center flex-col gap-4">
          <Collapsible.Root
            defaultOpen
            className="border rounded-md w-full text-center hover:bg-neutral-900 duration-300"
            open={open}
            onOpenChange={setOpen}
          >
            <div
              className={`flex items-center p-4 cursor-pointer justify-between ${open && 'pb-3'}`}
              onClick={() => setOpen(!open)}
            >
              <span className="font-medium">
                {isGraphic ? 'Gráfico' : 'Tópicos'}
              </span>
              <Collapsible.Trigger asChild>
                <IoIosArrowDown
                  size={20}
                  className={`${open && 'rotate-180'} duration-300`}
                />
              </Collapsible.Trigger>
            </div>

            <Collapsible.Content className="CollapsibleContent">
              <div className="py-4 p-4 text-left border-t">
                <div className="flex flex-col gap-4">
                  <p>Descrição: {custom?.description}</p>
                  {isGraphic ? (
                    <>
                      <ProgressBar
                        completed={custom.topicType?.percentage || 30}
                        bgColor={custom.topicType?.color}
                      />
                      <p>Descrição: {custom.topicType?.description}</p>
                    </>
                  ) : (
                    <>
                      <p>Tópico(s):</p>
                      <ul className="border rounded-md w-full flex items-center flex-row gap-4 p-4">
                        {custom?.topicType?.topics?.map((topic) => (
                          <li
                            className="flex items-center cursor-pointer hover:scale-110 duration-300"
                            key={topic}
                          >
                            <LuDot size={20} className="text-white" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </Collapsible.Content>
          </Collapsible.Root>
        </div>
      </>
    )
  }
}
