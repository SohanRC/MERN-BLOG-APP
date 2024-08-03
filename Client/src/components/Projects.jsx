import React, { useEffect, useState } from 'react'
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useForm } from 'react-hook-form';
import SelectComponent from './Select';
import { TextField, MenuItem, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ArticleCard from './ArticleCard';
import Loader from './Loader';
import postService from '../api/PostService';
import toast from 'react-hot-toast';

export default function Projects() {

    const [allPosts, setAllPosts] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, control, getValues } = useForm({
        defaultValues: {
            searchTerm: "",
            category: "",
            sort: "des",
        }
    })

    const getRecentPosts = async () => {
        setShowMore(true)
        setLoading(true);
        try {
            let res = await postService.getPost({
                order: getValues('sort'),
                startIndex: allPosts.length,
            })
            setLoading(false)

            if (!res.data) {
                const { response: { data: { message } } } = res;
                toast.error(message)
                console.log(res)
                return;
            }

            const { data: { posts } } = res;
            if (posts.length < 9) setShowMore(false);
            setAllPosts((prev) => [...prev, ...posts]);
            return;
        } catch (error) {
            console.log("Error !", error)
            toast.error(error.message);
            return;
        }
    }

    useEffect(() => {
        getRecentPosts();
    }, [setAllPosts])

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

    const list1 = [
        {
            id: 1,
            value: "",
            text: "All"
        },
        {
            id: 2,
            value: "sports",
            text: "Sports"
        },
        {
            id: 3,
            value: "movies",
            text : "Movies",
        },
        {
            id: 4,
            value: "technology",
            text : "Technology"
        },
        {
            id: 5,
            value: "travel",
            text : "Travel"
        },
    ]

    const list2 = [
        {
            id: 1,
            value: 'asc',
            text: "asc",
        },
        {
            id: 2,
            value: 'des',
            text: "des",
        }
    ]



    const handleShowMore = async () => {
        getRecentPosts();
    }

    const submit = async (searchData) => {
        setLoading(true);
        setShowMore(false);
        try {
            let res = await postService.getPost({
                order: searchData.sort,
                category: searchData.category,
                searchTerm: searchData.searchTerm,
            })
            setLoading(false)

            if (!res.data) {
                const { response: { data: { message } } } = res;
                toast.error(message)
                console.log(res)
                return;
            }

            const { data: { posts } } = res;
            setAllPosts(posts);
            return;
        } catch (error) {
            console.log("Error !", error)
            toast.error(error.message);
            return;
        }
    }

    return (
        <>
            <header className='w-full max-h-2xl shadow-lg p-3 font-montserrat bg-slate-200 dark:bg-[rgb(31,41,55)] py-5'>
                <form action="" onSubmit={handleSubmit(submit)} className='flex justify-center items-center gap-3 flex-wrap'>
                    <div className='flex flex-col justify-center gap-1'>
                        <label htmlFor="Search" className='ml-2 text-xl font-bold'>Search</label>
                        <Search className='max-w-52 dark:bg-slate-700 bg-slate-500 text-white shadow-lg' id='Search'>
                            <SearchIconWrapper className='dark:bg-slate-700 bg-slate-500 text-white z-10'>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{
                                    'aria-label': 'search'
                                }}
                                {...register('searchTerm')}
                                className='dark:bg-slate-700 bg-slate-400 pl-5'
                            />
                        </Search>
                    </div>
                    <div className='flex flex-col justify-center gap-1'>
                        <label htmlFor="Category" className='ml-2 text-xl font-bold'>Category</label>
                        <select
                            name="category"
                            id="category"
                            {...register('category')}
                            className='dark:bg-slate-700 bg-slate-500 text-white shadow-lg text-xl outline-none border-none md:w-36 sm:w-16 p-1 rounded-sm'
                        >
                            {
                                list1.map((op) => <option key={op.id} value={op.value} className='p-2 text-xl m-2'>{op.text}</option>)
                            }
                        </select>
                    </div>
                    <div className='flex flex-col justify-center gap-1'>
                        <label htmlFor="Sort" className='ml-2 text-xl font-bold'>Sort</label>
                        <select
                            name="sort"
                            id="sort"
                            {...register('sort')}
                            className='dark:bg-slate-700 bg-slate-500 text-white shadow-lg text-xl outline-none border-none md:w-36 sm:w-16 p-1 rounded-sm'
                        >
                            {
                                list2.map((op) => <option key={op.id} value={op.value} className='p-2 text-xl m-2'>{op.text}</option>)
                            }
                        </select>
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            className="font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white mt-5"
                            sx={{
                                fontSize: { lg: 18, md: 12, xs: 10 },
                            }}
                        >Apply Filters</Button>
                    </div>

                </form>
            </header>
            <div className='w-full mt-14 p-10'>
                <h1 className=' text-3xl md:text-6xl text-center capitalize font-serif'>All Articles </h1>
                {
                    loading ?
                        <div className='grid place-items-center mt-12'>
                            <Loader />
                        </div>
                        :
                        <div className='mt-10 flex justify-center items-center gap-12 flex-wrap max-w-5xl mx-auto'>
                            {
                                allPosts ?
                                    <>
                                        {
                                            allPosts.map((post) => {
                                                return <Link to={`/post/${post._id}`} key={post._id}>
                                                    <ArticleCard post={post} key={post._id} className="card h-[30rem] md:w-80 w-72" />
                                                </Link>
                                            })
                                        }
                                    </> :
                                    <>
                                        <h1 className=' text-3xl md:text-5xl text-center text-white'>No  Articles Found !</h1>
                                    </>
                            }
                        </div>
                }
                {
                    showMore && <div className='text-center m-5 p-10'>
                        <Button
                            variant="contained"
                            type="button"
                            color="primary"
                            className="font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
                            sx={{
                                fontSize: { lg: 20, md: 15, xs: 10 },
                            }}
                            disabled={loading ? true : false}
                            onClick={() => handleShowMore()}
                        >
                            {
                                showMore && "Show More"
                            }
                        </Button>
                    </div>
                }


            </div>
        </>

    )
}
