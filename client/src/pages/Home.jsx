import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';


export default function Home() {
  SwiperCore.use([Navigation]);


  return (
    <div>
        {/* top */}
        <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Bridging Plates, <span className='text-slate-500'>Connecting Hearts </span>
          <br />
          Nourishing Communities Together
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Uniting surplus with purpose. Connect restaurants to NGOs, 
          <br />
          transforming excess food into impactful meals for those in need.
        </div>
        </div>


<div id="carouselExample" className="carousel slide">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="../../img1.jpg" className="d-block mx-auto w-75" alt="..."/> 
    </div>
    <div className="carousel-item">
      <img src="../../img2.jpg" className="d-block mx-auto w-75" alt="..."/> 
    </div>
    <div className="carousel-item">
      <img src="../../img3.jpg" className="d-block mx-auto w-75" alt="..."/> 
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>


    </div>
  )
}
