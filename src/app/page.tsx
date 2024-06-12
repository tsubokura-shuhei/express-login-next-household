import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        maxWidth: "370px",
        margin: "0 auto",
        padding: "16px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", margin: "0 auto" }}>
        <img
          src="/ame.jpg"
          alt="ame"
          style={{
            backgroundColor: "blue",
            borderRadius: "9999px",
            width: "100%",
            maxWidth: "360px",
          }}
        />
      </div>
      <p style={{ textAlign: "center", fontSize: "14px" }}>
        このボタンを押してアプリを開始してください
      </p>
      <Link
        href="/calendar"
        style={{
          background: "#8bc34a",
          borderRadius: "9999px",
          textDecoration: "none",
          padding: "16px",
          color: "white",
          textAlign: "center",
        }}
      >
        アプリを開始する
      </Link>
    </div>
  );
};

export default page;
