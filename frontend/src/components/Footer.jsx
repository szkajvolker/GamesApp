import { useState } from "react";
import Feedback from "./Feedback";

const Footer = () => {
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [show, setShow] = useState(false);

  return (
    <footer className="flex dark:bg-gray-900 bg-white border-t-2 border-white/40 w-full p-2 mt-5 px-5">
      <div className="w-full mx-auto sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col gap-8">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <h3 className="lg:text-3xl text-2xl bg-white/50 dark:text-white bg-linear-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent font-bold mb-4">
                GameStore.
              </h3>
              <p className="text-gray-900 dark:text-white mb-4 max-w-md">
                {" "}
                Your{" "}
                <span className="font-bold bg-linear-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                  ultimate
                </span>{" "}
                destination for the latest and greatest games.{" "}
                <span className="font-bold bg-linear-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                  {" "}
                  Discover, play, and enjoy{" "}
                </span>
                thousands of titles.
              </p>
            </div>
            <div className="flex flex-col justify-between">
              <p className="text-gray-900 dark:text-white">
                Vectors and icons by{" "}
                <a
                  href="https://www.svgrepo.com"
                  target="_blank"
                  className="bg-linear-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent font-semibold"
                >
                  SVG Repo
                </a>
              </p>

              <button
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
                onClick={() => setIsFeedbackModalOpen(true)}
                className="group w-fit bg-linear-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden"
              >
                <div className="flex items-center gap-2 px-2 py-2 cursor-pointer">
                  <span className="text-lg">💬</span>
                  <span
                    className={`whitespace-nowrap font-bold transition-all duration-500 ease-in-out overflow-hidden ${
                      show ? "max-w-50 opacity-100" : "max-w-0 opacity-0"
                    }`}
                  >
                    Feedback / Bug Report
                  </span>
                </div>
              </button>
            </div>
          </div>
          <div className="border-t border-gray-900  dark:border-white mt-2 pt-2 text-center">
            <p className="text-gray-900 dark:text-white font-bold">
              © {new Date().getFullYear()} GameStore. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {isFeedbackModalOpen && (
        <Feedback onClose={() => setIsFeedbackModalOpen(false)} />
      )}
    </footer>
  );
};

export default Footer;
