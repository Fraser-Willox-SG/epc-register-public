type GreenDealHeaderProps = {
  assessmentId: string;
};

export default function GreenDealHeader({
  assessmentId,
}: GreenDealHeaderProps) {
  return (
    <>
      <div className="bg-dark-green">
        <div className="cert-section print-no-break row-2col  ">
          <h3 id="green-deal-title">
            Information about the Green Deal plan relating to this property
          </h3>

          <p>
            <strong className="display-block text-right">
              Energy Performance Certificate:
            </strong>
            <span className="display-block text-right">{assessmentId}</span>
          </p>
        </div>
      </div>
    </>
  );
}
