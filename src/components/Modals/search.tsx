import * as Dialog from '@radix-ui/react-dialog'
import { FaX } from 'react-icons/fa6'
import { BsSearch } from 'react-icons/bs'

interface ModalSearchProps {
  setSearch: (search: string) => void
  search: string
  modalSearch: boolean
  setModalSearch: (modalSearch: boolean) => void
}

export function ModalSearch({
  setSearch,
  search,
  modalSearch,
  setModalSearch,
}: ModalSearchProps) {
  return (
    <Dialog.Root open={modalSearch} onOpenChange={setModalSearch}>
      <Dialog.Trigger asChild>
        <button className="w-1/3 md:w-1/4 border p-4 rounded-md text-center hover:bg-secondary hover:text-primary duration-300">
          Buscar
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-primaryA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="overflow-y-auto flex flex-col gap-4 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[550px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-secondary p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]">
          <Dialog.Title className="text-primary font-semibold text-xl">
            Buscar
          </Dialog.Title>

          <div className="flex gap-2 items-center">
            <fieldset className="flex flex-col w-full gap-2">
              <input
                className="border border-primary rounded-md p-3 w-full bg-transparent text-primary"
                id="search"
                defaultValue={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
                placeholder="Pesquise algo..."
              />
            </fieldset>

            <button
              onClick={() => setModalSearch(false)}
              className="border bg-primary text-secondary text-center p-4 font-medium rounded-md hover:scale-95 duration-300"
            >
              <BsSearch size={20} />
            </button>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-primary p-2 hover:bg-primary hover:text-secondary focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none duration-100"
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
