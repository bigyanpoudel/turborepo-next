import Link from "next/link";
import { useContext } from "react";
import { AuthContext, firebase, firestore, Modal } from "ui";
import { useRouter } from "next/router";
import { CreateProduct } from "../../molecules";

export const Header = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const { user, authenticated, claims } = useContext(AuthContext);

  const router = useRouter();

  const logout = async () => {
    await firebase.auth().signOut();
    router.push("/login");
  };

  const openCreateModal = () => {
    Modal.open({
      component: CreateProduct,
    });
  };

  return (
    <div className="py-4 bg-base-100 shadow-200  px-10 row-flex justify-between items-center sticky top-0 z-10">
      <div>Logo</div>
      <div className="font-semibold text-lg row-flex">
        <Link href="/">
          <div className="mr-5 cursor-pointer hover:text-primary nav-item">
            Home
          </div>
        </Link>

        {authenticated !== null && isAuthenticated && user && claims?.isAdmin && (
          <>
            <div
              className="mr-5 cursor-pointer hover:text-primary nav-item"
              onClick={openCreateModal}
            >
              Create
            </div>
            <Link href="/profile">
              <div className="mr-5 cursor-pointer hover:text-primary nav-item">
                Profile
              </div>
            </Link>
            <div
              className="mr-5 cursor-pointer hover:text-primary nav-item"
              onClick={logout}
            >
              Logout
            </div>
          </>
        )}
      </div>
    </div>
  );
};
