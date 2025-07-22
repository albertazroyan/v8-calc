import Calculator from "./components/Calculator";
import SimpleCalc from "./components/SimpleCalc";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Calculator />
      <SimpleCalc />
    </div>
  );
}

export default App;