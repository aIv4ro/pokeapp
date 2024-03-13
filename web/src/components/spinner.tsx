import './spinner.css'
import { PokeballIcon } from './pokeball-icon'

export function Spinner () {
  return (
    <div className='flex justify-center'>
      <PokeballIcon
        className='size-16 animate-bounce spinner'
      />
    </div>
  )
}
