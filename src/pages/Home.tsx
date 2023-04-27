import Nav from "../components/Nav";
import Posts from "../components/Posts";

function Home() {
  return (
    <>
      <Nav />
      <div id="container">
        <div className="mainBody">
          <div id="searchContainer">
            <input
              type="text"
              className="searchInpt"
              placeholder="Search Username"
            />
            <div id="search"></div>
          </div>
          <Posts />
        </div>
      </div>
    </>
  );
}
export default Home;
