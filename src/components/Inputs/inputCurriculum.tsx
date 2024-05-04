import { InputHTMLAttributes, Ref, forwardRef } from 'react'

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
}

function FowardInput(
  { label, id, ...rest }: IInput,
  ref: Ref<HTMLInputElement>,
) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        ref={ref}
        id={id}
        className="border rounded-md w-full py-2 bg-transparent text-center"
        {...rest}
      />
    </>
  )
}

export const InputCurriculum = forwardRef(FowardInput)
