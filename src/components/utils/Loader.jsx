const Loader = ({ width, height }) => {
  return (
    <div
      style={{
        width: width,
        height: height,
        minWidth: width,
        minHeight: height,
      }}
      className="bg-[#111111] relative"
    >
      <div className="absolute fixedCenterXnY">
        <div className="loader"></div>
      </div>
    </div>
  );
};
export default Loader;
