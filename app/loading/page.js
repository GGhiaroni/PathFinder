const Loading = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center
          bg-gradient-to-b from-indigo-50 to-fuchsia-100
          animate-gradient-y bg-[length:200%_200%]"
    >
      <h1 className="text-4xl font-bold text-[#851F92]">
        Gerando seu roteiro...
      </h1>
      <p className="text-xl text-gray-600 mt-2">
        Isso pode levar alguns segundos
      </p>
      <div className="mt-8 h-12 w-12 border-t-4 border-[#851F92] border-opacity-50 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
