import type { RecommendationCopy } from "@/types/epc-dom-rdsap";

export const RECOMMENDATION_COPY: Record<string, RecommendationCopy> = {
  floor_insulation_suspended: {
    key: "floor_insulation_suspended",
    title: "Floor insulation (suspended floor)",
    body: [
      "Insulation of a floor will significantly reduce heat loss; this will improve levels of comfort, reduce energy use and lower fuel bills.",
      "Suspended floors can often be insulated from below but must have adequate ventilation to prevent dampness; seek advice about this if unsure.",
      "Building regulations generally apply to this work and a building warrant may be required, so it is best to check with your local authority building standards department.",
    ],
    links: [
      {
        label: "Energy Saving Trust advice",
        href: "https://www.energysavingtrust.org.uk/",
      },
    ],
  },

  condensing_boiler: {
    key: "condensing_boiler",
    title: "Condensing boiler",
    body: [
      "A condensing boiler is capable of much higher efficiencies than other types of boiler, meaning it will burn less fuel to heat this property.",
      "This improvement is most appropriate when the existing central heating boiler needs repair or replacement, however there may be exceptional circumstances making this impractical.",
      "Building regulations generally apply to this work and a building warrant may be required, so it is best to check with your local authority building standards department and seek advice from a qualified heating engineer.",
    ],
  },

  solar_pv: {
    key: "solar_pv",
    title: "Solar photovoltaic (PV) panels",
    body: [
      "A solar PV system is one which converts light directly into electricity via panels placed on the roof with no waste and no emissions.",
      "This electricity is used throughout the home in the same way as the electricity purchased from an energy supplier.",
      "Planning restrictions may apply in certain neighbourhoods and building regulations may apply to this work, so it is best to obtain advice from your local authority.",
    ],
  },
};
