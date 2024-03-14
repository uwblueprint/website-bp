// InnerTableComponent.tsx
import React, {useState} from "react";
import MUIDataTable, {
  MUIDataTableColumn,
  MUIDataTableOptions,
} from "mui-datatables";
import { getExpandableRowMuiTheme } from "utils/muidatatable";
import { MuiThemeProvider } from "@material-ui/core";
import { SkillCategory } from "@utils/muidatatable";
import { set } from "firebase/database";

type ReviewerData = {
  reviewerName: string;
  pfsg: number;
  teamPlayer: number;
  d2l: number;
  skill: number;
  skillCategory: string;
  reviewerComments: string;
};

interface InnerTableProps {
  data: ReviewerData[];
  columns: MUIDataTableColumn[];
  edit?: boolean;
  toggleEdit?: () => void;
}

const ExpandableRowTable: React.FC<InnerTableProps> = ({ data, columns, edit}) => {

  const initData1 = {"PFSG": data[0]["PFSG"], "team": data[0]["Team Player"], "D2L": data[0]["D2L"], "skill": data[0]["Skill"]}
  const initData2 = {"PFSG": data[1]["PFSG"], "team": data[1]["Team Player"], "D2L": data[1]["D2L"], "skill": data[1]["Skill"]}

  console.log("columns", columns);
  console.log("data", data);

  // for (let i=0; i<columns.length; i++) {
  //   if (columns[i].name == "PFSG"){
  //     initData["PFSG"] = columns[i].value
  //   } else if (columns[i].name == "Team Player") {
  //     initData["team"] = columns[i].value
  //   } else if (columns[i].name == "D2L") {
  //     initData["D2L"] = columns[i].value
  //   } else if (columns[i].name == "Skill"){
  //     initData["skill"] = columns[i].value
  //   }
  // }

  //console.log("data", data);

  const [PFSG, setPFSG] = useState(initData2["PFSG"])
  const [team, setTeam] = useState(initData2["team"])
  const [D2L, setD2L] = useState(initData2["D2L"])
  const [skill, setSkill] = useState(initData2["skill"])

  // for (let i=0; i<columns.length; i++) {
  //   if (columns[i].name == "PFSG"){
  //     initData2["PFSG"] = columns[i].value
  //   } else if (columns[i].name == "Team Player") {
  //     initData2["team"] = columns[i].value
  //   } else if (columns[i].name == "D2L") {
  //     initData2["D2L"] = columns[i].value
  //   } else if (columns[i].name == "Skill"){
  //     initData2["skill"] = columns[i].value
  //   }
  // }

  const handleChange = (event: any) => {
    const { id, value } = event.target;

    if(edit) {
      if (id == "PFSG"){
        setPFSG(value)
      } else if (id == "Team Player") {
        setTeam(value)
      } else if (id == "D2L") {
        setD2L(value)
      } else if (id == "Skill"){
        setSkill(value)
      }
    }
  };

  const updatedColumns = columns.map((column) => {
    if (column.name === "Skill Category") {
      return {
        ...column,
        options: {
          ...column.options,
          customBodyRender: (value: string) => {
            return <SkillCategory category={value} />;
          },
        },
      };
    }
    const getValue = (value: number, column: MUIDataTableColumn) => {
      if (edit) {
        if (column.name == "PFSG"){
          return PFSG
        } else if (column.name == "Team Player") {
          return team
        } else if (column.name == "D2L") {
          return D2L
        } else if (column.name == "Skill"){
          return skill
        }
      }
      else {
        // if (column.name == "PFSG"){
        //   setPFSG(value)
        // } else if (column.name == "Team Player") {
        //   setTeam(value)
        // } else if (column.name == "D2L") {
        //   setD2L(value)
        // } else if (column.name == "Skill"){
        //   setSkill(value)
        // }
        return value
      }
    }

    // Add custom body render for the values when edit is true
    if (edit) {
      //if (column.name === "Reviewer Name") {
      if (column.name === "PFSG" || column.name === "Team Player" || column.name === "D2L" || column.name === "Skill") {
        return {
          ...column,
          options: {
            ...column.options,
            customBodyRender: (value: number) => {
              return (
                <input 
                  type="number" 
                  value={getValue(value, column)} 
                  onChange={handleChange}
                  id={column.name}
                  style={{ 
                    width: '40px', 
                    padding: '5px', 
                    border: '1px solid #ccc', 
                    borderRadius: '4px' 
                  }} 
                />
              );
            },
          },
        };
      }
    }
    return column;
  });

  const options: MUIDataTableOptions = {
    filter: false,
    print: false,
    download: false,
    search: false,
    viewColumns: false,
    pagination: false,
    selectableRows: "none",
  };

  return (
    <MuiThemeProvider theme={getExpandableRowMuiTheme()}>
      <MUIDataTable
        title=""
        data={data}
        columns={updatedColumns}
        options={options}
      />
    </MuiThemeProvider>
  );
};

export default ExpandableRowTable;
