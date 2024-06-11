import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <p>HOMEページ</p>
      <Link href="/calendar">アプリを使用する</Link>
    </div>
  );
};

export default page;
