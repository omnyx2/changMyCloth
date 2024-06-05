import Image from "next/image";
import Link from "next/link"

const Wave = ({children}) => {
  return (
    <div className="w-full min-h-screen px-6 pt-5 pb-3 text-orange-500 flex flex-col bg-black">
      <div className="block w-full h-[25%]">
      <div className="relative t-0 w-full h-[25%]">
        <div className="absoulte text-xl font-tilda-petite w-full h-[1em] t-0 text-center pb-0 font-bold">
          Revolutionize Your Style Revolutionize Only for IPAD VERTICAL Your Style RevolutionizE E E E E
        </div>
        <div className="absoulte mt-0 pt-0 pb-0 mb-0 tracking-tight p-0 t-0 font-paralines letter-2 text-[20rem]  text-center">
          FASHAI
        </div>
        <div className=" absoulte text-xl font-tilda-petite w-full h-auto t-80 text-center p-0 font-bold">
        R R  R Revolutionize Your Style Revolutionize Your Style Revolutionize Your Style Revolutionize
        </div>
      </div>
      </div>
      <div className="pb-8"></div>
      <div className="relative background-image h-full">
        {children}
      </div>
    </div>
  )
}


export default function Home() {
  return (
    <main className="flex w-full h-full flex-col items-center justify-between ">
      <Wave>
      <div className="block w-full h-[55vh] flex-col text-skintone font-countach items-center justify-center">
        <div className="absolute top-16 translate-x-[calc(50vw-29rem)] font-extrabold font-sans text-white text-[4rem] z-100">
          Change Your Clothes with AI!
        </div>
        <Link href={"/webcam"}>
            <div className="absolute bottom-10 translate-x-[calc(50vw-4em)] bg-white text-black text-xl font-bold rounded-full w-40 h-16 flex flex-col items-center justify-center">
              Start
            </div>
          </Link>
          </div>
      </Wave>
    </main>
  );
}
