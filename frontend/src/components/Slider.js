import React from "react";

function Slider() {
  return (
    
    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div className="carousel-inner">
      <div className="carousel-item active">
        
        <img src="https://cdn.pixabay.com/photo/2015/12/08/10/38/online-shopping-1082727__480.jpg " className="d-block h-[500px] md:h-[650px] w-100 opacity-80" alt="..."/>
        <div className="carousel-caption d-none d-md-block text-white cursor-default ">
          <h5 className=" text-4xl font-bold font-Lora drop-shadow-xl animate-bounce">SUMMER SALE</h5>
          <p className=" font-semibold text-lg font-Lora drop-shadow-xl">DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.</p>
        </div>
      </div>
      <div className="carousel-item">
      <img src="https://wallpaperaccess.com/full/2593107.jpg" className="d-block h-[500px] md:h-[650px] w-100 opacity-80" alt="..."/>
        <div className="carousel-caption text-black d-none d-md-block cursor-default">
          <h5 className="text-4xl font-bold font-Lora drop-shadow-xl animate-bounce">AUTUMN COLLECTION</h5>
          <p className=" font-semibold text-lg font-Lora drop-shadow-xl">DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.</p>
        </div>
      </div>
      <div className="carousel-item">
      <img src="https://cdn.pixabay.com/photo/2018/08/29/17/07/ecommerce-3640321__480.jpg" className="d-block h-[500px] md:h-[650px] w-100 opacity-80" alt="..."/>
        <div className="carousel-caption text-black d-none cursor-default d-md-block">
          <h5 className="text-4xl font-bold font-Lora drop-shadow-xl animate-bounce">LOUNGEWEAR LOVE</h5>
          <p className="font-semibold text-lg font-Lora drop-shadow-xl">DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.</p>
        </div>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
  );
}

export default Slider;
