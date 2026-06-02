import PhaseBanner from "@scottish-government/designsystem-react/dist/components/PhaseBanner/PhaseBanner";

export default function AppPhaseBanner() {
  return (
    <PhaseBanner phaseName="Beta">
      This is a new service. Please{" "}
      <a href="mailto:epcenquiries@gov.scot" className="ds_link">
        e-mail our team
      </a>{" "}
      with any feedback to help us improve it.
    </PhaseBanner>
  );
}
