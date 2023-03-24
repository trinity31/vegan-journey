import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default function FeatureItem(props) {
  const { title, image, excerpt, category, date, slug, id } = props.post;
  const { index } = props.index;

  return (
    <div className="flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24 items-center cursor-pointer">
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
        className={`md:w-6/12 mt-16 md:mt-0 ${
          index % 2 === 0
            ? `md:ml-12 lg:ml-16 md:order-last`
            : `md:mr-12 lg:mr-16 md:order-first`
        }`}
      >
        <Link href={`/posts/${slug}`}>
          <div className="g:py-8 text-center md:text-left">
            <div class="uppercase text-blue-600/75 text-xs font-bold tracking-widest leading-loose">
              {category}
            </div>
            <h2 className="font-display text-xl font-black text-secondary-500 md:text-3xl lg:text-5xl tracking-wide text-center mt-4 lg:leading-tight md:text-left">
              {title}
            </h2>
            <div className="flex justify-left mt-3 space-x-3 text-gray-500 ">
              <div className="flex items-center gap-3">
                <time
                  className="text-gray-500 dark:text-gray-400"
                  dateTime={date}
                >
                  {format(parseISO(date), "MMMM dd, yyyy")}
                </time>
                {/* <span>· {post.estReadingTime || "5"} min read</span> */}
              </div>
            </div>
            <p className="mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-200">
              {excerpt}
            </p>
            {/* {fields.primaryButton &&
            generateLink(
              fields.primaryButton.href,
              fields.primaryButton.target,
              fields.primaryButton.text
            )} */}
          </div>
        </Link>
      </div>
    </div>
  );
}
