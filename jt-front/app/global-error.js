'use client' // Error components must be Client Components
 
import { Button } from '@nextui-org/react'
import { useEffect } from 'react'
 
export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <section>
    <div className='container'>
        <Image width={450} src='/error.svg' />
        <h1 className="font-bold text-4xl">Une erreur est survenue !</h1>
        <Button
            color='primary'
            variant='shadow'
            onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
            }
        >
            Recharger la page
        </Button>
    </div>
    </section>
  )
}