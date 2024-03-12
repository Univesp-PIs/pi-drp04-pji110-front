'use client'

import Link from 'next/link'
import { toast } from 'react-toastify'

export default function Home() {
  function handleLogin() {
    toast.error('Ainda não implementado :(')
  }

  return (
    <main className="w-full">
      <div className="w-full flex justify-center py-16" id="quem-somos">
        <div className="max-w-screen-md w-full flex flex-col gap-4 items-center px-4 md:px-0">
          <h2 className="text-xl font-bold">Bem-vindo ao Curriculum42</h2>
          <div className="w-full flex justify-end">
            <Link
              href=""
              onClick={handleLogin}
              className="border py-2 px-8 rounded-md hover:bg-white hover:text-black duration-300"
            >
              Login
            </Link>
          </div>
          <div className="border rounded-md p-4 w-full text-center">
            Apresentação do site/sistema
          </div>
          <div className="border rounded-md p-4 w-full text-center">
            <div className="p-4 w-full flex flex-col gap-4">
              <div className="border rounded-md p-4 w-full text-center">
                Informações
              </div>
              <div className="border rounded-md p-4 w-full text-center">
                Objetivos
              </div>
              <div className="border rounded-md p-4 w-full text-center">
                Demonstações (print)
              </div>
              <div className="border rounded-md p-4 w-full text-center">
                Créditos/contato
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
