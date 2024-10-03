import GeneralInfoSection from "./components/GeneralInfoSection.jsx";
import EdPractInfoSection from "./components/EdPractInfoSection.jsx";
import "./styles/App.css";

export default function App() {
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
