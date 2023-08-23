import Image from "next/image";
import React from "react";

const Avartar = () => {
  let storedData;
  if (typeof window !== "undefined") {
    storedData = sessionStorage.getItem("layout");
  }
  return (
    <>
      {storedData === "user" ? (
        <Image src={"/avatar.jpg"} width={50} height={50} alt="Avatar" />
      ) : (
        <Image src={"/avata_company.jpg"} width={50} height={50} alt="Avatar" />
      )}
    </>
  );
};

export default Avartar;
