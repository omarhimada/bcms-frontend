import * as React from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@apollo/client";
import { GET_INIT } from "./queries";
import Nav from "../Nav";
import Loading from "../Loading";
import Footing from "../Footing";
import { Configuration, Font } from "./types";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { ContentPage } from "../Page/types";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrap: {
      flexGrow: 1
    },
    /* Horizontally centered <div> */
    centered: {
      display: "flex",
      justifyContent: "center",
      background: "rgb(250,250,250)",
      width: "100%",
      minHeight: "77vh"
    },
    /* The 'TOP' button at the bottom of each page */
    backTopInner: {
      textAlign: "center",
      fontSize:  "1.1rem",
      fontWeight: "bold",
    },
    /* Wrapper for the <Footing> component */
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6, 0),
    },
  })
);

export default () => {
  // Init: get navigational information and site configuration
  const { loading, error, data } = useQuery(GET_INIT);
  const classes = useStyles();

  if (loading)
    return (
      <Paper className={classes.centered} id="centered-root">
        <Loading />
      </Paper>
    );
  if (error || !data.configurations.length) {
    return (
      <span>
        Error during initialization.
        {error?.message}
      </span>
    );
  }

  const configuration: Configuration = data.configurations[0];
  const pages: ContentPage[] = data.pages;

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: configuration.primaryColor.hex,
      },
      // secondary: {
      //   main: configuration.accentColor.hex,
      // },
    },
    overrides: {
      MuiCard: {
        root: {
          borderRadius: 0
        }
      },
      MuiPaper: {
        root: {
          borderRadius: 0
        }
      },
      MuiButton: {
        root: {
          borderRadius: 0
        }
      },
      MuiButtonBase: {
        root: {
          borderRadius: 0
        }
      }
    }
  });

  /* Headings */
  /* <h6> */
  theme.typography.h6 = {
    fontSize: "1.18rem",
    lineHeight: "1.18rem",
    marginBottom: "calc(1.18rem / 2)",
    fontWeight: "normal"
  };

  /* <h5> */
  theme.typography.h5 = {
    fontSize: "1.38rem",
    lineHeight: "1.38rem",
    marginBottom: "calc(1.38rem / 2)",
    fontWeight: "normal"
  };

  /* <h4> */
  theme.typography.h4 = {
    fontSize: "1.5rem",
    lineHeight: "1.5rem",
    marginBottom: "calc(1.5rem / 2)",
    fontWeight: "normal"
  };

  /* <h3> */
  theme.typography.h3 = {
    fontSize: "1.88rem",
    lineHeight: "1.88rem",
    marginBottom: "calc(1.88rem / 2)",
    fontWeight: "normal"
  };

  /* <h2> */
  theme.typography.h2 = {
    fontSize: "2.4rem",
    lineHeight: "2.4rem",
    marginBottom: "calc(2.4rem / 2)",
    fontWeight: "normal"
  };

  /* <h1> */
  theme.typography.h1 = {
    fontSize: "4.2rem",
    lineHeight: "4.2rem",
    marginBottom: "calc(4.2rem / 3)",
    fontWeight: 300,
    padding: "0 8px"
  };

  // Generate CSS for any additional fonts for injection
  const additionalFontCss =
    configuration.additionalFonts !== null &&
    configuration.additionalFonts!.length
      ? _injectAdditionalFonts(configuration.additionalFonts)
      : "";

  return (
    <>
      {/* Helmet for site-specific meta */}
      <Helmet>
        <link rel="icon" id="favicon" href={configuration.favicon.url} />
        <link rel="apple-touch-icon" href={configuration.appleTouchIcon.url} />

        <meta name="theme-color" content={configuration.primaryColor.hex} />
        <meta name="description" content={configuration.siteDescription} />
        <meta name="keywords" content={configuration.siteKeywords} />

        {/* Inline the manifest.json */}
        <link
          rel="manifest"
          href={`data:application/manifest+json,${configuration.manifestJson.toString()}`}
        />

        <title>{configuration.siteName}</title>

        <style type="text/css">
          {/* Inject additional font CSS */}
          {additionalFontCss}
        </style>
      </Helmet>
      <ThemeProvider theme={theme}>
        <div className={classes.wrap}>
          <Paper elevation={0} className={classes.centered} id="centered-root">
            {/* Nav component for the header and content */}
            <Nav pages={pages} configuration={configuration} />
          </Paper>
          <footer id="footer" className={classes.footer}>
            {/* Footing component for the footer */}
            <Footing configuration={configuration} />
          </footer>
          {/* <BackTop>
            <Button size="large">
              <UpOutlined />
              <BackTopInner>
                TOP
              </BackTopInner>
            </Button>
          </BackTop> */}
        </div>
      </ThemeProvider>
    </>
  );
};

/* Use the site's configuration to inject any additional fonts (optional) */
export function _injectAdditionalFonts(additionalFonts: Font[] | undefined) {
  if (additionalFonts === undefined) return "";

  // Map the partial file names to [file extension, url] tuples to build the correct CSS
  const _fileMap: { [name: string]: [string, string][] } = {};

  // e.g. fileNames: ["Couture-Bold.woff2", "Couture-Bold.woff", "NEOTERIC-Bold.woff2"]
  for (const font of additionalFonts) {
    // Split the file name
    const splitName = font.fileName.split(".");

    // e.g.: 'NEOTERIC-Bold.woff2' -> ['NEOTERIC-Bold', 'woff2']
    const name = splitName[0];
    const extension = splitName[1];

    if (_fileMap[name] === undefined) _fileMap[name] = [];
    _fileMap[name].push([extension, font.url]);
  }
  // fileNamesMap: { "Couture-Bold": [ "woff2", "woff" ], "NEOTERIC-Bold": [ "woff2" ] }

  // i.e.: mapKeys are the file names minus the extensions
  const mapKeys = Object.keys(_fileMap);

  /* Sort the font names so the woff2 is first, then woff, then ttf last
   * (order of ascending file sizes) */
  for (const key of mapKeys) {
    _fileMap[key].sort((extensionUrlTuple1, extensionUrlTuple2) => {
      const ext1 = extensionUrlTuple1[0];
      const ext2 = extensionUrlTuple2[0];
      if (ext1 > ext2) return -1;
      if (ext2 < ext1) return 1;
      return 0;
    });
  }

  return mapKeys
    .map(
      (fontName) =>
        /* Create a @font-face for each additional font retrieved */
        "@font-face {" +
        `\r\n\tfont-family: '${fontName}';` +
        `\r\n\tsrc: ${_fileMap[fontName]
          .map(
            (extensionUrlTuple) =>
              `\r\n\t\turl('${extensionUrlTuple[1]}') format('${extensionUrlTuple[0]}')`
          )
          .join(",")};` +
        "\r\n}"
      // Join to make react-helmet play nice
    )
    .join("\r\n");
}