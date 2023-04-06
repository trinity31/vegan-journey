import Link from "next/link";
import Container from "../container";
import Logo from "./logo";
import { Disclosure } from "@headlessui/react";

function MainNavigation() {
  const menu = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Journey",
      href: "/journey",
    },
    {
      label: "Recipe",
      href: "/recipe",
    },
    {
      label: "Search",
      href: "/search",
    },
  ];
  const devMenu = [
    {
      //process.env.NODE_ENV === "development"
      label: "Create",
      href: "/create",
    },
    {
      label: "Manage",
      href: "/manage",
    },
  ];

  return (
    <Container>
      <nav>
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap justify-between md:gap-10 md:flex-nowrap">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <Link href="/">
                    <Logo />
                  </Link>
                  <Disclosure.Button
                    aria-label="Toggle Menu"
                    className="px-2 py-1 ml-auto text-gray-500 rounded-md md:hidden focus:text-blue-500 focus:outline-none dark:text-gray-300 "
                  >
                    <svg
                      className="w-6 h-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      {open && (
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                        />
                      )}
                      {!open && (
                        <path
                          fillRule="evenodd"
                          d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                        />
                      )}
                    </svg>
                  </Disclosure.Button>
                </div>

                <div className="flex-col items-center justify-end order-2 hidden w-full md:flex md:flex-row md:w-auto md:flex-1 md:order-none">
                  {menu.map((item, index) => (
                    <Link legacyBehavior href={item.href} key={index}>
                      <a
                        className="px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500"
                        target={item.external ? "_blank" : ""}
                        rel={item.external ? "noopener" : ""}
                      >
                        <span> {item.label}</span>
                      </a>
                    </Link>
                  ))}
                  {process.env.NODE_ENV === "development" &&
                    devMenu.map((item, index) => (
                      <Link legacyBehavior href={item.href} key={index}>
                        <a
                          className="px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500"
                          target={item.external ? "_blank" : ""}
                          rel={item.external ? "noopener" : ""}
                        >
                          <span> {item.label}</span>
                        </a>
                      </Link>
                    ))}
                </div>
              </div>
              <Disclosure.Panel>
                <div className="flex flex-col items-center justify-start order-2 w-full md:hidden">
                  {menu.map((item, index) => (
                    <Link legacyBehavior href={item.href} key={index}>
                      <a
                        className="px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500"
                        target={item.external ? "_blank" : ""}
                        rel={item.external ? "noopener" : ""}
                      >
                        {item.label}
                      </a>
                    </Link>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </nav>
    </Container>
  );
}

export default MainNavigation;
