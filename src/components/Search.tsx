function Search(props: any) {
  return (
    <>
      <div id="searchContainer">
        <input
          type="text"
          className="searchInpt"
          placeholder="Search Username"
        />
        <div id="search"></div>
      </div>
    </>
  );
}
export default Search;
