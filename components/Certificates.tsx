import { getContent } from "@/content";
import { CertificateGallery } from "./CertificateGallery";
import { Section } from "./Section";

export async function Certificates() {
  const { certificates } = await getContent();

  return (
    <Section id="sertifikat" index="04" title={certificates.title}>
      <CertificateGallery certificates={certificates} />
    </Section>
  );
}
