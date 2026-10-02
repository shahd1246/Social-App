import React from "react";
import { Oval } from "react-loader-spinner";

export default function Loading() {
  return (
    <div>
      <div className="h-screen flex justify-center items-center">
        <Oval
          height="50"
          width="50"
          color="#1143cd"
          secondaryColor="#1445cb80"
        />
      </div>
    </div>
  );
}
