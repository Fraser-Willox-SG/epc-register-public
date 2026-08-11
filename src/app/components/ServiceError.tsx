import Link from "next/link";

type Props = {
  title?: string;
  message?: string;

  /** Optional reference / digest for future support/debug functionality */
  reference?: string;

  /** Optional secondary detail for development */
  detail?: string;

  backLinkHref?: string;
  backLinkText?: string;
};

export default function ServiceError({
  title = "We can’t display this page right now",
  message = "There’s a problem loading this page. Try again later.",
  detail,
  backLinkHref = "/",
  backLinkText = "Back to home page",
}: Props) {
  return (
    <div className="ds_wrapper">
      <h1 className="ds_h1">{title}</h1>

      <p className="ds_lede">{message}</p>

      {detail ? <pre style={{ whiteSpace: "pre-wrap" }}>{detail}</pre> : null}

      <p>
        If you continue to have problems,{" "}
        <a href="mailto:epcenquiries@gov.scot" className="ds_link">
          email our team
        </a>
        .
      </p>

      <p className="ds_mt-4">
        <Link className="ds_link" href={backLinkHref}>
          {backLinkText}
        </Link>
      </p>
    </div>
  );
}
