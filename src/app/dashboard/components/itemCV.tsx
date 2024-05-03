import { ICurriculum } from '@/@types/curriculum'
import { PopoverShare } from '@/components/Popover/share'

interface IItemCV {
  data: ICurriculum
}

export function ItemCV({ data }: IItemCV) {
  const { name, title, id } = data

  return (
    <div className="flex gap-4 items-center">
      <div className="border rounded-md p-4 w-full flex justify-between">
        <div className="w-1/2 text-left">{name}</div>
        <div className="w-1/2 text-right">{title}</div>
      </div>

      <PopoverShare id={id} />
    </div>
  )
}
