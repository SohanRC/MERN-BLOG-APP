import React from 'react'
import "../css/ArticleCard.css"

export default function ArticleCard({ post, className }) {
    
    const { category, title, postPic } = post;
    return (
        <div className={className}>
            <div className="card-content">
                <img src={postPic} alt="PostPic" className='md:w-full w-52'/>
                <p className="card-title">{title}
                </p><p className="card-para font-bold">{category}</p>
            </div>
        </div>
    )

}
