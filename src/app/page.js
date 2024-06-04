import Image from "next/image";
import Link from "next/link"
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href={"/webcam"}>
        <div className="pt-60 text-center text-skintone font-countach">
       
          <p className="animate-pulse " >
            이제는 더이상 힘들이고 옷 갈아 입으로 다니며 시간을 낭비하지 말아요!
            </p>
            <p className="animate-pulse ">
              Change our cloth by AI, Start!
            </p>
        </div>
        </Link>
    </main>
  );
}
