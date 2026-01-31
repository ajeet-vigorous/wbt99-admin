import { Button } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const BackButton = () => {
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  return (
    <Button onClick={handleBack} type="default" className="gx-px-2 gx-text-black">Back</Button>
  );
};

export default BackButton;
