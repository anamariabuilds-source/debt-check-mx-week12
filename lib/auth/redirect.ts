export function safeInternalPath(value: string | null | undefined, fallback = "/product"): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\") || /[\u0000-\u001f]/.test(value)) return fallback;
  try {
    const parsed = new URL(value, "https://debt-check.invalid");
    if (parsed.origin !== "https://debt-check.invalid") return fallback;
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return fallback;
  }
}

export function internalRedirect(origin: string, path: string, status?: string): URL {
  const target = new URL(safeInternalPath(path), origin);
  if (status) target.searchParams.set("auth", status);
  return target;
}
