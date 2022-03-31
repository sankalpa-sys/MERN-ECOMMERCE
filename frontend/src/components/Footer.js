import {
  LocationMarkerIcon,
  MailIcon,
  PhoneIcon,
} from "@heroicons/react/solid";
import React from "react";

function Footer() {
  return (
    <div className="w-full bg-gray-200 flex flex-col md:flex-row items-center justify-between text-sm text-gray-800 px-2">
      <div className=" w-full md:w-1/3 mx-3 ">
        <h1 className="mt-4 mb-2 text-lg font-bold">DOKAN.</h1>
        <p className="text-justify w-3/4">
          E-commerce has evolved over the past few years and since it’s easier
          and more convenient, it is evident that customers are actually
          switching to the trend of online shopping. Dokan, the Nepali shopping
          store, brings a whole new concept by showcasing a number of famous
          brands under one roof. Not only does it fulfill clothing necessities
          of both men and women but you can also shop for all kinds of
          appliances like air conditioners, heaters, refrigerators, LED TVs and
          a lot more. Simply select your favorite brand like Samsung, Apple, HP,
          Huawei, Dell, Canon, Nikon, etc and get yourself the best electronic
          items.
        </p>
        <br />

        <h2 className="font-semibold text-lg mb-2">
          Convenient Online Shopping in Nepal
        </h2>
        <p className="w-3/4 text-justify">
          Dokan is the ultimate Nepali eCommerce website that offers a solution
          for all needs of the customers. It has a wide and assorted range of
          products including clothing, electronics, mobile phones, home and
          living, health and beauty and much more.
        </p>

        <div className="flex space-x-4 mt-4 mb-2">
          <a target="_blank" href="https://www.facebook.com/Sankhalifa.33/">
            {" "}
            <i className="fab fa-facebook fa-2x text-blue-500  cursor-pointer"></i>
          </a>
          <a
            target="_blank"
            href="https://www.youtube.com/channel/UCaFCokjzNa0QLTQ8ZAOyU_g"
          >
            <i className="fab fa-youtube fa-2x text-red-500  cursor-pointer"></i>
          </a>
          <a
            target="_blank"
            href="https://www.instagram.com/_sankalpa_neupane/?hl=en"
          >
            <i className="fab fa-instagram fa-2x text-pink-500  cursor-pointer "></i>
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/sankalpa-neupane-215639208/"
          >
            <i className="fab fa-linkedin fa-2x text-blue-500  cursor-pointer"></i>
          </a>
        </div>
      </div>

      <div className="w-full md:w-1/3 flex justify-center items-start flex-col ">
        <h2 className="mb-2 text-lg font-bold md:ml-10 mt-6">Useful Links</h2>
        <div className=" flex justify-start space-x-24 w-full">
          <div className="flex flex-col justify-center items-start space-y-2 md:ml-10">
            <p>Home </p>
            <p>Man fashion</p>
            <p>Accesories</p>
            <p>Order Tracking</p>
            <p>WishList</p>
          </div>
          <div className="flex flex-col justify-center items-start space-y-2 mr-4 md:mr-10">
            <p>Cart</p>
            <p>Woman Fashion</p>
            <p>My Account</p>
            <p>WishList</p>
            <p>Term</p>
          </div>
        </div>
      </div>

      <div className="w-full  md:w-1/3 flex flex-col  justify-center space-y-3 mt-6">
        <h2 className="my-2 text-lg font-bold">Contact</h2>
        <div className="flex space-x-2">
          <LocationMarkerIcon className="h-6 w-6" />
          <p>Masbar-7, Pokhara, Gandaki, Nepal</p>
        </div>
        <div className="flex space-x-2">
          <PhoneIcon className="h-6 w-6" />
          <p>+977 377373</p>
        </div>

        <div className="flex space-x-2">
          <MailIcon className="h-6 w-6" />
          <p>sankalpa115@gmail.com</p>
        </div>

        <div className="flex space-x-2 items-center  ">
          <img
            src="https://cdn.pixabay.com/photo/2015/05/26/09/37/paypal-784404__480.png"
            className="payment"
            alt=""
          />
          <img
            src="https://cdn.pixabay.com/photo/2017/11/19/09/02/master-card-2962135__480.png"
            className="payment "
            alt=""
          />

          <img
            src="https://cdn.pixabay.com/photo/2017/08/10/14/02/visa-2623015__340.png"
            alt=""
            className="payment"
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
