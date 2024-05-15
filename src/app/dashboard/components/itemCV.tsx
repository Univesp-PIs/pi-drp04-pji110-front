import { ICurriculum } from '@/@types/curriculum'
import { PopoverShare } from '@/components/Popover/share'

interface IItemCV {
  data: ICurriculum
  isMy?: boolean
}

export function ItemCV({ data, isMy }: IItemCV) {
  const { name, title, key } = data

  return (
    <div className="flex gap-4 items-center">
      <div className="border rounded-md p-4 w-full flex justify-between">
        <div className="w-1/2 text-left">{name}</div>
        <div className="w-1/2 text-right">{title}</div>
      </div>

      <PopoverShare keyCurriculum={key} isMy={isMy} data={data} />
    </div>
  )
}
