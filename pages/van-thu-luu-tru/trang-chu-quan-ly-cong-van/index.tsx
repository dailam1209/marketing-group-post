import React, { useState, useEffect } from "react";
import styles from "./management_dispatch.module.css";
import { Box_bot } from "@/components/van-thu-luu-tru/form_header/data_delete/box_bot/Box_bot";
import { fetchDataHome } from "@/utils/BaseApi";
import { useRouter } from "next/router";

interface ItemBox {
  id: number;
  image: React.ReactNode;
  num: number;
  color: string;
  title: string;
}

const Index = () => {
  const [data, setData] = useState<any>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchGetData = async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        try {
          const response = await fetchDataHome(
            token,
            "api/vanthu/trangchu/index"
          );
          setData(response?.data);
        } catch (error) {
          console.error("Error fetching home data:", error);
        }
      }
    };
    fetchGetData();
  }, [router.pathname]);
  const List_boxs_top: ItemBox[] = [
    {
      id: 1,
      image: (
        <svg
          width="76"
          height="77"
          viewBox="0 0 76 77"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_921_34827)">
            <path
              d="M38 64.5C54.5685 64.5 68 51.0685 68 34.5C68 17.9315 54.5685 4.5 38 4.5C21.4315 4.5 8 17.9315 8 34.5C8 51.0685 21.4315 64.5 38 64.5Z"
              fill="#4C5BD4"
            ></path>
            <g clip-path="url(#clip0_921_34827)">
              <path
                d="M51.1836 20.1445H50.085V19.0459C50.085 17.2285 48.6064 15.75 46.7891 15.75H24.8164C22.999 15.75 21.5205 17.2285 21.5205 19.0459V45.5596C21.5205 47.3769 22.999 48.8555 24.8164 48.8555H25.915V49.9541C25.915 51.7715 27.3936 53.25 29.2109 53.25H51.1836C53.001 53.25 54.4795 51.7715 54.4795 49.9541V23.4404C54.4795 21.6231 53.001 20.1445 51.1836 20.1445ZM26.8804 24.2173C26.2578 24.8398 25.915 25.6674 25.915 26.5478V46.6582H24.8164C24.2106 46.6582 23.7178 46.1654 23.7178 45.5596V19.0459C23.7178 18.4401 24.2106 17.9473 24.8164 17.9473H46.7891C47.3948 17.9473 47.8877 18.4401 47.8877 19.0459V20.1445H32.3183C31.4379 20.1445 30.6103 20.4874 29.9878 21.1099L26.8804 24.2173ZM32.5068 22.3418V26.7363H28.1123V26.5478C28.1123 26.2544 28.2266 25.9785 28.4341 25.771L31.5415 22.6635C31.749 22.4561 32.0249 22.3418 32.3183 22.3418H32.5068ZM52.2822 49.9541C52.2822 50.5599 51.7894 51.0527 51.1836 51.0527H29.2109C28.6052 51.0527 28.1123 50.5599 28.1123 49.9541V28.9336H33.6055C34.2122 28.9336 34.7041 28.4417 34.7041 27.835V22.3418H51.1836C51.7894 22.3418 52.2822 22.8346 52.2822 23.4404V49.9541Z"
                fill="white"
              ></path>
              <path
                d="M48.9863 31.2773H31.4082C30.8015 31.2773 30.3096 31.7692 30.3096 32.376C30.3096 32.9827 30.8015 33.4746 31.4082 33.4746H48.9863C49.5931 33.4746 50.085 32.9827 50.085 32.376C50.085 31.7692 49.5931 31.2773 48.9863 31.2773Z"
                fill="white"
              ></path>
              <path
                d="M48.9863 35.6719H31.4082C30.8015 35.6719 30.3096 36.1638 30.3096 36.7705C30.3096 37.3772 30.8015 37.8691 31.4082 37.8691H48.9863C49.5931 37.8691 50.085 37.3772 50.085 36.7705C50.085 36.1638 49.5931 35.6719 48.9863 35.6719Z"
                fill="white"
              ></path>
              <path
                d="M48.9863 40.0664H31.4082C30.8015 40.0664 30.3096 40.5583 30.3096 41.165C30.3096 41.7718 30.8015 42.2637 31.4082 42.2637H48.9863C49.5931 42.2637 50.085 41.7718 50.085 41.165C50.085 40.5583 49.5931 40.0664 48.9863 40.0664Z"
                fill="white"
              ></path>
              <path
                d="M48.9863 44.4609H31.4082C30.8015 44.4609 30.3096 44.9528 30.3096 45.5596C30.3096 46.1663 30.8015 46.6582 31.4082 46.6582H48.9863C49.5931 46.6582 50.085 46.1663 50.085 45.5596C50.085 44.9528 49.5931 44.4609 48.9863 44.4609Z"
                fill="white"
              ></path>
            </g>
          </g>
          <defs>
            <filter
              id="filter0_d_921_34827"
              x="0"
              y="0.5"
              width="76"
              height="76"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              ></feColorMatrix>
              <feOffset dy="4"></feOffset>
              <feGaussianBlur stdDeviation="4"></feGaussianBlur>
              <feComposite in2="hardAlpha" operator="out"></feComposite>
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              ></feColorMatrix>
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_921_34827"
              ></feBlend>
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_921_34827"
                result="shape"
              ></feBlend>
            </filter>
            <clipPath id="clip0_921_34827">
              <rect
                width="37.5"
                height="37.5"
                fill="white"
                transform="translate(19.25 15.75)"
              ></rect>
            </clipPath>
          </defs>
        </svg>
      ),
      color: "#4C5BD4",
      num: data?.data?.dem_tong,
      title: "Tổng số văn bản ",
    },
    {
      id: 2,
      image: (
        <svg
          width="76"
          height="77"
          viewBox="0 0 76 77"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_921_34851)">
            <path
              d="M38 64.5C54.5685 64.5 68 51.0685 68 34.5C68 17.9315 54.5685 4.5 38 4.5C21.4315 4.5 8 17.9315 8 34.5C8 51.0685 21.4315 64.5 38 64.5Z"
              fill="#4C5BD4"
            ></path>
            <g clip-path="url(#clip0_921_34851)">
              <path
                d="M51.1836 20.1445H50.085V19.0459C50.085 17.2285 48.6064 15.75 46.7891 15.75H24.8164C22.999 15.75 21.5205 17.2285 21.5205 19.0459V45.5596C21.5205 47.3769 22.999 48.8555 24.8164 48.8555H25.915V49.9541C25.915 51.7715 27.3936 53.25 29.2109 53.25H51.1836C53.001 53.25 54.4795 51.7715 54.4795 49.9541V23.4404C54.4795 21.6231 53.001 20.1445 51.1836 20.1445ZM26.8804 24.2173C26.2578 24.8398 25.915 25.6674 25.915 26.5478V46.6582H24.8164C24.2106 46.6582 23.7178 46.1654 23.7178 45.5596V19.0459C23.7178 18.4401 24.2106 17.9473 24.8164 17.9473H46.7891C47.3948 17.9473 47.8877 18.4401 47.8877 19.0459V20.1445H32.3183C31.4379 20.1445 30.6103 20.4874 29.9878 21.1099L26.8804 24.2173ZM32.5068 22.3418V26.7363H28.1123V26.5478C28.1123 26.2544 28.2266 25.9785 28.4341 25.771L31.5415 22.6635C31.749 22.4561 32.0249 22.3418 32.3183 22.3418H32.5068ZM52.2822 49.9541C52.2822 50.5599 51.7894 51.0527 51.1836 51.0527H29.2109C28.6052 51.0527 28.1123 50.5599 28.1123 49.9541V28.9336H33.6055C34.2122 28.9336 34.7041 28.4417 34.7041 27.835V22.3418H51.1836C51.7894 22.3418 52.2822 22.8346 52.2822 23.4404V49.9541Z"
                fill="white"
              ></path>
              <path
                d="M48.9863 30.75H31.4082C30.8015 30.75 30.3096 31.2419 30.3096 31.8486C30.3096 32.4554 30.8015 32.9473 31.4082 32.9473H48.9863C49.5931 32.9473 50.085 32.4554 50.085 31.8486C50.085 31.2419 49.5931 30.75 48.9863 30.75Z"
                fill="white"
              ></path>
              <path
                d="M48.9863 35.1445H31.4082C30.8015 35.1445 30.3096 35.6364 30.3096 36.2432C30.3096 36.8499 30.8015 37.3418 31.4082 37.3418H48.9863C49.5931 37.3418 50.085 36.8499 50.085 36.2432C50.085 35.6364 49.5931 35.1445 48.9863 35.1445Z"
                fill="white"
              ></path>
              <path
                d="M49.6719 42.9375H34.2383L37.2617 39.9023L35.6094 38.25L29.75 44.1094L35.6094 49.9688L37.2617 48.3164L34.2383 45.2813H49.6719V42.9375Z"
                fill="white"
              ></path>
            </g>
          </g>
          <defs>
            <filter
              id="filter0_d_921_34851"
              x="0"
              y="0.5"
              width="76"
              height="76"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              ></feColorMatrix>
              <feOffset dy="4"></feOffset>
              <feGaussianBlur stdDeviation="4"></feGaussianBlur>
              <feComposite in2="hardAlpha" operator="out"></feComposite>
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              ></feColorMatrix>
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_921_34851"
              ></feBlend>
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_921_34851"
                result="shape"
              ></feBlend>
            </filter>
            <clipPath id="clip0_921_34851">
              <rect
                width="37.5"
                height="37.5"
                fill="white"
                transform="translate(19.25 15.75)"
              ></rect>
            </clipPath>
          </defs>
        </svg>
      ),
      color: "#76B51B",
      num: data?.data?.dem_den,
      title: "Văn bản đến",
    },
    {
      id: 3,
      image: (
        <svg
          width="76"
          height="77"
          viewBox="0 0 76 77"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_921_34870)">
            <path
              d="M38 64.5C54.5685 64.5 68 51.0685 68 34.5C68 17.9315 54.5685 4.5 38 4.5C21.4315 4.5 8 17.9315 8 34.5C8 51.0685 21.4315 64.5 38 64.5Z"
              fill="#4C5BD4"
            ></path>
            <g clip-path="url(#clip0_921_34870)">
              <path
                d="M51.1836 20.1445H50.085V19.0459C50.085 17.2285 48.6064 15.75 46.7891 15.75H24.8164C22.999 15.75 21.5205 17.2285 21.5205 19.0459V45.5596C21.5205 47.3769 22.999 48.8555 24.8164 48.8555H25.915V49.9541C25.915 51.7715 27.3936 53.25 29.2109 53.25H51.1836C53.001 53.25 54.4795 51.7715 54.4795 49.9541V23.4404C54.4795 21.6231 53.001 20.1445 51.1836 20.1445ZM26.8804 24.2173C26.2578 24.8398 25.915 25.6674 25.915 26.5478V46.6582H24.8164C24.2106 46.6582 23.7178 46.1654 23.7178 45.5596V19.0459C23.7178 18.4401 24.2106 17.9473 24.8164 17.9473H46.7891C47.3948 17.9473 47.8877 18.4401 47.8877 19.0459V20.1445H32.3183C31.4379 20.1445 30.6103 20.4874 29.9878 21.1099L26.8804 24.2173ZM32.5068 22.3418V26.7363H28.1123V26.5478C28.1123 26.2544 28.2266 25.9785 28.4341 25.771L31.5415 22.6635C31.749 22.4561 32.0249 22.3418 32.3183 22.3418H32.5068ZM52.2822 49.9541C52.2822 50.5599 51.7894 51.0527 51.1836 51.0527H29.2109C28.6052 51.0527 28.1123 50.5599 28.1123 49.9541V28.9336H33.6055C34.2122 28.9336 34.7041 28.4417 34.7041 27.835V22.3418H51.1836C51.7894 22.3418 52.2822 22.8346 52.2822 23.4404V49.9541Z"
                fill="white"
              ></path>
              <path
                d="M48.9863 30.75H31.4082C30.8015 30.75 30.3096 31.2419 30.3096 31.8486C30.3096 32.4554 30.8015 32.9473 31.4082 32.9473H48.9863C49.5931 32.9473 50.085 32.4554 50.085 31.8486C50.085 31.2419 49.5931 30.75 48.9863 30.75Z"
                fill="white"
              ></path>
              <path
                d="M48.9863 35.1445H31.4082C30.8015 35.1445 30.3096 35.6364 30.3096 36.2432C30.3096 36.8499 30.8015 37.3418 31.4082 37.3418H48.9863C49.5931 37.3418 50.085 36.8499 50.085 36.2432C50.085 35.6364 49.5931 35.1445 48.9863 35.1445Z"
                fill="white"
              ></path>
              <path
                d="M29.75 42.9375H45.1836L42.1602 39.9023L43.8125 38.25L49.6719 44.1094L43.8125 49.9688L42.1602 48.3164L45.1836 45.2813H29.75V42.9375Z"
                fill="white"
              ></path>
            </g>
          </g>
          <defs>
            <filter
              id="filter0_d_921_34870"
              x="0"
              y="0.5"
              width="76"
              height="76"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              ></feColorMatrix>
              <feOffset dy="4"></feOffset>
              <feGaussianBlur stdDeviation="4"></feGaussianBlur>
              <feComposite in2="hardAlpha" operator="out"></feComposite>
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              ></feColorMatrix>
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_921_34870"
              ></feBlend>
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_921_34870"
                result="shape"
              ></feBlend>
            </filter>
            <clipPath id="clip0_921_34870">
              <rect
                width="37.5"
                height="37.5"
                fill="white"
                transform="translate(19.25 15.75)"
              ></rect>
            </clipPath>
          </defs>
        </svg>
      ),
      color: "#FFA800",
      num: data?.data?.dem_di,
      title: "Văn bản đi",
    },
    {
      id: 4,
      image: (
        <svg
          width="76"
          height="77"
          viewBox="0 0 76 77"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_921_34827)">
            <path
              d="M38 64.5C54.5685 64.5 68 51.0685 68 34.5C68 17.9315 54.5685 4.5 38 4.5C21.4315 4.5 8 17.9315 8 34.5C8 51.0685 21.4315 64.5 38 64.5Z"
              fill="#4C5BD4"
            ></path>
            <g clip-path="url(#clip0_921_34827)">
              <path
                d="M51.1836 20.1445H50.085V19.0459C50.085 17.2285 48.6064 15.75 46.7891 15.75H24.8164C22.999 15.75 21.5205 17.2285 21.5205 19.0459V45.5596C21.5205 47.3769 22.999 48.8555 24.8164 48.8555H25.915V49.9541C25.915 51.7715 27.3936 53.25 29.2109 53.25H51.1836C53.001 53.25 54.4795 51.7715 54.4795 49.9541V23.4404C54.4795 21.6231 53.001 20.1445 51.1836 20.1445ZM26.8804 24.2173C26.2578 24.8398 25.915 25.6674 25.915 26.5478V46.6582H24.8164C24.2106 46.6582 23.7178 46.1654 23.7178 45.5596V19.0459C23.7178 18.4401 24.2106 17.9473 24.8164 17.9473H46.7891C47.3948 17.9473 47.8877 18.4401 47.8877 19.0459V20.1445H32.3183C31.4379 20.1445 30.6103 20.4874 29.9878 21.1099L26.8804 24.2173ZM32.5068 22.3418V26.7363H28.1123V26.5478C28.1123 26.2544 28.2266 25.9785 28.4341 25.771L31.5415 22.6635C31.749 22.4561 32.0249 22.3418 32.3183 22.3418H32.5068ZM52.2822 49.9541C52.2822 50.5599 51.7894 51.0527 51.1836 51.0527H29.2109C28.6052 51.0527 28.1123 50.5599 28.1123 49.9541V28.9336H33.6055C34.2122 28.9336 34.7041 28.4417 34.7041 27.835V22.3418H51.1836C51.7894 22.3418 52.2822 22.8346 52.2822 23.4404V49.9541Z"
                fill="white"
              ></path>
              <path
                d="M48.9863 31.2773H31.4082C30.8015 31.2773 30.3096 31.7692 30.3096 32.376C30.3096 32.9827 30.8015 33.4746 31.4082 33.4746H48.9863C49.5931 33.4746 50.085 32.9827 50.085 32.376C50.085 31.7692 49.5931 31.2773 48.9863 31.2773Z"
                fill="white"
              ></path>
              <path
                d="M48.9863 35.6719H31.4082C30.8015 35.6719 30.3096 36.1638 30.3096 36.7705C30.3096 37.3772 30.8015 37.8691 31.4082 37.8691H48.9863C49.5931 37.8691 50.085 37.3772 50.085 36.7705C50.085 36.1638 49.5931 35.6719 48.9863 35.6719Z"
                fill="white"
              ></path>
              <path
                d="M48.9863 40.0664H31.4082C30.8015 40.0664 30.3096 40.5583 30.3096 41.165C30.3096 41.7718 30.8015 42.2637 31.4082 42.2637H48.9863C49.5931 42.2637 50.085 41.7718 50.085 41.165C50.085 40.5583 49.5931 40.0664 48.9863 40.0664Z"
                fill="white"
              ></path>
              <path
                d="M48.9863 44.4609H31.4082C30.8015 44.4609 30.3096 44.9528 30.3096 45.5596C30.3096 46.1663 30.8015 46.6582 31.4082 46.6582H48.9863C49.5931 46.6582 50.085 46.1663 50.085 45.5596C50.085 44.9528 49.5931 44.4609 48.9863 44.4609Z"
                fill="white"
              ></path>
            </g>
          </g>
          <defs>
            <filter
              id="filter0_d_921_34827"
              x="0"
              y="0.5"
              width="76"
              height="76"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              ></feColorMatrix>
              <feOffset dy="4"></feOffset>
              <feGaussianBlur stdDeviation="4"></feGaussianBlur>
              <feComposite in2="hardAlpha" operator="out"></feComposite>
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              ></feColorMatrix>
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_921_34827"
              ></feBlend>
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_921_34827"
                result="shape"
              ></feBlend>
            </filter>
            <clipPath id="clip0_921_34827">
              <rect
                width="37.5"
                height="37.5"
                fill="white"
                transform="translate(19.25 15.75)"
              ></rect>
            </clipPath>
          </defs>
        </svg>
      ),
      color: "#4C5BD4",
      num: data?.data?.hd_tong,
      title: "Tổng số hợp đồng",
    },
    {
      id: 5,
      image: (
        <svg
          width="76"
          height="77"
          viewBox="0 0 76 77"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_921_34851)">
            <path
              d="M38 64.5C54.5685 64.5 68 51.0685 68 34.5C68 17.9315 54.5685 4.5 38 4.5C21.4315 4.5 8 17.9315 8 34.5C8 51.0685 21.4315 64.5 38 64.5Z"
              fill="#4C5BD4"
            ></path>
            <g clip-path="url(#clip0_921_34851)">
              <path
                d="M51.1836 20.1445H50.085V19.0459C50.085 17.2285 48.6064 15.75 46.7891 15.75H24.8164C22.999 15.75 21.5205 17.2285 21.5205 19.0459V45.5596C21.5205 47.3769 22.999 48.8555 24.8164 48.8555H25.915V49.9541C25.915 51.7715 27.3936 53.25 29.2109 53.25H51.1836C53.001 53.25 54.4795 51.7715 54.4795 49.9541V23.4404C54.4795 21.6231 53.001 20.1445 51.1836 20.1445ZM26.8804 24.2173C26.2578 24.8398 25.915 25.6674 25.915 26.5478V46.6582H24.8164C24.2106 46.6582 23.7178 46.1654 23.7178 45.5596V19.0459C23.7178 18.4401 24.2106 17.9473 24.8164 17.9473H46.7891C47.3948 17.9473 47.8877 18.4401 47.8877 19.0459V20.1445H32.3183C31.4379 20.1445 30.6103 20.4874 29.9878 21.1099L26.8804 24.2173ZM32.5068 22.3418V26.7363H28.1123V26.5478C28.1123 26.2544 28.2266 25.9785 28.4341 25.771L31.5415 22.6635C31.749 22.4561 32.0249 22.3418 32.3183 22.3418H32.5068ZM52.2822 49.9541C52.2822 50.5599 51.7894 51.0527 51.1836 51.0527H29.2109C28.6052 51.0527 28.1123 50.5599 28.1123 49.9541V28.9336H33.6055C34.2122 28.9336 34.7041 28.4417 34.7041 27.835V22.3418H51.1836C51.7894 22.3418 52.2822 22.8346 52.2822 23.4404V49.9541Z"
                fill="white"
              ></path>
              <path
                d="M48.9863 30.75H31.4082C30.8015 30.75 30.3096 31.2419 30.3096 31.8486C30.3096 32.4554 30.8015 32.9473 31.4082 32.9473H48.9863C49.5931 32.9473 50.085 32.4554 50.085 31.8486C50.085 31.2419 49.5931 30.75 48.9863 30.75Z"
                fill="white"
              ></path>
              <path
                d="M48.9863 35.1445H31.4082C30.8015 35.1445 30.3096 35.6364 30.3096 36.2432C30.3096 36.8499 30.8015 37.3418 31.4082 37.3418H48.9863C49.5931 37.3418 50.085 36.8499 50.085 36.2432C50.085 35.6364 49.5931 35.1445 48.9863 35.1445Z"
                fill="white"
              ></path>
              <path
                d="M49.6719 42.9375H34.2383L37.2617 39.9023L35.6094 38.25L29.75 44.1094L35.6094 49.9688L37.2617 48.3164L34.2383 45.2813H49.6719V42.9375Z"
                fill="white"
              ></path>
            </g>
          </g>
          <defs>
            <filter
              id="filter0_d_921_34851"
              x="0"
              y="0.5"
              width="76"
              height="76"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              ></feColorMatrix>
              <feOffset dy="4"></feOffset>
              <feGaussianBlur stdDeviation="4"></feGaussianBlur>
              <feComposite in2="hardAlpha" operator="out"></feComposite>
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              ></feColorMatrix>
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_921_34851"
              ></feBlend>
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_921_34851"
                result="shape"
              ></feBlend>
            </filter>
            <clipPath id="clip0_921_34851">
              <rect
                width="37.5"
                height="37.5"
                fill="white"
                transform="translate(19.25 15.75)"
              ></rect>
            </clipPath>
          </defs>
        </svg>
      ),
      color: "#76B51B",
      num: data?.data?.hd_den,
      title: "Hợp đồng đến",
    },
    {
      id: 6,
      image: (
        <svg
          width="76"
          height="77"
          viewBox="0 0 76 77"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_921_34870)">
            <path
              d="M38 64.5C54.5685 64.5 68 51.0685 68 34.5C68 17.9315 54.5685 4.5 38 4.5C21.4315 4.5 8 17.9315 8 34.5C8 51.0685 21.4315 64.5 38 64.5Z"
              fill="#4C5BD4"
            ></path>
            <g clip-path="url(#clip0_921_34870)">
              <path
                d="M51.1836 20.1445H50.085V19.0459C50.085 17.2285 48.6064 15.75 46.7891 15.75H24.8164C22.999 15.75 21.5205 17.2285 21.5205 19.0459V45.5596C21.5205 47.3769 22.999 48.8555 24.8164 48.8555H25.915V49.9541C25.915 51.7715 27.3936 53.25 29.2109 53.25H51.1836C53.001 53.25 54.4795 51.7715 54.4795 49.9541V23.4404C54.4795 21.6231 53.001 20.1445 51.1836 20.1445ZM26.8804 24.2173C26.2578 24.8398 25.915 25.6674 25.915 26.5478V46.6582H24.8164C24.2106 46.6582 23.7178 46.1654 23.7178 45.5596V19.0459C23.7178 18.4401 24.2106 17.9473 24.8164 17.9473H46.7891C47.3948 17.9473 47.8877 18.4401 47.8877 19.0459V20.1445H32.3183C31.4379 20.1445 30.6103 20.4874 29.9878 21.1099L26.8804 24.2173ZM32.5068 22.3418V26.7363H28.1123V26.5478C28.1123 26.2544 28.2266 25.9785 28.4341 25.771L31.5415 22.6635C31.749 22.4561 32.0249 22.3418 32.3183 22.3418H32.5068ZM52.2822 49.9541C52.2822 50.5599 51.7894 51.0527 51.1836 51.0527H29.2109C28.6052 51.0527 28.1123 50.5599 28.1123 49.9541V28.9336H33.6055C34.2122 28.9336 34.7041 28.4417 34.7041 27.835V22.3418H51.1836C51.7894 22.3418 52.2822 22.8346 52.2822 23.4404V49.9541Z"
                fill="white"
              ></path>
              <path
                d="M48.9863 30.75H31.4082C30.8015 30.75 30.3096 31.2419 30.3096 31.8486C30.3096 32.4554 30.8015 32.9473 31.4082 32.9473H48.9863C49.5931 32.9473 50.085 32.4554 50.085 31.8486C50.085 31.2419 49.5931 30.75 48.9863 30.75Z"
                fill="white"
              ></path>
              <path
                d="M48.9863 35.1445H31.4082C30.8015 35.1445 30.3096 35.6364 30.3096 36.2432C30.3096 36.8499 30.8015 37.3418 31.4082 37.3418H48.9863C49.5931 37.3418 50.085 36.8499 50.085 36.2432C50.085 35.6364 49.5931 35.1445 48.9863 35.1445Z"
                fill="white"
              ></path>
              <path
                d="M29.75 42.9375H45.1836L42.1602 39.9023L43.8125 38.25L49.6719 44.1094L43.8125 49.9688L42.1602 48.3164L45.1836 45.2813H29.75V42.9375Z"
                fill="white"
              ></path>
            </g>
          </g>
          <defs>
            <filter
              id="filter0_d_921_34870"
              x="0"
              y="0.5"
              width="76"
              height="76"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              ></feColorMatrix>
              <feOffset dy="4"></feOffset>
              <feGaussianBlur stdDeviation="4"></feGaussianBlur>
              <feComposite in2="hardAlpha" operator="out"></feComposite>
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              ></feColorMatrix>
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_921_34870"
              ></feBlend>
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_921_34870"
                result="shape"
              ></feBlend>
            </filter>
            <clipPath id="clip0_921_34870">
              <rect
                width="37.5"
                height="37.5"
                fill="white"
                transform="translate(19.25 15.75)"
              ></rect>
            </clipPath>
          </defs>
        </svg>
      ),
      color: "#FFA800",
      num: data?.data?.hd_di,
      title: "Hợp đồng đi",
    },
  ];
  const ListBoxs = List_boxs_top?.map((item, index) => {
    return (
      <div className={styles.item} key={index}>
        <div className={styles.item_img}>{item.image}</div>
        <div className={styles.item_info}>
          <p className={styles.num} style={{ color: item.color }}>
            {item.num}
          </p>
          <p className={styles.name}>{item.title}</p>
        </div>
      </div>
    );
  });
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;

  return (
    <div className={styles.container}>
      <div className={styles.home_main}>
        <div className={styles.box_data}>
          <div className={styles.list_box_data_top}>
            <div className={styles.title_top}>
              Hôm nay, ngày {formattedDate}
            </div>
            <div className={styles.list_box}>{ListBoxs}</div>
          </div>
          <div className={styles.title_bottom}>
            <p className={styles.p_bottom}>Văn bản gần đây</p>
          </div>
          <div className={styles.list_box_file}>
            <Box_bot listboxs={data?.data?.arr_xoa} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

// export async function getServerSideProps(context: {
//   req: { headers: { cookie: any } };
// }) {
//   try {
//     const cookies = parse(context.req.headers.cookie || "");
//     const token = `${cookies.token_first}${cookies.token_hafl}`;
//     if (!token) {
//       return {
//         redirect: {
//           destination: "/404",
//           permanent: false,
//         },
//       };
//     }
//     const data = await fetchDataHome(token, "api/vanthu/trangchu/index");
//     return {
//       props: {
//         data: data?.data,
//       },
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       props: {
//         data: null,
//       },
//     };
//   }
// }
