"use client";
import React, { useState } from "react";

// cooking page
function CookingPage() {
  const [openTab, setOpenTab] = useState(1);
  return (
    <>
      <div className="container p-10 mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full">
            <ul
              className="flex mb-0 list-none flex-wrap pt-3 gap-3 pb-4 flex-row"
              role="tablist"
            >
              <li className="-mb-px flex-auto text-center">
                <a
                  className={
                    "text-md font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-white  " +
                    (openTab === 1 ? " bg-gray-900" : " bg-gray-800")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  Vanya
                </a>
              </li>
              <li className="-mb-px flex-auto text-center">
                <a
                  className={
                    "text-md font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-white  " +
                    (openTab === 2 ? " bg-gray-900" : " bg-gray-800")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  Dalmally
                </a>
              </li>
              <li className="-mb-px flex-auto text-center">
                <a
                  className={
                    "text-md font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-white  " +
                    (openTab === 3 ? " bg-gray-900" : " bg-gray-800")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(3);
                  }}
                  data-toggle="tab"
                  href="#link3"
                  role="tablist"
                >
                  Post Town Tala
                </a>
              </li>
              <li className="-mb-px flex-auto text-center">
                <a
                  className={
                    "text-md font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-white  " +
                    (openTab === 4 ? " bg-gray-900" : " bg-gray-800")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(4);
                  }}
                  data-toggle="tab"
                  href="#link4"
                  role="tablist"
                >
                  Vaizel
                </a>
              </li>
              <li className="-mb-px flex-auto text-center">
                <a
                  className={
                    "text-md font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-white  " +
                    (openTab === 5 ? " bg-gray-900" : " bg-gray-800")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(5);
                  }}
                  data-toggle="tab"
                  href="#link5"
                  role="tablist"
                >
                  Ordan Village
                </a>
              </li>
              <li className="-mb-px flex-auto text-center">
                <a
                  className={
                    "text-md font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-white  " +
                    (openTab === 6 ? " bg-gray-900" : " bg-gray-800")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(6);
                  }}
                  data-toggle="tab"
                  href="#link6"
                  role="tablist"
                >
                  Liones Castle
                </a>
              </li>
            </ul>
            <div className="relative flex flex-col min-w-0 break-words bg-gray-900 w-full mb-6 shadow-lg rounded">
              <div className="px-4 py-5 flex-auto">
                <div className="tab-content tab-space">
                  <div
                    className={openTab === 1 ? "block" : "hidden"}
                    id="link1"
                  >
                    <p>
                      Collaboratively administrate empowered markets via
                      plug-and-play networks. Dynamically procrastinate B2C
                      users after installed base benefits.
                      <br />
                      <br /> Dramatically visualize customer directed
                      convergence without revolutionary ROI.
                    </p>
                  </div>
                  <div
                    className={openTab === 2 ? "block" : "hidden"}
                    id="link2"
                  >
                    <p>
                      Completely synergize resource taxing relationships via
                      premier niche markets. Professionally cultivate one-to-one
                      customer service with robust ideas.
                      <br />
                      <br />
                      Dynamically innovate resource-leveling customer service
                      for state of the art customer service.
                    </p>
                  </div>
                  <div
                    className={openTab === 3 ? "block" : "hidden"}
                    id="link3"
                  >
                    <p>
                      Efficiently unleash cross-media information without
                      cross-media value. Quickly maximize timely deliverables
                      for real-time schemas.
                      <br />
                      <br /> Dramatically maintain clicks-and-mortar solutions
                      without functional solutions.
                    </p>
                  </div>
                  <div
                    className={openTab === 4 ? "block" : "hidden"}
                    id="link4"
                  >
                    <p>
                      Efficiently unleash cross-media information without
                      cross-media value. Quickly maximize timely deliverables
                      for real-time schemas.
                      <br />
                      <br /> Dramatically maintain clicks-and-mortar solutions
                      without functional solutions.
                    </p>
                  </div>
                  <div
                    className={openTab === 5 ? "block" : "hidden"}
                    id="link5"
                  >
                    <p>
                      Efficiently unleash cross-media information without
                      cross-media value. Quickly maximize timely deliverables
                      for real-time schemas.
                      <br />
                      <br /> Dramatically maintain clicks-and-mortar solutions
                      without functional solutions.
                    </p>
                  </div>
                  <div
                    className={openTab === 6 ? "block" : "hidden"}
                    id="link6"
                  >
                    <p>
                      Efficiently unleash cross-media information without
                      cross-media value. Quickly maximize timely deliverables
                      for real-time schemas.
                      <br />
                      <br /> Dramatically maintain clicks-and-mortar solutions
                      without functional solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CookingPage;
