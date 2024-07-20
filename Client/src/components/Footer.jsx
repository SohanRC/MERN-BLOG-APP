import React from 'react'
import { Stack, IconButton, Divider} from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
    return (
        <div className='bg-[#006064] text-white p-4 font-serif tracking-wide'>
            <div className='flex flex-col items-center gap-3 flex-wrap'>
                <div className='text-center flex flex-col gap-2 flex-wrap'>
                    <h1 className='font-bold tracking-wider xs:text-2xl md:text-3xl'>Sohan RoyChowdhury</h1>
                    <h2 className=' xs:text-sm md:text-xl'>Email : sohanroychowdhury7@gmail.com</h2>
                    <h2 className=' xs:text-sm md:text-xl'>Address : Kolkata, West Bengal</h2>
                </div>
                <div className='p-2'>
                    <Stack spacing={2} direction="row" flexWrap='wrap'>
                        <IconButton  color='inherit'>
                            <InstagramIcon  color='error' sx={{bgcolor : 'white'}} className='rounded-full p-1 text-4xl hover:scale-[1.2] hover:shadow-lg transition-all duration-250'/>
                        </IconButton >
                        <IconButton color='inherit'>
                            <FacebookIcon  color='primary' sx={{bgcolor : 'white'}} className='rounded-full p-1 text-4xl hover:scale-[1.2] hover:shadow-lg transition-all duration-250'/>
                        </IconButton >
                        <IconButton color='inherit'>
                            <LinkedInIcon  color='primary' sx={{bgcolor : 'white'}} className='rounded-full p-1 text-4xl hover:scale-[1.2] hover:shadow-lg transition-all duration-250'/>
                        </IconButton>
                    </Stack>
                </div>
            </div>
            <Divider sx={{bgcolor : 'white', mx : 2}}/>
            <div className='p-2 text-center text-wrap'>
                <h1 className='font-bold tracking-wider xs:text-sm md:text-xl'>@Sohan RoyChowdhury | 2024</h1>
            </div>
        </div>
    )
}
