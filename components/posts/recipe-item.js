import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import TagLabel from "@/components/posts/category";

export default function RecipeItem(props) {
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
  //const { index } = props.index;

  return (
    <div className="flex flex-col sm:w-5/7 mb-8 md:flex-col justify-start max-w-screen-xl mx-auto  cursor-pointer">
      <div className="flex-shrink-0 relative  ">
        <Link href={`/posts/${slug}`}>
          <Image
            src={image}
            alt={title}
            width="800"
            height="600"
            className="rounded-lg object-cover object-center  aspect-[6/4] sm:aspect-[6/6]"
          />
        </Link>
      </div>

      <div className={`mt-4 `}>
        <div className="g:py-8 text-center sm:text-left md:text-left">
          <div className="uppercase text-blue-600/75 text-sm font-bold tracking-widest leading-loose">
            {category}
          </div>

          {/* <Link href={`/recipe/${country}`}> */}
          <div className="uppercase text-gray-600/75 text-sm font-bold tracking-widest leading-loose">
            {country}
          </div>
          {/* </Link> */}

          <Link href={`/posts/${slug}`}>
            <h2 className="font-display font-black text-secondary-500 tracking-wide text-center sm:text-left mt-4 lg:leading-tight md:text-left">
              {title}
            </h2>

            <p className="mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-200">
              {excerpt}
            </p>
          </Link>
          <div className="flex justify-left mt-3">
            <TagLabel tags={tags} color={"pink"} />
          </div>
          {ingredients.length > 0 && (
            <div className="flex justify-left mt-2 flex-wrap">
              <TagLabel tags={ingredients} color={"green"} />
            </div>
          )}
          <div className="flex justify-center sm:justify-start mt-3 text-gray-500 invisible sm:visible">
            <time
              className="text-gray-500 dark:text-gray-400 text-xs"
              dateTime={date}
            >
              {format(parseISO(date), "MMMM dd, yyyy")}
            </time>
          </div>
        </div>
      </div>
    </div>
  );
}
