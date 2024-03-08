import React, { useEffect, useState } from "react";

export function ThemeModal({ closeModal }: { closeModal: () => void }) {
  const handleThemeChange = (cls: `${"yellow" | "blue" | "pink"}-theme`) => {
    document.body.className = cls;
    closeModal();
  };

  const [theme, setTheme] = useState<"pink-theme" | "blue-theme" | "yellow-theme">("pink-theme");

  useEffect(() => {
    const cls = document.querySelector("body")?.className;
    if (cls) {
      setTheme(cls as "pink-theme" | "blue-theme" | "yellow-theme");
    }
  }, []);

  return (
    <div
      className="fixed flex justify-center items-center inset-0  bg-[rgba(39, 39, 39, 0.5)] backdrop-blur-sm z-50"
      onClick={closeModal}
    >
      <div
        className="relative min-w-0 w-96 h-44 bg-gray-100 rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 z-0 h-full w-full bg-[url('/noise.png')] opacity-[0.06]"></div>
        <div className="absolute top-0 left-0  z-1 w-full h-full">
          <div className="w-full bg-white bg-opacity-60 px-4 py-2 text-2xl text-center font-semibold font-[ClashDisplay-Variable]">
            Choose Theme
          </div>
          <div className="w-full px-2 py-8 flex justify-center gap-4 [&>button]:h-14 [&>button]:w-14">
            <button
              onClick={() => handleThemeChange("pink-theme")}
              className={`rounded-full  bg-[#E85382] p-1 ${
                theme === "pink-theme"
                  ? "outline-1 outline outline-[#868686] border-[4px] border-white"
                  : ""
              }`}
            ></button>
            <button
              onClick={() => handleThemeChange("blue-theme")}
              className={`rounded-full bg-[#39BADF] p-1 ${
                theme === "blue-theme"
                  ? "outline-1 outline outline-[#868686] border-[4px] border-white"
                  : ""
              }`}
            ></button>
            <button
              onClick={() => handleThemeChange("yellow-theme")}
              className={`rounded-full bg-[#E1A725] p-1 ${
                theme === "yellow-theme"
                  ? "outline-1 outline outline-[#868686] border-[4px] border-white"
                  : ""
              }`}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
}
