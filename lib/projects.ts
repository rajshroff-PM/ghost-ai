/**
 * A project as rendered by the editor chrome.
 *
 * This is UI-facing shape only. Persistence and the Prisma model land with the
 * project API unit; until then the sidebar reads from the mock lists below.
 */
export interface Project {
  id: string;
  name: string;
  slug: string;
}

/** Projects the signed-in user owns — these expose rename and delete actions. */
export const MOCK_OWNED_PROJECTS: Project[] = [
  { id: "p_checkout", name: "Checkout Platform", slug: "checkout-platform" },
  { id: "p_ingest", name: "Event Ingest Pipeline", slug: "event-ingest-pipeline" },
  { id: "p_billing", name: "Billing Service", slug: "billing-service" },
];

/** Projects shared with the user as a collaborator — read-only, no actions. */
export const MOCK_SHARED_PROJECTS: Project[] = [
  { id: "p_search", name: "Search Rearchitecture", slug: "search-rearchitecture" },
  { id: "p_identity", name: "Identity Mesh", slug: "identity-mesh" },
];
