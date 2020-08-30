import * as React from "react";
import { useQuery } from "@apollo/client";
import ReactHtmlParser from "react-html-parser";
import Loading from "../../Loading";
import { GET_FAQS } from "./queries";
import { FAQCategory } from "./types";
import {
  AccordionSummary,
  Accordion,
  AccordionDetails,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }),
);

export default () => {
  const { loading, error, data } = useQuery(GET_FAQS);
  const classes = useStyles();

  if (loading) return <Loading />;
  if (error) {
    return (
      <span>
        Error!
        {error.message}
      </span>
    );
  }

  return (
    <>
      <Divider />
      {_renderFAQs(data.faqCategories, classes)}
      <Divider />
    </>
  );
};

/* Render an Accordion for each FAQ category, each holding a List of questions */
export function _renderFAQs(faqCategories: FAQCategory[], classes: any) {

  return faqCategories.map((faqCategory) => (
    <Accordion key={`accordion-${faqCategory.title}`} title={faqCategory.title}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`accordion-${faqCategory.title}-content`}
        id={`accordion-${faqCategory.title}-header`}
      >
        <Typography className={classes.heading}>{faqCategory.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
      <List
        dense={true}>
        {faqCategory.questions.map(faq => (
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={faq.question}
              secondary={
                <>
                  {ReactHtmlParser(faq.answer.html)}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </AccordionDetails>
    </Accordion>
  ));
}
