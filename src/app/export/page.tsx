const fileName = "jsonファイル";
const jsonData = { a: 1, b: 2 };
const fileNameWithJson = `${fileName}.json`;
const blobData = new Blob([JSON.stringify(jsonData)], {
  type: "text/json",
});
const jsonURL = URL.createObjectURL(blobData);
const ExportPage = () => {
  return (
    // <a href={jsonURL} download={fileNameWithJson}>
    //   エクスポート
    // </a>
    <div>エクスポート（NextComing...）</div>
  );
};

export default ExportPage;
