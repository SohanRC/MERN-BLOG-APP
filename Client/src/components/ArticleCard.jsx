import React from 'react'
import "../css/ArticleCard.css"

export default function ArticleCard({ post }) {
    
    const { category, title, postPic } = post;
    return (
        <div className="card md:h-96 md:w-80 h-auto w-72">
            <div className="card-content">
                <img src={postPic} alt="PostPic" className='md:w-full w-52'/>
                <p className="card-title">{title}
                </p><p className="card-para font-bold">{category}</p>
            </div>
        </div>
    )

}
