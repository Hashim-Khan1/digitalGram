import Nav from "../components/Nav";
import Posts from "../components/Posts";

function Home() {
  return (
    <>
      <Nav />
      <div id="container">
        <div className="mainBody">{/* <Posts /> */}</div>
      </div>
    </>
  );
}
export default Home;
