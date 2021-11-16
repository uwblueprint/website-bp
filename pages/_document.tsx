import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
    DocumentInitialProps,
} from "next/document";
import { ServerStyleSheet } from "styled-components";
import { ServerStyleSheets } from "@material-ui/core/styles";

// https://github.com/nblthree/nextjs-with-material-ui-and-styled-components
// https://stackoverflow.com/questions/55109497/how-to-integrate-nextjs-styled-components-with-material-ui
class CustomDocument extends Document {
    static async getInitialProps(
        ctx: DocumentContext,
    ): Promise<DocumentInitialProps> {
        const styledComponentsSheet = new ServerStyleSheet();
        const materialSheets = new ServerStyleSheets();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        styledComponentsSheet.collectStyles(
                            materialSheets.collect(<App {...props} />),
                        ),
                });
            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {materialSheets.getStyleElement()}
                        {styledComponentsSheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            styledComponentsSheet.seal();
        }
    }
    render() {
        return (
            <Html>
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Poppins"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default CustomDocument;
