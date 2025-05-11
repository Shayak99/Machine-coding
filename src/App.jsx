import Folder from "./FolderStructure";
import OTP from "./OtpInput";
import Tabs from "./MultipleTabs";
import Circles from "./OverlappingCircles";
import Counter from "./Todos";
import Chips from "./Chips";
import Practice from "./VDomToRDom";
import Checkbox from "./NestedCheckbox";


const domNode = document.createElement("div");

const App = () => {
  return (
    <>
      {/* <Folder /> */}
      {/* <OTP /> */}
      {/* <Tabs /> */}
      {/* <Circles /> */}
      {/* <Counter /> */}
      {/* <Chips /> */}
      {/* <Practice virtualNode={virtualNode} domNode={domNode} /> */}
      <Checkbox />
    </>
  );
};

export default App;
