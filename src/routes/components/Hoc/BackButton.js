import { Button } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const BackButton = () => {
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  return (
    <Button onClick={handleBack} type="primary" className="gx-px-2">Back</Button>
  );
};

export default BackButton;
