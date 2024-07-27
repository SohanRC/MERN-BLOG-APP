import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export default function Github() {
    return (
        <div className='grid md:grid-cols-2 font-serif text-center border-2 border-teal-500 rounded-tl-[4rem] rounded-br-[4rem] p-5 gap-3'>
            <div className='grid place-items-center'>
                <LazyLoadImage src="https://avatars.githubusercontent.com/u/124901633?v=4" alt="GitHub Profile Image" className='rounded-full border-8 border-teal-500 h-60 w-60' />
            </div>
            <div className='flex flex-col gap-3 justify-center items-center'>
                <h1 className='text-2xl md:text-3xl'>Visit My Github Profile To see much more exciting Projects !</h1>
                <h3 className='md:text-xl'>Click below to visit !</h3>
                <Link to="https://github.com/SohanRC?tab=repositories">
                    <Button
                        variant='contained'
                        type='button'
                        className="font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
                        sx={{
                            fontSize: { lg: 20, md: 15, xs: 10 },
                        }}
                    >
                        Visit Profile!
                    </Button>
                </Link>
            </div>
        </div>
    )
}
