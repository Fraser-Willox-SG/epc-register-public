import type {
  SgGreenDealCharge,
  SgGreenDealChargeUplift,
  SgGreenDealInterest,
  SgGreenDealPlan,
  SgGreenDealProviderDetails,
} from "@/types/sg-epc-green-deal";

export function formatGreenDealInterest(
  interest: SgGreenDealInterest | null,
): string | null {
  if (!interest) return null;

  const rate = interest.rate?.trim();

  if (!rate) return null;

  if (interest.fixed === true) {
    return `Fixed at ${rate}% APR`;
  }

  if (interest.fixed === false) {
    return `Variable rate, currently ${rate}% APR`;
  }

  return `${rate}% APR`;
}

export function getCurrentGreenDealCharge(
  plan: SgGreenDealPlan,
): SgGreenDealCharge | null {
  return plan.charges.at(-1) ?? null;
}

export function hasGreenDealProviderDetails(
  provider: SgGreenDealProviderDetails | null,
): boolean {
  return Boolean(
    provider?.name?.trim() ||
    provider?.telephone?.trim() ||
    provider?.email?.trim(),
  );
}

export function hasGreenDealChargeUplift(
  uplift: SgGreenDealChargeUplift | null,
): boolean {
  if (!uplift) return false;

  const amount = Number(uplift.amount);

  return Number.isFinite(amount) && amount !== 0 && Boolean(uplift.date);
}
