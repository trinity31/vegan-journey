import { cx } from "@/utils/all";
// import { color } from "@/utils/constants";

export default function Label(props) {
  const color = {
    green: "text-emerald-700",
    blue: "text-blue-600",
    orange: "text-orange-700",
    purple: "text-purple-600",
    pink: "text-pink-600",
    gray: "text-gray-700",
    red: "text-red-600",
    yellow: "text-yellow-600",
  };

  return (
    <span
      className={cx(
        "inline-block text-xs font-medium tracking-wider uppercase",
        color[props.color] || color.gray
      )}
    >
      {props.children}
    </span>
  );
}
