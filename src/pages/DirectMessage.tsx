import { useParams } from "react-router-dom";
import MessageBox from "../components/messages/MessageBox";
import Auth from "../hooks/Auth";

function DirectMessage() {
  const { ID } = useParams();
  return (
    <>
      <MessageBox clientID={ID} />
    </>
  );
}
export default DirectMessage;
