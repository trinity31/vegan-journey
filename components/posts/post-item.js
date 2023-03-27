import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default function PostItem(props) {
  const { title, image, excerpt, category, date, slug, id } = props.post;
  const { index } = props.index;

  return (
    <div className="flex flex-col mb-8 md:flex-col justify-center max-w-screen-xl mx-auto md:items-left cursor-pointer">
      <div className="flex-shrink-0 relative ">
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

      <div className={`mt-4  md:order-last`}>
        <Link href={`/posts/${slug}`}>
          <div className="g:py-8 text-center md:text-left">
            <div class="uppercase text-blue-600/75 text-xs font-bold tracking-widest leading-loose">
              {category}
            </div>
            <h2 className="font-display text-xl font-black text-secondary-500 md:text-3xl lg:text-5xl tracking-wide text-center mt-4 lg:leading-tight md:text-left">
              {title}
            </h2>
            <div className="flex mt-3 text-gray-500 ">
              <time
                className="text-gray-500 dark:text-gray-400"
                dateTime={date}
              >
                {format(parseISO(date), "MMMM dd, yyyy")}
              </time>
            </div>
            {/* <p className="mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-200">
              {excerpt}
            </p> */}
          </div>
        </Link>
      </div>
    </div>
  );
}
