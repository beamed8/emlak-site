import { notFound } from "next/navigation";
import { getEmlakDetayByDocumentId } from "@/lib/api";
import EmlakDetayClient from "./EmlakDetayClient";

// Next.js expects this exact signature with 'params' being sync and plain object
export default async function Page({
  params,
}: {
  params: { documentId: string };
}) {
  const emlak = await getEmlakDetayByDocumentId(params.documentId);
  if (!emlak) return notFound();

  return <EmlakDetayClient emlak={emlak} />;
}
