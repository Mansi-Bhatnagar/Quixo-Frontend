import Navbar from "../Components/Navbar";

const BoardDetail = () => {
  return (
    <>
      <Navbar />
      {/* color here will come from api */}
      <div className="relative w-screen h-[calc(100vh_-_53px)] bg-gradient-to-r from-gray-300 via-gray-500 to-gray-700">
        <div className="absolute top-0 w-full bg-[#0000003d] py-2">
          <h4 className="text-white font-medium text-xl">Test Board</h4>
        </div>
        <div className="bg-[#0000003d] w-screen h-[calc(100vh_-_53px)]" />
      </div>
    </>
  );
};

export default BoardDetail;
