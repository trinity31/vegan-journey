import Image from "next/image";
import Link from "next/link";

export default function FeatureItem(props) {
  const { title, image, excerpt, date, slug, id } = props.post;
  const { index } = props.index;

  return (
    <div className="flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24 items-center">
      <div className="md:w-6/12 flex-shrink-0 relative ">
        <Image
          src={image}
          alt={title}
          width="768"
          height="512"
          className="rounded-lg object-cover object-center cursor-pointer aspect-[6/4]"
        />
      </div>
      <div
        className={`md:w-6/12 mt-16 md:mt-0 ${
          index % 2 === 0
            ? `md:ml-12 lg:ml-16 md:order-last`
            : `md:mr-12 lg:mr-16 md:order-first`
        }`}
      >
        <div className="g:py-8 text-center md:text-left">
          {/* {fields.tagline && (
            <span className="font-bold text-primary-500 text-sm text-center md:text-left uppercase">
              {fields.tagline}
            </span>
          )} */}
          <h2 className="font-display text-xl font-black text-secondary-500 md:text-3xl lg:text-5xl tracking-wide text-center mt-4 lg:leading-tight md:text-left">
            {title}
          </h2>
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
      </div>
    </div>
  );
}
