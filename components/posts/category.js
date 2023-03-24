import Link from "next/link";
import Label from "@/components/ui/label";

export default function TagLabel({ tags }) {
  return (
    <div className="flex gap-3">
      {tags?.length &&
        tags.slice(0).map((tag, index) => (
          <Link href="#" key={index}>
            <Label color={tag.color}>{tag.name}</Label>
          </Link>
        ))}
    </div>
  );
}