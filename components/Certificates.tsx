import { content } from "@/content";
import { CertificateGallery } from "./CertificateGallery";
import { Section } from "./Section";

export function Certificates() {
  const { certificates } = content;

  return (
    <Section id="sertifikat" index="03" title={certificates.title}>
      <CertificateGallery certificates={certificates} />
    </Section>
  );
}
