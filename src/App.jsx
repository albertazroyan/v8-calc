import Calculator from "./components/Calculator";
import SimpleCalc from "./components/SimpleCalc";
import SearchBar from "./components/SearchBar";
const data = [
  "Apple",
  "Banana",
  "Grape",
  "Orange",
  "Pineapple",
  "Strawberry",
  "Watermelon",
  "Kiwi",
  "Mango",
  "Blueberry",
];

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Calculator />
      <SimpleCalc />
      <SearchBar data={data} />
    </div>
  );
}

export default App;