// src/app/emlak/[documentId]/page.tsx

import { notFound } from "next/navigation";
import { getEmlakDetayByDocumentId } from "@/lib/api";
import EmlakDetayClient from "./EmlakDetayClient";

export default async function Page({ params }: { params: any | Promise<any> }) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const emlak = await getEmlakDetayByDocumentId(resolvedParams.documentId);

  if (!emlak) {
    return notFound();
  }

  return <EmlakDetayClient emlak={emlak} />;
}
