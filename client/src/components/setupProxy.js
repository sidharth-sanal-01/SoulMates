const api =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8800"
    : "https://freshbookapi.herokuapp.com";
export {api};
