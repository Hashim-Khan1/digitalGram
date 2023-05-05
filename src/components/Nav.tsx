import Auth from "../hooks/Auth";

function Nav() {
  Auth();
  const navItems = ["Home", "Search", "Messages", "Profile"];

  const renderNavItems = (navItems: any) => {
    return navItems.map((el: string) => {
      return (
        <a>
          <li key={el}>
            <img src={`/src/assets/img/${el}.png`} className="navIcons" />
            <p>{el}</p>
          </li>
        </a>
      );
    });
  };
  return (
    <>
      <nav>
        <div className="navLogo"></div>
        <ul>{renderNavItems(navItems)}</ul>
      </nav>
    </>
  );
}
export default Nav;
