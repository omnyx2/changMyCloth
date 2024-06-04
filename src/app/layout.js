import { Inter } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });


const VintageFrame = () => {
  return (
    <div className="relative z-[-10] center-absolute w-full h-full">
      <div className="center-absolute z-[-10] bg-dark min-h-screen flex justify-center items-center bg-no-repeat bg-center bg-cover" style={{ backgroundImage: 'url(https://i.ibb.co/nrmkm7d/five-bells-washed-out-logo.png)' }}>
      <div className="border-2 z-[-10] border-skintone p-2 lg:p-6 m-auto relative max-w-screen-lg">
        <div className="relative border-6 z-[-10] border-skintone p-6">
          <div className=" w-[80vw] z-[-10] h-[80vh] border-2 border-skintone p-6 relative text-center">
            <img className="absolute z-[-2] top-2 left-2 w-12 sm:w-14 lg:w-16 xl:w-20 transform -translate-x-1 -translate-y-1" src="corner.png" width={64} height={64} alt="Corner decoration"/>
            <img className="absolute z-[-2] top-2 right-0 w-12 sm:w-14 lg:w-16 xl:w-20 transform scale-x-[-1] -translate-x-1 -translate-y-1" src="corner.png" width={64} height={64} alt="Corner decoration"/>
            <img className="absolute z-[-2] bottom-0 left-2 w-12 sm:w-14 lg:w-16 xl:w-20 transform scale-y-[-1] -translate-x-1 -translate-y-1" src="corner.png" width={64} height={64} alt="Corner decoration"/>
            <img className="absolute z-[-2] bottom-0 right-0 w-12 sm:w-14 lg:w-16 xl:w-20 transform scale-[-1] -translate-x-1 -translate-y-1" src="corner.png" width={64} height={64} alt="Corner decoration"/>
            <img className="absolute top-0 left-1/2 transform -translate-x-1/2 w-44 sm:w-56 lg:w-72" src="https://i.ibb.co/JRTK9z4/horizontally-centered-vertical-decoration.png" width={256} height={64} alt="Vertical decoration"/>
            <img className="absolute  bottom-0 left-1/2 transform -translate-x-1/2 scale-y-[-1] w-44 sm:w-56 lg:w-72" src="https://i.ibb.co/JRTK9z4/horizontally-centered-vertical-decoration.png" width={256} height={64} alt="Vertical decoration"/>
            <img className="mx-auto my-4 w-20 sm:w-40 lg:w-44 xl:w-48" src="https://i.ibb.co/J2tzs0F/five-bells-logo.png" width={128} height={128} alt="Five Bells logo"/>
           
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
};


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-full h-full">
      
        {children}
        </body>
    </html>
  );
}
