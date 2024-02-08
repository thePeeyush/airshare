import Link from "next/link";

export default function Home() {
  return (
    <main className=" flex flex-col justify-center items-center h-screen p-8">
      <h1>Share any file over the ShareU securely and seamlessly</h1>
      <div className="mt-64">
        <Link href={'/send'}><button className="w-28 h-28 text-center bg-orange-600 m-4 rounded-full ">Send</button></Link>
        <Link href={'/recieve'}><button className="w-28 h-28 text-center bg-green-600  m-4  rounded-full">Recieve</button></Link>
      </div>
    </main>
  );
}
