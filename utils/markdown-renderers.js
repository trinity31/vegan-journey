export const renderers = {
  h1: ({ children }) => (
    <>
      {/* <br /> */}
      <h1 className="text-3xl font-bold my-4">{children}</h1>
    </>
  ),
  h2: ({ children }) => (
    <>
      <br />
      <h2 className="font-semibold mt-2 py-2">{children}</h2>
    </>
  ),
  h3: ({ children }) => (
    <div>
      {/* <br /> */}
      <h3 class="text-lg my-2">{children}</h3>
    </div>
  ),
  img: ({ src, alt }) => (
    <div className="py-2">
      <img src={src} alt={alt} />
    </div>
  ),
  p: ({ children }) => <p className=" py-2">{children}</p>,
  ul: ({ children }) => (
    <div className="p-4 py-2">
      <ul className="list-disc list-inside !important">{children}</ul>
    </div>
  ),
  li: ({ children }) => (
    <li className="list-item text-base my-2">{children}</li>
  ),

  blockquote: ({ children }) => (
    <blockquote className="bg-gray-100 border-l-4 border-gray-400 italic pl-4 py-2 my-4">
      {children}
    </blockquote>
  ),
};
