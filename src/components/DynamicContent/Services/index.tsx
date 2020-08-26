import * as React from 'react';
import { useQuery } from '@apollo/client';
import { ListItem, ListItemLabel } from 'baseui/list';
import { Card, Col, Typography } from 'antd';
import Loading from '../../Loading';
import { GET_SERVICES } from './queries';
import { ServiceCategory } from './types';

const { Title } = Typography;

export default () => {
  const { loading, error, data } = useQuery(GET_SERVICES);

  if (loading) return (<Loading />);
  if (error) {
    return (
      <span>
        Error!
        {error.message}
      </span>
    );
  }

  return <>{_renderServiceCategories(data.serviceCategories)}</>;
};

/* Render a Col containing a Card for each service category,
 * which holds a List of products/services */
export function _renderServiceCategories(serviceCategories: ServiceCategory[]) {
  return serviceCategories.map((serviceCategory) => (
    <Col
      key={`col-service-category-${serviceCategory.title}`}
      xs={{ span: 24 }}
      sm={{ span: 24 }}
      md={{ span: 12 }}
      lg={{ span: 12 }}
    >
      <Card
        key={serviceCategory.title}
        title={serviceCategory.title}
        style={{ marginBottom: '1rem' }}
      >
        {_renderServices(serviceCategory)}
      </Card>
    </Col>
  ));
}

/* Render a list of services */
export function _renderServices(serviceCategory) {
  return (
    <ul className="services-ul">
      {serviceCategory.services.map((service) => (
        <ListItem
          sublist
          key={`${serviceCategory.title}${service.name}`}
          endEnhancer={() => (
            <ListItemLabel>
              <span className="currency-symbol">$</span>
              {service.price}
              &nbsp;
              {service.per}
            </ListItemLabel>
          )}
        >
          <ListItemLabel sublist>{service.name}</ListItemLabel>
        </ListItem>
      ))}
    </ul>
  );
}
