import Image from "next/image";
import Link from "next/link"
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <Link href={"/"}>
      <div className=" p-24">
        <p>
          돌아가기
          </p>
          <p>
            Start!
          </p>
      </div>
      </Link>
  </main>
  );
}
