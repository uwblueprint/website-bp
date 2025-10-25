import React, { FC } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

interface TitleProps {
  numFirstChoiceEntries?: number;
  numSecondChoiceEntries?: number;
  setWhichChoiceTab: (tab: number) => void;
  whichChoiceTab?: number;
}
interface TabDescriptionProps {
  title: string;
  numEntries: number | undefined;
  pillStyle: string;
}

interface SimpleTableTitleProps {
  numEntries: number | undefined;
}

const InterviewTableTitle: React.FC<SimpleTableTitleProps> = ({ numEntries }) => {
  const pillStyle =
    "border-2 border-blue-100 text-blue rounded-full px-4 py-2 m-2 font-large inline-block";

  return (
    <div className="bg-sky rounded-t text-blue-300 text-base font-inter font-medium px-4 py-1 flex justify-between items-center">
      <div
        className="flex items-baseline"
        style={{
          color: "black",
          textTransform: "none",
          fontSize: 20,
          width: 400,
        }}
      >
        Applicants <span className={pillStyle}>{numEntries} Entries</span>
      </div>
    </div>
  );
};

export default InterviewTableTitle;