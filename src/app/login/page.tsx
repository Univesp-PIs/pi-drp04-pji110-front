'use client'

import { ButtonBack } from '@/components/Buttons/back'
import { ModalRegister } from '@/components/Modals/register'
import Link from 'next/link'
import { toast } from 'react-toastify'

export default function Login() {
  function handleLogin() {
    toast.error('Ainda não implementado :(')
  }

  return (
    <main className="w-full">
      <div className="w-full flex justify-center py-16" id="quem-somos">
        <div className="max-w-screen-md w-full flex flex-col gap-4 items-center px-4 md:px-0">
          <ButtonBack />
          <h2 className="text-xl font-bold">Bem-vindo!</h2>
          <div className="w-full flex justify-center md:justify-end">
            <Link
              href="/dashboard"
              className="border py-2 px-8 rounded-md hover:bg-white hover:text-black duration-300"
            >
              Continuar sem cadastro
            </Link>
          </div>
          <h3 className="text-center md:text-left w-full">Opções de login</h3>
          <div className="border rounded-md p-4 w-full text-center">
            <div className="p-4 w-full flex flex-col gap-4">
              <label htmlFor="login" className="text-left">
                Usuário
              </label>
              <input
                placeholder="Digite seu usuário ou e-mail"
                id="login"
                type="text"
                className="border rounded-md p-4 w-full bg-transparent"
              />
              <label htmlFor="password" className="text-left">
                Senha
              </label>
              <input
                placeholder="Digite sua senha"
                id="password"
                type="password"
                className="border rounded-md p-4 w-full bg-transparent"
              />
              <div className="w-full flex justify-end">
                <button
                  onClick={handleLogin}
                  className="border py-2 w-full md:w-1/3 px-8 rounded-md hover:bg-white hover:text-black duration-300"
                >
                  Entrar
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full items-center md:items-start">
            <p className="text-lg font-medium">Não tem cadastro?</p>
            <ModalRegister />
          </div>
        </div>
      </div>
    </main>
  )
}
