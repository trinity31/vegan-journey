import { cx } from "@/utils/all";
import { color } from "@/utils/constants";

export default function Label(props) {
  return (
    <span
      className={cx(
        "inline-block text-xs font-medium tracking-wider uppercase ",
        color[props.color] || color.green
      )}
    >
      {props.children}
    </span>
  );
}
