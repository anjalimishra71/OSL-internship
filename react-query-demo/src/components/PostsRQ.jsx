import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

function PostsRQ() {
   const {data,isLoading,isError,error}= useQuery({
        queryKey:["posts"],
        queryFn:()=>{
            return axios.get("http://localhost:4000/posts")
        },
        staleTime:3000
    })
       
    console.log({isLoading,isFetching})

     if (isLoading) {
        return <div>Page is loading...</div>
    }

    if (isError) {
        return <div>{error.message}</div>
    }
    console.log(data);
  return (
    <div className='post-list'>
            {data?.data.map((post) => {
                return (
                    <div className="post-item" key={post.id} >
                        <h3 className='post-title'>{post.title}</h3>
                        <p className='post-body'>{post.body}</p>
                    </div>
                );
            })}
        </div>
  )
}

export default PostsRQ
