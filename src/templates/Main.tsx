import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactNode } from "react";

import { AppConfig } from "@/utils/AppConfig";

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const router = useRouter();

  return (
    <div className="w-full px-1 text-gray-700 antialiased">
      {props.meta}

      <div className="mx-auto max-w-screen-md">
        <div className="border-b border-gray-300">
          <div className="pb-8 pt-16">
            <div className="flex space-x-2">
              <div className="flex items-center justify-center">
                <img
                  className="h-4/6"
                  src={`${router.basePath}/icon.png`}
                  alt="Tuition Live Web Application"
                />
              </div>

              <div className="text-3xl font-bold text-gray-900">
                {/* uition Live */}
                {AppConfig.title}
              </div>
            </div>
            <div className="text-xl">{AppConfig.description}</div>
          </div>
          <div>
            <ul className="flex flex-wrap text-xl">
              <li className="mr-6">
                <Link
                  href="/"
                  className="border-none text-gray-700 hover:text-gray-900"
                >
                  Home
                </Link>
              </li>
              <li className="mr-6">
                <Link
                  href="/about/"
                  className="border-none text-gray-700 hover:text-gray-900"
                >
                  About
                </Link>
              </li>
              <li className="mr-6">
                <Link
                  href="/blog/"
                  className="border-none text-gray-700 hover:text-gray-900"
                >
                  Blog
                </Link>
              </li>
              <li className="mr-6">
                <Link
                  href="/studyroom/"
                  className="border-none text-gray-700 hover:text-gray-900"
                >
                  Slate Board
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="content py-5 text-xl">{props.children}</div>

        <div className="border-t border-gray-300 py-8 text-center text-sm">
          © Copyright {new Date().getFullYear()} {AppConfig.title}. Made with{" "}
          <a href="https://github.com/jemu51/tution-live-web">
            Tution Live Web
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export { Main };
