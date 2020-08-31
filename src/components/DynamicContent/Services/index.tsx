import * as React from "react";
import { useQuery } from "@apollo/client";
import Loading from "../../Loading";
import { GET_SERVICES } from "./queries";
import { ServiceCategory } from "./types";
import {
  Divider,
  Card,
  Grid,
  List,
  ListItem,
  ListItemText,
  CardContent,
  CardHeader,
} from "@material-ui/core";

export default () => {
  const { loading, error, data } = useQuery(GET_SERVICES);

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
      <Grid spacing={2} container>
        {_renderServiceCategories(data.serviceCategories)}
      </Grid>
    </>
  );
};

/* Render a Col containing a Card for each service category,
 * which holds a List of products/services */
export function _renderServiceCategories(serviceCategories: ServiceCategory[]) {
  return serviceCategories.map((serviceCategory) => (
    <Grid
      item
      key={`col-service-category-${serviceCategory.title}`}
      xs={12}
      sm={12}
      md={6}
      lg={6}
    >
      <Card 
        key={serviceCategory.title} 
        style={{ marginBottom: "1rem" }}
        variant="outlined"
        >
        <CardHeader title={serviceCategory.title} />
        <CardContent>{_renderServices(serviceCategory)}</CardContent>
      </Card>
    </Grid>
  ));
}

/* Render a list of services */
export function _renderServices(serviceCategory) {
  return (
    <List key={`services-ul-${serviceCategory.title}`} dense={true}>
      {serviceCategory.services.map((service) => (
        <ListItem>
          <ListItemText
            primary={service.name}
            secondary={
              <>
                <span className="currency-symbol">$</span>
                {service.price}
                &nbsp;
                {service.per}
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}
