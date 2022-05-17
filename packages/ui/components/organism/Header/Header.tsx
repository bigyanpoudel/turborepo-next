import Link from "next/link";
export const Header = () => {
  const navItems = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Cart",
      url: "/cart",
    },
    {
      title: "Login",
      url: "/login",
    },
  ];
  return (
    <div className="py-4 bg-base-100 shadow-200 container row-flex justify-between items-center sticky top-0">
      <div>Logo</div>
      <div className="font-semibold text-lg row-flex">
        {navItems.map((el, index) => (
          <Link href={el.url} key={index}>
            <div className="mr-5 cursor-pointer hover:text-primary nav-item">
              {el.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
