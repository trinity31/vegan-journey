import Image from "next/image";
import Link from "next/link";

function Banner({ src, alt, href }) {
  const handleClick = (e) => {
    // Prevent the link from opening in the current tab
    e.preventDefault();
    // Open the link in a new tab
    window.open(href, "_blank");
    // Do something when the banner is clicked
    console.log("Banner clicked!");
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      <Link href={href} passHref>
        <Image src={src} alt={alt} width={300} height={100} />
      </Link>
    </div>
  );
}

export default Banner;
