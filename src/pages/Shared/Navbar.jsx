import { useCallback, useContext, useState, useRef, useEffect } from "react";
import { BsBag } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import DropdownMenu from "../../component/DropDownMenu";
import { useSelector } from "react-redux";

const Navbar = () => {
  const userStore = useSelector((state) => state.user?.user);
  const products = useSelector((state) => state.myShop.products);
  const [toggleOpen, setToggleOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const shopLinkRef = useRef(null);
  const handleToggle = useCallback(() => {
    if (window.innerWidth > 1023) {
      return;
    }

    setToggleOpen(!toggleOpen);
    document.body.classList.toggle("lock-scroll");
  }, [toggleOpen]);

  const toggleDropdown = useCallback((event) => {
    if (window.innerWidth >= 1024) {
      setDropdownOpen((prevState) => !prevState);
    } else {
      setDropdownOpen((prevState) => !prevState);
      setToggleOpen(true);
    }
  }, []);

  useEffect(() => {
    const handleMouseEnter = () => {
      if (window.innerWidth >= 1024) {
        setDropdownOpen(true);
      }
    };

    const handleMouseLeave = () => {
      if (window.innerWidth >= 1024) {
        setDropdownOpen(false);
      }
    };

    const shopLink = shopLinkRef.current;
    shopLink.addEventListener("mouseenter", handleMouseEnter);
    shopLink.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      shopLink.removeEventListener("mouseenter", handleMouseEnter);
      shopLink.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <header className="w-full h-20 flex items-center justify-between text-white bg-black px-5 relative">
      <div className="logo">
        <Link to="/" className="text-2xl font-semibold logo">
          Mazzak Agro.
        </Link>
      </div>
      <nav
        onClick={handleToggle}
        className={`nav-links ${dropdownOpen ? "lg:relative" : ""}`}
      >
        <ul
          className={`${
            toggleOpen ? "flexColMod" : "hidden lg:flex gap-5 uppercase"
          }`}
        >
          <li>
            <Link to="/" className="linear-walkaways">
              Home
            </Link>
          </li>
          <li className="relative" ref={shopLinkRef}>
            <div className="flex items-center gap-2 cursor-pointer">
              <Link to="/products" className="linear-walkaways">
                Shop
              </Link>
              <span className="lg:hidden">
                {dropdownOpen ? (
                  <AiOutlineMinus
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown();
                    }}
                    className="text-xl"
                  />
                ) : (
                  <AiOutlinePlus
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown();
                    }}
                    className="text-xl"
                  />
                )}
              </span>
            </div>
            <div className="lg:absolute lg:top-full lg:left-0 lg:z-10">
              <DropdownMenu
                isOpen={dropdownOpen}
                toggleDropdown={toggleDropdown}
              />
            </div>
          </li>
          {userStore && userStore.role === "user" && (
            <li>
              <Link to="/orders" className="linear-walkaways">
                Orders
              </Link>
            </li>
          )}
          {userStore && userStore.role === "admin" && (
            <li>
              <Link to="/dashboard" className="linear-walkaways">
                Dashboard
              </Link>
            </li>
          )}

          <li>
            <Link to="/about" className="linear-walkaways">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="linear-walkaways">
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      <div className="nav-links-right flex gap-5">
        {!userStore ? (
          <Link to="/login" className="uppercase linear-walkaways">
            Sign in
          </Link>
        ) : (
          <Link to="/profile" className="uppercase linear-walkaways">
            Profile
          </Link>
        )}

        {userStore && userStore.role !== "admin" && (
          <Link to="/cart" className="relative">
            <span>
              <BsBag />
            </span>
            <span className="counting-bubble">{products.length}</span>
          </Link>
        )}

        <span className="z-[3]">
          <FiMenu
            onClick={handleToggle}
            className={`${
              !toggleOpen ? "block" : "hidden"
            } text-2xl lg:hidden cursor-pointer`}
          />
          <AiOutlineClose
            onClick={handleToggle}
            className={`${
              toggleOpen ? "block" : "hidden"
            } text-2xl lg:hidden cursor-pointer`}
          />
        </span>
      </div>
    </header>
  );
};

export default Navbar;
