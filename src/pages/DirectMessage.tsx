import { useParams } from "react-router-dom";
import MessageBox from "../components/messages/MessageBox";

function DirectMessage() {
  const { ID } = useParams();

  return (
    <>
      <MessageBox clientID={ID} />
    </>
  );
}
export default DirectMessage;
