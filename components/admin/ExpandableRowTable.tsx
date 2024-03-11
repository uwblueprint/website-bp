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
  setReviewer: any;
  columns: MUIDataTableColumn[];
  edit?: boolean;
  toggleEdit?: () => void;
}

const ExpandableRowTable: React.FC<InnerTableProps> = ({ data, setReviewer, columns, edit}) => {

  const [PFSG, setPFSG] = useState(0)
  const [team, setTeam] = useState(0)
  const [D2L, setD2L] = useState(0)
  const [skill, setSkill] = useState(0)

  // for (let i=0; i<columns.length; i++) {
  //   if (columns[i].name == "PFSG"){
  //     setPFSG(columns[i].value)
  //   } else if (columns[i].name == "Team Player") {
  //     setTeam(columns[i].value)
  //   } else if (columns[i].name == "D2L") {
  //     setD2L(columns[i].value)
  //   } else if (columns[i].name == "Skill"){
  //     setSkill(columns[i].value)
  //   }
  // }

  const handleChange = (event: any) => {
    const { id, value } = event.target;

    setReviewer(prevReviewer => ({
      
    });

    if (id == "PFSG"){
      setPFSG(value)
    } else if (id == "Team Player") {
      setTeam(value)
    } else if (id == "D2L") {
      setD2L(value)
    } else if (id == "Skill"){
      setSkill(value)
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
        if (column.name == "PFSG"){
          setPFSG(value)
        } else if (column.name == "Team Player") {
          setTeam(value)
        } else if (column.name == "D2L") {
          setD2L(value)
        } else if (column.name == "Skill"){
          setSkill(value)
        }
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
