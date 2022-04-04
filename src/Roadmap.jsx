import "./Roadmap.scss";

const Roadmap = () => {
  return (
    <div className="roadmap">
      <img src="Roadmap.png" alt="roadmap" />
      <img src="Cylinder.png" alt="cylinder" id="cylinder" />
      <span className="token-1">
        <img src="Token-1.png" alt="token-1" width={42} height={42} />
      </span>
      <span className="token-2">
        <img src="Token-2.png" alt="token-2" width={42} height={42} />
      </span>
    </div>
  );
};

export default Roadmap;
