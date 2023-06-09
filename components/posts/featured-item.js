import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default function FeatureItem({ post, index }) {
  const { title, image, excerpt, category, date, slug } = post;

  return (
    <div className="flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto pb-20 md:pb-24 items-center cursor-pointer">
      <div className="md:w-6/12 flex-shrink-0 relative ">
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

      <div
        className={`md:w-6/12 mt-8 md:mt-0 ${
          index % 2 === 0
            ? `md:ml-12 lg:ml-16 md:order-last`
            : `md:mr-12 lg:mr-16 md:order-first`
        }`}
      >
        <Link href={`/posts/${slug}`}>
          <div className="g:py-8 text-center sm:text-left">
            <div className="uppercase text-blue-600/75 text-xs font-bold tracking-widest leading-loose">
              {category}
            </div>
            <h2 className="font-display text-l font-black text-secondary-500 md:text-2xl lg:text-3xl tracking-wide text-center sm:text-left mt-4 lg:leading-tight md:text-left">
              {title}
            </h2>
            <div className="flex justify-center sm:justify-start mt-3  text-gray-500 ">
              <div className="flex items-center sm:items-start gap-3">
                <time
                  className="text-gray-500 dark:text-gray-400"
                  dateTime={date}
                >
                  {format(parseISO(date), "MMMM dd, yyyy")}
                </time>
              </div>
            </div>
            <p className="mt-4 text-center sm:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-200">
              {excerpt}
            </p>
            <Link href={`/posts/${slug}`}>
              <div className="mt-4 inline-block px-6 py-2 text-sm font-medium leading-5 transition-colors duration-150 bg-white-500 border border-vegreen rounded-lg hover:text-white hover:bg-vegreen focus:outline-none focus:shadow-outline-green active:bg-vegreen">
                Read more
              </div>
            </Link>
          </div>
        </Link>
      </div>
    </div>
  );
}
