import * as React from 'react';
import { Cell, Grid } from 'baseui/layout-grid';
import {
  FILL, StatefulTabs, StyledTabList, Tab,
} from 'baseui/tabs-motion';
import { Layout } from 'antd';
import Page from '../Page';

export default (params) => {
  const { configuration } = params;
  const { pages } = params;

  return (
    <StatefulTabs
      renderAll
      fill={FILL.fixed}
      overrides={{
			  Root: {
			    style: {
			      backgroundColor: '#fff',
			      width: '100%',
			    },
			  },
			  TabHighlight: {
			    style: ({ $theme }) => ({
            backgroundColor: $theme.colors.primaryA,
          }),
			  },
			  TabList: {
			    /* Override the default baseui tabs to include the logo and tabsRef */
			    component: function TabsListOverride(props: any) {
			      return (
							<Grid overrides={{ Grid: { style: { paddingLeft: '0 !important', paddingRight: '0 !important' } } }}>
								<Cell span={[4, 3, 5]} overrides={LogoCellOverrides}>
									{/* Render the logo using the logo HTML */}
									{_renderLogo(configuration.logoHtml)}
								</Cell>
								{/* This cell is also overridden */}
								<Cell span={[4, 5, 7]} overrides={TabsCellOverrides}>
									<StyledTabList {...props} />
								</Cell>
							</Grid>
			      );
			    },
			  },
      }}
      activateOnFocus
    >
      {/* Render a tab for each page */}
      {pages.map((page) => (
        <Tab
          key={page.id}
          title={page.title}
          overrides={{
					  TabPanel: {
					    style: {
					      paddingLeft: 0,
					      paddingRight: 0,
					      paddingBottom: 0,
					      maxWidth: '1376px',
					      width: '100%',
					      justifyContent: 'center',
					      margin: '0 auto',
					    },
					  },
          }}
        >
          <Layout className="layout">
            {/* Page component renders the header and content of the layout */}
            <Page pageId={page.id} />
          </Layout>
        </Tab>
      ))}
    </StatefulTabs>
  );
};

/* Get the site's configuration for the logo HTML and parse it */
export function _renderLogo(logoHtml) {
  // If the logo HTML is an <svg> use dangerouslySetInnerHtml to avoid React parsing issues
  return (
    <div
      className="tabs-logo-wrap"
      dangerouslySetInnerHTML={{ __html: logoHtml }}
      onClick={() => {
			  // If the user clicks the logo navigate to the first tab (assume 'Home')
			  const homeTab = document.querySelector<HTMLButtonElement>('button[data-baseweb=tab]:first-child');
				homeTab!.click();
				homeTab!.focus();
      }}
    />
  );
}

/* Logo cell overrides */
const LogoCellOverrides = {
  Cell: {
    style: {
      paddingRight: '0 !important',
    },
  },
};

/* Tabs cell overrides */
const TabsCellOverrides = {
  Cell: {
    style: {
      width: '100%',
    },
  },
};
