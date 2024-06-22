const Loader = ({ w, h }) => {
  return (
    <div style={{ width: w, height: h }} className="bg-[#111111] relative">
      <div className="absolute fixedCenterXnY ">
        <div className="loader"></div>
      </div>
    </div>
  );
};
export default Loader;
