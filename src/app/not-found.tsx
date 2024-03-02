"use client";
import Error from "next/error";
import React from "react";

function NotFound() {
  return (
    <html>
      <body>
        <Error statusCode={404} />
      </body>
    </html>
  );
}

export default NotFound;
