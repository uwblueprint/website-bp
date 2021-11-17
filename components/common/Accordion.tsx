import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        borderTop: "1px solid",
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: "60%",
        flexShrink: 0,
        fontWeight: 600,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    expanded: {
        "&$expanded": {
            margin: "0",
            borderBottom: "1px solid",
        },
    },
}));

interface AppProps {
    data: { question: string; ans: string }[];
}

export default function ControlledAccordions(props: AppProps): JSX.Element {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | boolean>(false);

    const handleChange =
        (panel: string) =>
        (event: React.ChangeEvent<unknown>, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <div className={classes.root}>
            {props?.data.map(
                (item: { question: string; ans: string }, k: number) => {
                    return (
                        <Accordion
                            expanded={expanded === "panel" + k}
                            onChange={handleChange("panel" + k)}
                            className={classes.expanded}
                            elevation={0}
                            key={k}
                            square={true}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography className={classes.heading}>
                                    {item.question}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{item.ans}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    );
                },
            )}
        </div>
    );
}
