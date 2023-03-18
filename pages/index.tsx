import React, { Suspense, useEffect, useRef, useState } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import { RxHamburgerMenu } from "react-icons/rx";
import { gsap } from "gsap";
import $ from "jquery";
import Link from "next/link";
import SplitType from "split-type";
import bgPlaceholderImage from "images/kelly-sikkema-YXWoEn5uOvg-unsplash-1.jpg";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
// const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  const heroTitle = useRef(null);
  const heroSubtitle = useRef(null);
  const detailText = useRef(null);
  const ball = useRef(null);
  const lgBall = useRef(null);
  const innerTitleWordWeb = useRef(null);
  const innerTitleWordApp = useRef(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const innerTitleWordBrand = useRef(null)
  useEffect(() => {
    if (typeof window !== "undefined") {
      // getting elements
      const heroTitleSplitType = SplitType.create(heroTitle.current ?? "");
      const heroSubTitleSplitType = SplitType.create(
        heroSubtitle.current ?? ""
      );
      const detailTextSplitType = SplitType.create(detailText.current ?? "");
      // getting elements chars
      const titleChars = heroTitleSplitType.chars;
      const subTitleChars = heroSubTitleSplitType.chars;
      const textChars = detailTextSplitType.chars;
      // ball scroll animation
      gsap.set(ball.current, { xPercent: -50, yPercent: -50, zIndex: 99999 });
      // gsap.to(ball.current, 3, {rotation:"360", ease: 'Linear.easeNone', repeat:1});
      const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      const mouse = { x: pos.x, y: pos.y };
      const speed = 0.2;
      const xSet = gsap.quickSetter(ball.current, "x", "px");
      const ySet = gsap.quickSetter(ball.current, "y", "px");
      window.addEventListener("mousemove", (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
      });
      gsap.ticker.add(() => {
        // adjust speed for higher refresh monitors
        const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
        pos.x += (mouse.x - pos.x) * dt;
        pos.y += (mouse.y - pos.y) * dt;
        xSet(pos.x);
        ySet(pos.y);
      });
      // mouseenter scaling
      $(".link").on("mouseenter", function () {
        gsap.to(ball.current, { scale: 1.5, duration: 0.5 });
      });
      $(".link").on("mouseleave", function () {
        gsap.to(ball.current, { scale: 1, duration: 0.5 });
      });
      // title reveal animation
      gsap.fromTo(
        titleChars,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 2,
          ease: "power4.out",
        }
      );
      // subtitle reveal animation
      gsap.fromTo(
        subTitleChars,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.8,
          ease: "power4.out",
        }
      );
      // bottom text reveal animation
      gsap.fromTo(
        textChars,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 1,
          ease: "power4.out",
        }
      );
    }
  }, []);

  useEffect(() => {
    // console.log(innerTitleWordWeb.current, innerTitleWordApp.current, innerTitleWordBrand.current, "dsadadwewjlk")
    if (typeof window !== "undefined") {
      if (document.readyState === "complete" || document.readyState === "interactive") {
        setIsLoading(false);
      } else {
        setIsLoading(true);
      }
      const innerTitleWord = document.querySelectorAll("span.inner-title-word .word");
      innerTitleWord.forEach((item, index) => {
        wordAnimation(item, index);
      });
    }
  });

  const wordAnimation = (item: HTMLElement | any, index: number) => {
    let imgUrl = '';
    if (index === 0) {
      imgUrl = '/images/kelly-sikkema-YXWoEn5uOvg-unsplash-1.jpg'
    } else if (index === 1) {
      imgUrl = '/images/usgs-kHxFj8DN0go-unsplash-1.jpg'
    } else if (index === 2) {
      imgUrl = '/images/eiraj-f-PJgZa1IR8o0-unsplash-1.jpg'
    }
    $(item).on("mouseenter", function () {
      gsap.timeline().fromTo(ball.current, { rotation: 0 }, { rotation: 360, duration: 5, repeat: -1, ease: "linear" }, 0);
      gsap.to(ball.current, {
        duration: 1,
        ease: "linear",
        css: {
          scale: 8,
          border: 0.5,
          zIndex: -1,
          backgroundImage: `url('/images/kelly-sikkema-YXWoEn5uOvg-unsplash-1.jpg')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          objectFit: "contain",
        },
      });
      gsap.to(item, {
        css: {
          // webkitTextFillColor: 'black',
          mixBlendMode: "difference",
        },
      });
    });
    $(item).on("mouseleave", function () {
      gsap.to(ball.current, {
        duration: 1,
        ease: "linear",
        css: {
          scale: 1,
          border: 0.5,
          zIndex: 99999,
          backgroundImage: `none`,
        },
      });
      gsap.to(item, {
        css: {
          // webkitTextFillColor: 'white',
          mixBlendMode: "difference",
        },
      });
    });
  };
  return (
    <>
      {!isLoading ? (
        <>
          <Head>
            <title>Cuberto GSAP</title>
            <meta name="description" content="Generated by create next app" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="ball" ref={ball}></div>
          <div className="lg-ball" ref={lgBall}></div>
          <header className="p-20 flex fixed top-0 right-0 left-0 justify-between items-center w-full bg-white">
            <h1 className="text-2xl link font-extrabold">
              <Link href="/" legacyBehavior>
                <a>cuberto</a>
              </Link>
            </h1>
            <div className="flex items-center justify-end gap-10">
              <h2 className="text-2xl link">
                <Link href="/our-showreel" legacyBehavior>
                  <a>our showreel</a>
                </Link>
              </h2>
              <div className="hamburgerMenu flex gap-6 cursor-pointer items-center">
                <span className="text-2xl link">menu</span>
                <RxHamburgerMenu className="text-3xl link" />
              </div>
            </div>
          </header>
          <main className="container mx-auto py-20 h-full">
            <div className="flex flex-col items-start justify-center h-full mx-auto">
              <p
                className="hero-subtitle reveal-animate text-xl text-black overflow-hidden font-extrabold"
                ref={heroSubtitle}
              >
                We make it happen
              </p>
              <p
                className="hero-title reveal-animate text-9xl leading-[170px] text-black overflow-hidden font-font-Semibold py-6"
                ref={heroTitle}
              >
                <span className="inner-title-word" ref={innerTitleWordWeb}>
                  Websites
                </span>{" "}
                <span className="inner-title-word" ref={innerTitleWordApp}>
                  Apps
                </span>{" "}
                <span className="inner-title-word" ref={innerTitleWordWeb}>Branding</span>
              </p>
            </div>
            <div className="bottom-text overflow-hidden">
              <p
                className="detail-text reveal-animate text-4xl text-black overflow-hidden"
                ref={detailText}
              >
                Leading digital agency with solid design and development<br />
                expertise. We build readymade websites, mobile applications, and<br />
                elaborate online business services.
              </p>
            </div>
          </main>
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
}
