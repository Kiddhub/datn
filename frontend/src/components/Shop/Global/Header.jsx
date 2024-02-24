// eslint-disable-next-line react/prop-types
const Header = ({ category, title }) => {
  return (
    <div className="mb-24">
      <p className="text-gray-400 leading-7 text-12">{category}</p>
      <p className="font-extrabold text-19 leading-9 tracking-tight text-slate-900">
        {title}
      </p>
    </div>
  );
};

export default Header;
