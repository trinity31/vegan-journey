import Link from "next/link";
import Label from "@/components/ui/label";

export default function TagLabel({ tags, color }) {
  // const handleClick = async (tag) => {
  //   try {
  //     // const response = await fetch("your-api-url");
  //     // const data = await response.json();
  //     console.log("tag clicked:", tag);
  //     // do something with the response data
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="flex gap-3">
      {tags?.length &&
        tags.slice(0).map((tag, index) => (
          <Link href={`/search/${tag.name}`} key={index}>
            <Label
              color={color ? color : tag.color}
              // onClick={() => handleClick(tag.name)}
              key={index}
            >
              {tag.name}
            </Label>
          </Link>
        ))}
    </div>
  );
}
