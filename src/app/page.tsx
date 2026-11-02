import { getPortfolio } from "@/lib/data";
import DashIntro from "@/components/DashIntro";
import Statement from "@/components/Statement";
import PhotoRoll from "@/components/PhotoRoll";
import Work from "@/components/Work";
import Reveal from "@/components/Reveal";
import Lightbox from "@/components/Lightbox";
import Nav from "@/components/Nav";
import Journey from "@/components/Journey";
import { Certificates, Contact, Tools } from "@/components/Sections";

export default async function Home() {
  const { profile, rollPhotos, projects, dataProjects, jobs, certificates, tools } = await getPortfolio();

  return (
    <>
      <Nav profile={profile} />
      <DashIntro profile={profile} />
      <Statement text={profile.statement} highlights={profile.statementHighlights} />
      <PhotoRoll photos={rollPhotos} />
      <Work projects={projects} id="work" label="Selected work · Figma" />
      <Work
        projects={dataProjects}
        id="data-work"
        label="Data work · Power BI"
        note="Built on internal AHM data, so the Power BI files aren't public and can't be linked."
      />
      <Journey jobs={jobs} />
      <Certificates certificates={certificates} />
      <Tools tools={tools} />
      <Contact profile={profile} />
      <Lightbox />
      <Reveal />
    </>
  );
}
