import { useState } from "react";
import GeneralInfoSection from "./components/GeneralInfoSection.jsx";
import EdPractInfoSection from "./components/EdPractInfoSection.jsx";
import "./styles/App.css";

function CVApp() {
  return (
    <>
      <h1>CV Generator</h1>
      <GeneralInfoSection />
      <EdPractInfoSection
        sectionTitle="Educational Experience"
        initialEdPractInput={{
          schoolName: "",
          titleOfStudy: "",
          datesOfStudy: "",
        }}
        fieldNames={["schoolName", "titleOfStudy", "datesOfStudy"]}
      />
      <EdPractInfoSection
        sectionTitle="Practical Experience"
        initialEdPractInput={{
          companyName: "",
          positionTitle: "",
          datesAtPosition: "",
          positionResponsibilities: "",
        }}
        fieldNames={[
          "companyName",
          "positionTitle",
          "datesAtPosition",
          "positionResponsibilities",
        ]}
      />
    </>
  );
}

export { CVApp };
