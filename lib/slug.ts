/**
 * Converts a project name into a URL-safe slug.
 *
 * Diacritics are folded to their base letters, any run of non-alphanumeric
 * characters collapses to a single hyphen, and leading/trailing hyphens are
 * trimmed.
 *
 * @param name - The raw project name typed by the user
 * @returns The slug derived from the name, or an empty string when the name
 *   contains no slug-able characters
 */
export function toSlug(name: string): string {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
