const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#f2f2f1] bg-opacity-70 z-50">
      <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin-fast"></div>
    </div>
  );
};

export default Loading;