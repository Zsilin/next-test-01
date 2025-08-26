import Image from "next/image";
export default function Home() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Image src="/globe.svg" alt="window" width={500} height={500} />
    </div>
  );
}
