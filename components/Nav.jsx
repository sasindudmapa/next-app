"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  signIn,
  SignOut,
  useSession,
  getProviders,
  signOut,
} from "next-auth/react";

const Nav = () => {
  const isUserLoggedIn = true;
  // provider ex: Google Auth
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, settoggleDropDown] = useState(false);

  useEffect(() => {
    const setProviders = async () => {
      const res = await getProviders();

      setProviders(res);
    };

    setProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-post" className="black_btn">
              Create Post
            </Link>

            <button className="outline_btn" type="button" onClick={signOut}>
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src="/assets/images/logo.svg"
                width={37}
                height={37}
                alt="profile"
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                ></button>;
              })}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            <Image
              src="/assets/images/logo.svg"
              width={37}
              height={37}
              alt="profile"
              className="rounded-full"
              onClick={() =>
                settoggleDropDown((prev) => {
                  !prev;
                })
              }
            />

            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  className="dropdown_link"
                  href="/profile"
                  onClick={() => settoggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  className="dropdown_link"
                  href="/create-prompt"
                  onClick={() => settoggleDropDown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    settoggleDropDown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                ></button>;
              })}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
