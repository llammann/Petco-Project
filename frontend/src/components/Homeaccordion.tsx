import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Homeaccardion() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography
            sx={{ width: "33%", flexShrink: 0 }}
            style={{ fontWeight: "bolder", color: "#0A303A" }}
          >
            Working for dog adoption
          </Typography>
          <Typography sx={{ color: "text.secondary" }}></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The best overall dog DNA test is embark breed & health Kit (view
            atths Chewy), which provides you with a breed brwn and ition on
            provides ancestors most dogs.
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography
            sx={{ width: "33%", flexShrink: 0 }}
            style={{ fontWeight: "bolder", color: "#0A303A" }}
          >
            Competitions & Awards
          </Typography>
          <Typography sx={{ color: "text.secondary" }}></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The best overall dog DNA test is embark breed & health Kit (view
            atths Chewy), which provides you with a breed brwn and ition on
            provides ancestors most dogs.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography
            sx={{ width: "33%", flexShrink: 0 }}
            style={{ fontWeight: "bolder", color: "#0A303A" }}
          >
            The puppies are 3 month old
          </Typography>
          <Typography sx={{ color: "text.secondary" }}></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The best overall dog DNA test is embark breed & health Kit (view
            atths Chewy), which provides you with a breed brwn and ition on
            provides ancestors most dogs.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
