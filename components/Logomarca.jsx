import Image from "next/image";

const Logomarca = () => {
  return (
    <div className="flex justify-center items-center gap-2">
      <Image alt="logo branca" width={25} height={25} src="/logo-branca.png" />
      <h1 className="text-5xl text-white font-medium font-playfair">
        PathFinder
      </h1>
    </div>
  );
};

export default Logomarca;
