import { useEffect } from "react";

import "./App.css";
import { setUpAtlasInterceptor } from "./utils/api.http";
import { Bottles } from "./modules/bottles/Bottles";

function WinergyApp() {
  useEffect(() => {
    setUpAtlasInterceptor();
  }, []);

  return (
    <div>
      <Bottles />
    </div>
  );
}

export default WinergyApp;
