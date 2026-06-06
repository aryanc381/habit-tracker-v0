// Converts an ISO date string (e.g. "2026-06-04T00:00:00.000Z") to a
// readable form (e.g. "4 Jun 2026"). Returns "—" for missing/invalid input.
export function formatDate(iso?: string | null): string {
    if (!iso) return "—";
    const date = new Date(iso);
    if (isNaN(date.getTime())) return "—";
    return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}
