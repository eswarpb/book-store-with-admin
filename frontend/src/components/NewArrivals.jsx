import React, { useContext,useState,useEffect } from 'react'
import Title from './Title'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Pagination } from 'swiper/modules';

import Item from './Item';
import { ShopContext } from '../context/ShopContext';



const NewArrivals = () => {
    const {books}=useContext(ShopContext)
    const [newArrivals,setNewArrivals]=useState([])
    useEffect(()=>{
        const data=books.slice(0,7);
        setNewArrivals(data.reverse())
    },[books])
  return (
   <section className='max-padd-container py-16 bg-white'>
    <Title title1={'New'} title2={'Arrivals'} titleStyles={'pb-10'} paraStyles={'!block'}/>
    <Swiper autoplay={{delay:3500,disableOnInteraction:false}}
    pagination={{
        clickable:true
    }}
    breakpoints={{
        400:{
            slidesPerView:2,
            spaceBetween:30
        },
        700:{
            slidesPerView:3,
            spaceBetween:30
        },
        1024:{
            slidesPerView:4,
            spaceBetween:30
        },
        1200:{
            slidesPerView:5,
            spaceBetween:30
        }
    }}
    modules={[Pagination,Autoplay]}
    className='h-[455]px sm:h-[488px] xl:h-[499px] mt-5'
    >
    {newArrivals.map((book)=>(
     <SwiperSlide key={book._id}>
        <Item book={book}/>
     </SwiperSlide>
    
))}
    </Swiper>
   </section>
  )
}

export default NewArrivals