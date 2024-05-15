'use client'

import * as Dialog from '@radix-ui/react-dialog'
import Link from 'next/link'
import { useState } from 'react'
import {
  FaEnvelope,
  FaFacebook,
  FaLinkedinIn,
  FaSnapchat,
  FaWhatsapp,
  FaXTwitter,
} from 'react-icons/fa6'
import { IoMdClose, IoMdLink } from 'react-icons/io'
import { MdArrowForwardIos, MdOutlineCopyAll } from 'react-icons/md'
import { toast } from 'react-toastify'

interface DropdownProps {
  configDataProps: {
    // id?: number
    title?: string
    link: string
  }
}

export function ModalShareLink(props: DropdownProps) {
  const [isCopied, setIsCopied] = useState(false)
  const link = props.configDataProps?.link
  const title = props.configDataProps?.title

  function handleCopy(value: string) {
    navigator.clipboard.writeText(value)
    setIsCopied(true)
    toast.success('Link copiado!')
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div className="px-6 py-2 rounded-md border border-primary text-center text-primary font-semibold hover:bg-primary hover:text-secondary duration-300 cursor-pointer">
          Compartilhar
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0 DialogOverlay" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white px-2 py-8 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none overflow-y-auto">
          <Dialog.Title className="text-mauve12 text-xl m-0 font-semibold text-center">
            Compartilhe esse link
          </Dialog.Title>

          <div className="flex flex-col gap-y-4 pt-8 text-primary">
            <Link
              href={`snapchat://creativeKitWeb/camera/1?attachmentUrl=${link}`}
              target="_blank"
              className="flex justify-between items-center hover:bg-[#f3f3f1] duration-300 rounded-md p-4"
            >
              <div className="flex gap-x-4 items-center">
                <div className="p-3 bg-yellow-200 rounded-md">
                  <FaSnapchat className="text-black fill-white" size={25} />
                </div>
                <span className="font-medium text-base md:text-lg">
                  Compartilhar no Snapchat
                </span>
              </div>
              <MdArrowForwardIos />
            </Link>
            <Link
              href={`https://www.facebook.com/sharer.php?u=${link}`}
              target="_blank"
              className="flex justify-between items-center hover:bg-[#f3f3f1] duration-300 rounded-md p-4"
            >
              <div className="flex gap-x-4 items-center">
                <div className="p-3 bg-blue-600 rounded-md">
                  <FaFacebook className="text-black fill-white" size={25} />
                </div>
                <span className="font-medium text-base md:text-lg">
                  Compartilhar no Facebook
                </span>
              </div>
              <MdArrowForwardIos />
            </Link>
            <Link
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${link}`}
              target="_blank"
              className="flex justify-between items-center hover:bg-[#f3f3f1] duration-300 rounded-md p-4"
            >
              <div className="flex gap-x-4 items-center">
                <div className="p-3 bg-blue-700 rounded-md">
                  <FaLinkedinIn className="text-black fill-white" size={25} />
                </div>
                <span className="font-medium text-base md:text-lg">
                  Compartilhar no Linkedin
                </span>
              </div>
              <MdArrowForwardIos />
            </Link>
            <Link
              href={`https://twitter.com/intent/post?text=${title} - ${link}`}
              target="_blank"
              className="flex justify-between items-center hover:bg-[#f3f3f1] duration-300 rounded-md p-4"
            >
              <div className="flex gap-x-4 items-center">
                <div className="p-3 bg-black rounded-md">
                  <FaXTwitter className="text-black fill-white" size={25} />
                </div>
                <span className="font-medium text-base md:text-lg">
                  Compartilhar no X (Twitter)
                </span>
              </div>
              <MdArrowForwardIos />
            </Link>
            <Link
              href={`https://api.whatsapp.com/send/?text=${title}%0D%0D${link}&type=custom_url&app_absent=0`}
              target="_blank"
              className="flex justify-between items-center hover:bg-[#f3f3f1] duration-300 rounded-md p-4"
            >
              <div className="flex gap-x-4 items-center">
                <div className="p-3 bg-green-400 rounded-md">
                  <FaWhatsapp className="text-black fill-white" size={25} />
                </div>
                <span className="font-medium text-base md:text-lg">
                  Compartilhar via WhatsApp
                </span>
              </div>
              <MdArrowForwardIos />
            </Link>

            <Link
              href={`mailto:?subject=Veja esse link !&body=${title} - ${link}`}
              target="_blank"
              className="flex justify-between items-center hover:bg-[#f3f3f1] duration-300 rounded-md p-4"
            >
              <div className="flex gap-x-4 items-center">
                <div className="p-3 bg-gray-500 rounded-md">
                  <FaEnvelope className="text-black fill-white" size={25} />
                </div>
                <span className="font-medium text-base md:text-lg">
                  Compartilhar via E-mail
                </span>
              </div>
              <MdArrowForwardIos />
            </Link>

            <div className="p-4 rounded-md border border-gray-200 mx-4 flex justify-between items-center">
              <div className="flex gap-x-4 items-center">
                <IoMdLink
                  size={25}
                  className="cursor-pointer"
                  onClick={() => handleCopy(link)}
                />
                <span
                  className="text-base md:text-lg"
                  onClick={() => handleCopy(link)}
                >
                  {link?.slice(0, 25) + '...'}
                </span>
              </div>
              {isCopied ? (
                <span className="text-green-400 font-medium">Copiado!</span>
              ) : (
                <MdOutlineCopyAll
                  size={25}
                  className="cursor-pointer"
                  onClick={() => handleCopy(link)}
                />
              )}
            </div>
          </div>

          <div className="mt-[25px] flex justify-end pr-4">
            <Dialog.Close asChild>
              <button className="bg-transparent border border-primary text-primary px-8 py-2 rounded-md hover:bg-primary hover:text-secondary duration-200">
                Fechar
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-black hover:bg-black hover:text-white focus:shadow-black absolute top-[30px] right-[20px] inline-flex h-[30px] w-[30px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none duration-150"
              aria-label="Close"
            >
              <IoMdClose size={25} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
