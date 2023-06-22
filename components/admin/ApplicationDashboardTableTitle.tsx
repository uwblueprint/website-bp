import Button from "@components/common/Button";
import React, { FC } from "react";

const TableTitle: FC = () => {
  return (
    <div className="bg-eggshell border-charcoal-300 border border-b-0 text-blue-300 text-base font-inter font-medium px-4 py-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="pr-2 text-base text-charcoal-600">Applicant Entry</h1>
        <p className="border-2 border-blue rounded-full text-blue text-center px-2 py-1 m-2 inline-block capitalize">
          200 Entries
        </p>
      </div>
      <Button
        aria-labelledby="application-table-edit-button-label"
        variant="secondary"
      >
        <div className="flex items-center">
          <svg
            width="13"
            height="12"
            viewBox="0 0 13 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.67073 12C1.34878 12 1.07307 11.8856 0.843611 11.6568C0.614147 11.428 0.499611 11.1526 0.500001 10.8307V2.64555C0.500001 2.32399 0.614733 2.04862 0.844196 1.81944C1.07366 1.59026 1.34917 1.47586 1.67073 1.47625H6.89512L5.72439 2.64555H1.67073V10.8307H9.86585V6.76736L11.0366 5.59805V10.8307C11.0366 11.1523 10.9219 11.4276 10.6924 11.6568C10.4629 11.886 10.1874 12.0004 9.86585 12H1.67073ZM8.2122 1.81242L9.04634 2.63094L5.18293 6.48965V7.32278H6.00244L9.88049 3.44945L10.7146 4.26797L6.83659 8.14129C6.72927 8.24848 6.60478 8.33384 6.46312 8.39737C6.32146 8.4609 6.17278 8.49247 6.01707 8.49208H4.59756C4.43171 8.49208 4.29259 8.43596 4.1802 8.3237C4.06781 8.21145 4.01181 8.07269 4.0122 7.90743V6.48965C4.0122 6.33374 4.04146 6.18504 4.1 6.04356C4.15854 5.90207 4.24146 5.77793 4.34878 5.67113L8.2122 1.81242ZM10.7146 4.26797L8.2122 1.81242L9.67561 0.350792C9.90976 0.116931 10.1903 0 10.5174 0C10.8444 0 11.1199 0.116931 11.3439 0.350792L12.1634 1.18392C12.3878 1.40804 12.5 1.68088 12.5 2.00244C12.5 2.32399 12.3878 2.59683 12.1634 2.82095L10.7146 4.26797Z"
              fill="#0073E5"
            />
          </svg>
          <span id="application-table-edit-button-label" className="pl-2">
            Edit
          </span>
        </div>
      </Button>
    </div>
  );
};

export default TableTitle;
