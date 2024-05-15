'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FaChevronLeft } from 'react-icons/fa6'
import { toast } from 'react-toastify'
import notFound from '../../public/not-found.png'
import Image from 'next/image'

export function ErrorPage() {
  useEffect(() => {
    toast.error('Ocorreu um erro ao buscar os dados :(')
  }, [])

  const router = useRouter()
  return (
    <main className="w-full">
      <div className="w-full flex justify-center py-16" id="quem-somos">
        <div className="max-w-screen-md w-full flex flex-col gap-8 justify-center px-4 md:px-0">
          <div className="flex w-full justify-between">
            <div className="w-full justify-start">
              <button
                onClick={() => router.back()}
                className="border py-2 px-8 rounded-md hover:bg-secondary hover:text-primary duration-300"
              >
                <FaChevronLeft size={20} />
              </button>
            </div>
          </div>

          <div className="w-full min-h-96 flex flex-col md:flex-row justify-center gap-4 items-center md:justify-between">
            <div className="w-full md:w-1/2 flex justify-center items-center">
              <div className="bg-red-400 rounded-md text-center text-black p-4 flex flex-col gap-4">
                <p>
                  Lamentamos informar que tivemos um erro ao buscar os dados da
                  página solicitada{' '}
                </p>
                <p>Volte para o início e tente novamente ou entre em contato</p>
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <Image src={notFound} quality={100} alt="Erro" />
            </div>
          </div>

          <div className="w-full flex justify-between">
            <Link
              className="w-1/3 md:w-1/4 border p-4 rounded-md text-center hover:bg-secondary hover:text-primary duration-300"
              href="/"
            >
              Sobre
            </Link>
            <Link
              className="w-1/3 md:w-1/4 border p-4 rounded-md text-center hover:bg-secondary hover:text-primary duration-300"
              href="/dashboard"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
