import classes from "./logo.module.css";
import Image from "next/image";

function Logo() {
  return (
    <div className={classes.logo}>
      <Image src={"/images/logo.png"} alt={"logo"} width={100} height={100} />
    </div>
  );
}

export default Logo;
