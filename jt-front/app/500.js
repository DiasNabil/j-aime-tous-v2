import { Button, Image, Link } from '@nextui-org/react'

 
export default function Custom500() {
  return (
    <section>
    <div className='container flex flex-col items-center justify-center gap-4 p-12'>
        <Image width={350} src='/error.svg' />
        <h1 className="font-bold text-lg md:text-2xl ">Une erreur est survenue !</h1>
        <Button
            as={Link}
            color='primary'
            variant='shadow'
            href='/'
            className='w-fit my-12'
        >
            Retourner à la page d'accueil
        </Button>
    </div>
    </section>
  )
}