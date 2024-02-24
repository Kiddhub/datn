import logo from '../../../assets/logo.png'
const AuthHeader = () => {
  return (
    <>
      <div className="shadow -md top-0 left-0 w-full h-52 rounded-md bg-[#FFF6E9]">
        <div className="flex justify-between items-center">
          <div className="cursor-pointer text-red-800 ml-10">
            <img className="mr-2 pt-6 w-1/3" src={logo} />
          </div>
          <div className="cursor-pointer text-[#ee4d2d] text-[20px] mr-20">
            Do you need support? 🎧
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthHeader;
