import { useState } from "react";

const NotFound = () => {
  const [throwError, setThrowError] = useState(false);
  if (throwError) throw Error("Error occured in the application");

  return (
    <div>
      <button onClick={() => setThrowError(true)}>Click Me</button>
      <br />
    </div>
  );
};

export default NotFound;
