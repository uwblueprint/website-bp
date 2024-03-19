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

  const [PFSG1, setPFSG1] = useState(initData1["PFSG"])
  const [team1, setTeam1] = useState(initData1["team"])
  const [D2L1, setD2L1] = useState(initData1["D2L"])
  const [skill1, setSkill1] = useState(initData1["skill"])

  const [PFSG, setPFSG] = useState(initData2["PFSG"])
  const [team, setTeam] = useState(initData2["team"])
  const [D2L, setD2L] = useState(initData2["D2L"])
  const [skill, setSkill] = useState(initData2["skill"])

  const handleChange = (event: any, row: number) => {
    console.log("event", event);
    console.log("row", row);
    const { id, value } = event.target;

    if(edit && row == 0) {
      if (id == "PFSG"){
        setPFSG1(value)
      } else if (id == "Team Player") {
        setTeam1(value)
      } else if (id == "D2L") {
        setD2L1(value)
      } else if (id == "Skill"){
        setSkill1(value)
      }
    }
    if (edit && row == 1) {
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
    const getValue = (value: number, column: MUIDataTableColumn, row: number) => {
      if (edit && row == 0) {
        if (column.name == "PFSG"){
          return PFSG1
        } else if (column.name == "Team Player") {
          return team1
        } else if (column.name == "D2L") {
          return D2L1
        } else if (column.name == "Skill"){
          return skill1
        }
      }
      else if (edit && row == 1) {
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
        return value
      }
    }

    // Add custom body render for the values when edit is true
    if (edit) {
      if (column.name === "PFSG" || column.name === "Team Player" || column.name === "D2L" || column.name === "Skill") {
        return {
          ...column,
          options: {
            ...column.options,
            customBodyRender: (value: number, tableMeta: any) => {
              return (
                <input 
                  type="number" 
                  value={getValue(value, column, tableMeta.rowIndex)} 
                  onChange={(e) => handleChange(e, tableMeta.rowIndex)}
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
