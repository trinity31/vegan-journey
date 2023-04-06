import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import TagLabel from "@/components/posts/category";

export default function PostItem(props) {
  const {
    title,
    image,
    tags,
    excerpt,
    category,
    date,
    slug,
    ingredients,
    country,
  } = props.post;
  const { index } = props.index;

  return (
    <div className="flex flex-col mb-8 md:flex-col justify-center max-w-screen-xl mx-auto  cursor-pointer">
      <div className="flex-shrink-0 relative  ">
        <Link href={`/posts/${slug}`}>
          <Image
            src={image}
            alt={title}
            width="768"
            height="512"
            className="rounded-lg object-cover object-center  aspect-[6/4]"
          />
        </Link>
      </div>

      <div className={`mt-4 `}>
        <Link href={`/posts/${slug}`}>
          <div className="g:py-8 text-center sm:text-left md:text-left">
            <div class="uppercase text-blue-600/75 text-xs font-bold tracking-widest leading-loose">
              {category}
            </div>

            <div class="uppercase text-gray-600/75 text-xs font-bold tracking-widest leading-loose">
              {country}
            </div>

            <h2 className="font-display font-black text-secondary-500 tracking-wide text-center sm:text-left mt-4 lg:leading-tight md:text-left">
              {title}
            </h2>
            <div className="flex justify-center sm:justify-start mt-3 text-gray-500 ">
              <time
                className="text-gray-500 dark:text-gray-400"
                dateTime={date}
              >
                {format(parseISO(date), "MMMM dd, yyyy")}
              </time>
            </div>
            <p className="mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-200">
              {excerpt}
            </p>
            <div className="flex justify-left mt-3">
              <TagLabel tags={tags} color={"pink"} />
            </div>
            {ingredients.length > 0 && (
              <div className="flex justify-left mt-2">
                <TagLabel tags={ingredients} color={"green"} />
              </div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}
