# bCMS
### TypeScript, React, GraphQL, ant.design, Base Web

CMS front-end written in TypeScript. Uses React, GraphQL (via Apollo), ant.design, and Base Web UI Framework

- [ant.design](https://ant.design)
- [Base Web UI Framework](https://baseweb.design/)
- [Apollo](https://www.apollographql.com/)

#### Integrates with a headless CMS such as [GraphCMS](https://graphcms.com). You could substitute this with a Strapi + GraphQL deployment though.

## Features
- Hero/heading, Carousel & CTA callout
- WYSIWG body content
- Categorized products/services
- Categorized FAQs
- Team Members
- Gallery 
  - Renders thumbnails and full-size images with [graphcms-image](https://github.com/GraphCMS/graphcms-image)

Site-wide configuration also retrieved from CMS and injected via [react-helmet](https://github.com/nfl/react-helmet):
  - Meta keywords, descriptions, title, etc.
  - Footer content
  - Primary and accent colors
  - Additional font assets
  - Logo HTML (e.g.: inline SVG, your own `<img>` element, etc.)

---
## Deploying to Azure Blob Storage as a Static Website
Because this is a React application it can be deployed as a static website. For SEO purposes a `renderAll` parameter is used where it matters (e.g.: rendering all the pages as tabs in the `StatefulTabs` component). 

1. Create an Azure Storage Account
2. Once created, configure the storage account as a 'Static Website' (flip the switch in the settings)
3. Install the Visual Studio Code extension *Azure Storage*
4. Run `yarn build`
5. Right-click the `/build` directory and select *Deploy to Static Website...*
6. Follow the prompts, should deploy quite quickly

---
## yarn
### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
