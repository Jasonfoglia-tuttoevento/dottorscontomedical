"use server";

import { createCheckup, type CreateCheckupInput } from "@/lib/data/checkups";

const MAX_TEXT_LENGTH = 2_000;

function isValidInput(input: CreateCheckupInput): boolean {
  const required = [
    input.category,
    input.treatment,
    input.patient_name,
    input.patient_email,
    input.patient_phone,
  ];
  const optional = [input.city, input.notes];

  return (
    required.every(
      (value) => typeof value === "string" && value.trim().length > 0 && value.length <= MAX_TEXT_LENGTH,
    ) &&
    optional.every(
      (value) => value === null || (typeof value === "string" && value.length <= MAX_TEXT_LENGTH),
    )
  );
}

export async function submitCheckup(input: CreateCheckupInput) {
  if (!isValidInput(input)) {
    return { ok: false, error: "I dati inseriti non sono validi." } as const;
  }

  try {
    await createCheckup(input);
    return { ok: true } as const;
  } catch {
    return { ok: false, error: "Non è stato possibile inviare la richiesta." } as const;
  }
}
