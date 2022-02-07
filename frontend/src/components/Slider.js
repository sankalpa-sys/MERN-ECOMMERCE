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
        
        <img src="https://images.pexels.com/photos/887349/pexels-photo-887349.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2 " className="d-block h-[600px] w-100 opacity-80" alt="..."/>
        <div className="carousel-caption d-none d-md-block shadow-lg">
          <h5 className="text-white text-4xl font-bold font-serif">SUMMER SALE</h5>
          <p className="text-white font-semibold text-lg font-serif">DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.</p>
        </div>
      </div>
      <div className="carousel-item">
      <img src="https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="d-block md:h-[600px] w-100 opacity-80" alt="..."/>
        <div className="carousel-caption d-none d-md-block">
          <h5 className="text-white text-4xl font-bold font-serif">AUTUMN COLLECTION</h5>
          <p className="text-white font-semibold text-lg font-serif">DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.</p>
        </div>
      </div>
      <div className="carousel-item">
      <img src="https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="d-block h-[600px] w-100 opacity-80" alt="..."/>
        <div className="carousel-caption d-none d-md-block">
          <h5 className="text-white text-4xl font-bold font-serif">LOUNGEWEAR LOVE</h5>
          <p className="text-whitefont-semibold text-lg font-serif">DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.</p>
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
