import CitiesGrid from "./components/CitiesGrid";

function App() {
  return (
    <div className="main-bg">
      <h1 className="italic text-[2rem] max-w-[50rem] mx-auto px-[0.3rem] py-[0.5rem] flex flex-wrap ">
        <div className="text-left">The app shows </div>
        <span className=" not-italic font-extrabold text-[2em] w-full text-center">
          Live Air Condition
        </span>{" "}
        <div className=" w-full text-right ">in capitals around the Wolrd </div>
      </h1>
      <CitiesGrid />
    </div>
  );
}

export default App;
