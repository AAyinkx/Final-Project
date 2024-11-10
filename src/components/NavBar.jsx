import Link from "next/link";

export default function NavBar() {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/quiz-categories">Quiz categories</Link>
              </li>
              <li>
                <details>
                  <summary>
                    <Link href="/profile">Profile</Link>
                  </summary>

                  <ul className="p-2">
                    <li>
                      <Link href="/profile/add-new-post">Add new post</Link>
                    </li>
                    <li>

                      <Link href="/profile/liked-posts">Liked Posts</Link>
                     </li>

                      <li>
                      <Link href="/profile/update-profile">Update profile</Link>

                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <Link href="/challenge">Challenge</Link>
              </li>
              <li>
                <Link href="/code">Code</Link>
              </li>
              <li>
                <Link href="/community">Community</Link>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Mind Match</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/quiz-categories">Quiz categories</Link>
            </li>
            <li>
              <details>
                <summary>
                  <Link href="/profile">Profile</Link>
                </summary>

                <ul className="p-2 ">
                  <li>
                    <Link href="/profile/add-new-post">Add new post</Link>
                  </li>
                  <li>

                    <Link href="/profile/liked-posts">Liked Posts</Link>
                  </li>

                      <li>
                    <Link href="/profile/update-profile">Update profile</Link>

                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link href="/challenge">Challenge</Link>
            </li>
            <li>
              <Link href="/code">Code</Link>
            </li>
            <li>
              <Link href="/community">Community</Link>
            </li>
          </ul>
        </div>
        {/* <div className="navbar-end">
          <a className="btn">Button</a>
        </div> */}
      </div>
    </>
  );
}
