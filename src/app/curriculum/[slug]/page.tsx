import { ButtonBack } from '@/components/Buttons/back'
import Link from 'next/link'
import { FaArrowDown } from 'react-icons/fa6'
import { IoShareSocial } from 'react-icons/io5'

export default function CurriculumSlug({
  params,
}: {
  params: { slug: string }
}) {
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
              <span className="rounded-md border text-center px-4 py-2 hover:bg-white hover:text-black duration-300">
                Number
              </span>
            </div>
            <div className="flex items-center justify-center border rounded-md px-4 py-2 gap-4 hover:bg-white hover:text-black duration-300">
              <span>Key</span>
              <IoShareSocial size={25} />
            </div>
          </div>

          <p>Dados Pessoais</p>

          <div className="w-full flex p-4 justify-between text-center items-center border rounded-md">
            <div className="w-5/12 h-full flex items-center justify-center">
              <div className="flex items-center justify-center rounded-full border h-[200px] w-[200px] capitalize">
                {params.slug}
              </div>
            </div>
            <div className="flex flex-col gap-4 w-6/12">
              <div className="w-full text-center border rounded-md py-2">
                Name
              </div>
              <div className="w-full text-center border rounded-md py-2">
                Career
              </div>
              <div className="w-full text-center border rounded-md py-2">
                Email
              </div>
              <div className="w-full text-center border rounded-md py-2">
                Phone
              </div>
              <div className="w-full text-center border rounded-md py-2">
                Gender
              </div>
              <div className="w-full text-center border rounded-md py-2">
                Pronome
              </div>
            </div>
          </div>
          <p>Dados Profissionais</p>
          <div className="border rounded-md w-full flex items-center flex-col gap-4 p-8">
            <div className="w-full flex justify-between px-4 text-center border rounded-md py-2">
              Slot
              <FaArrowDown size={25} />
            </div>
            <div className="w-full flex justify-between px-4 text-center border rounded-md py-2">
              Slot
              <FaArrowDown size={25} />
            </div>
            <div className="w-full flex justify-between px-4 text-center border rounded-md py-2">
              Slot
              <FaArrowDown size={25} />
            </div>
          </div>
          <div className="w-full flex justify-between">
            <Link
              className="w-1/3 md:w-1/4 border p-4 rounded-md text-center hover:bg-white hover:text-black duration-300"
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
