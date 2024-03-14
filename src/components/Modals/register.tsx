import * as Dialog from '@radix-ui/react-dialog'
import { FaX } from 'react-icons/fa6'

// interface ModalRegisterProps {
//   open: boolean
//   setOpen: (open: boolean) => void
// }

export function ModalRegister() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="border text-center py-2 px-8 md:w-1/3 font-medium rounded-md bg-white text-black hover:bg-black hover:text-white duration-300">
          Cadastrar
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="flex flex-col gap-4 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[550px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-black font-semibold text-xl">
            Criar conta
          </Dialog.Title>
          <Dialog.Description className="text-black">
            Preencha seus dados para criar uma conta
          </Dialog.Description>
          <fieldset>
            <label className="text-black" htmlFor="name">
              Nome
            </label>
            <input
              className="border rounded-md border-black h-8 text-black p-4 w-full bg-transparent"
              id="name"
              placeholder="Digite seu nome"
            />
          </fieldset>
          <fieldset>
            <label className="text-black" htmlFor="email">
              Email
            </label>
            <input
              className="border rounded-md border-black h-8 text-black p-4 w-full bg-transparent"
              id="email"
              placeholder="Digite seu e-mail"
            />
          </fieldset>
          <div className="flex gap-4 flex-col md:flex-row">
            <fieldset>
              <label className="text-black" htmlFor="password">
                Senha
              </label>
              <input
                className="border rounded-md border-black h-8 text-black p-4 w-full bg-transparent"
                id="password"
                placeholder="Digite uma senha"
              />
            </fieldset>
            <fieldset>
              <label className="text-black" htmlFor="passwordConfirmation">
                Confirmar senha
              </label>
              <input
                className="border rounded-md border-black h-8 text-black p-4 w-full bg-transparent"
                id="passwordConfirmation"
                placeholder="Repita a senha"
              />
            </fieldset>
          </div>

          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button className="border bg-black text-white text-center py-2 px-8 font-medium rounded-md hover:scale-95 duration-300">
                Cadastrar
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-black p-2 hover:bg-black hover:text-white focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none duration-100"
              aria-label="Close"
            >
              <FaX size={20} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
