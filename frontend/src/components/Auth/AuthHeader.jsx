import logo from "../../assets/logo/logo.jpg";

const AuthHeader = () => {
  return (
    <>
      <div className="shadow -md top-0 left-0 w-full h-52 rounded-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center font-bold text-2xl font-[Poppins] cursor-pointer text-red-800 ml-10">
            <img className="w-[3rem] mr-2 pt-6" src={logo} alt="logo" />
            OdiK Store
          </div>
          <div className="cursor-pointer text-[#ee4d2d] text-xs mr-2">
            Do you need support?
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthHeader;
