/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { ButtonBack } from '@/components/Buttons/back'
import Link from 'next/link'
import { ItemCV } from './components/itemCV'
import { ModalSearch } from '@/components/Modals/search'
import { useListCurriculums } from '@/hooks/curriculum/listCurriculums'
import { SkeletonDashboard } from '@/components/Skeletons/dashboard'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/contexts/AuthContex'
import { RiLogoutCircleLine } from 'react-icons/ri'

export default function Dashboard() {
  const { isAuthenticated, user, signOut } = useContext(AuthContext)
  const [modalSearch, setModalSearch] = useState(false)
  const [search, setSearch] = useState('')
  const [cvs, setCvs] = useState([])

  const {
    data: dataListCurriculums,
    isLoading: isLoadingListCurriculums,
    error: errorListCurriculums,
  } = useListCurriculums(isAuthenticated ? String(user?.user_id) : '0')

  useEffect(() => {
    if (search === '') {
      const cvs = dataListCurriculums ? dataListCurriculums.cvs : []
      setCvs(cvs as any)
    } else {
      setCvs(
        dataListCurriculums?.cvs.filter((curriculum) =>
          curriculum.name.toLowerCase().includes(search.toLowerCase()),
        ) as any,
      )
    }
  }, [search, dataListCurriculums])

  return (
    <>
      {isLoadingListCurriculums ? (
        <SkeletonDashboard />
      ) : (
        <main className="w-full">
          <div className="w-full flex justify-center py-16" id="quem-somos">
            <div className="max-w-screen-md w-full flex flex-col gap-16 items-center px-4 md:px-0">
              <div className="flex justify-between w-full items-center">
                <ButtonBack />
                {isAuthenticated && (
                  <RiLogoutCircleLine
                    size={80}
                    className="test-white cursor-pointer"
                    onClick={signOut}
                  />
                )}
                {isAuthenticated && (
                  <div className="w-full flex justify-end">
                    <Link
                      href="/curriculum/adicionar"
                      className="bg-green-600 rounded-md hover:bg-secondary hover:text-primary duration-300 p-4"
                    >
                      Add CV
                    </Link>
                  </div>
                )}
              </div>

              <div className="w-full flex justify-between">
                <div className="w-2/3 md:w-1/2 border rounded-md p-4 text-center">
                  Lista de CVs
                </div>
                {!isAuthenticated && (
                  <Link
                    className="w-1/4 border p-4 rounded-md text-center hover:bg-secondary hover:text-primary duration-300"
                    href="/login"
                  >
                    Login
                  </Link>
                )}
              </div>

              <div className="w-full text-center">
                <div className="w-full flex flex-col gap-4">
                  {cvs.length === 0 && (
                    <div className="flex gap-4 items-center">
                      <div className="border rounded-md p-4 w-full text-center">
                        Nenhum CV público cadastrado
                      </div>
                    </div>
                  )}
                  {cvs.map((curriculum, index) => (
                    <ItemCV data={curriculum} key={index} />
                  ))}
                  {errorListCurriculums && (
                    <div className="flex border justify-center items-center min-h-96">
                      Ops ! Ocorreu um erro ao buscar os CVs
                    </div>
                  )}
                </div>
              </div>

              {isAuthenticated && (
                <div className="w-full text-center">
                  <div className="w-full flex flex-col gap-4">
                    <div className="flex gap-4 items-center">
                      <div className="border rounded-md p-4 w-2/3 md:w-1/2 text-center">
                        Meu CV(s)
                      </div>
                    </div>
                    {dataListCurriculums?.myCvs.length === 0 && (
                      <div className="flex gap-4 items-center">
                        <div className="border rounded-md p-4 w-full text-center">
                          Nenhum CV cadastrado
                        </div>
                      </div>
                    )}
                    {dataListCurriculums?.myCvs.map((curriculum) => (
                      <ItemCV data={curriculum} key={curriculum.id} isMy />
                    ))}
                  </div>
                </div>
              )}

              <div className="w-full flex justify-between">
                <Link
                  className="w-1/3 md:w-1/4 border p-4 rounded-md text-center hover:bg-secondary hover:text-primary duration-300"
                  href="/"
                >
                  Sobre
                </Link>
                <ModalSearch
                  search={search}
                  setSearch={setSearch}
                  modalSearch={modalSearch}
                  setModalSearch={setModalSearch}
                />
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  )
}
