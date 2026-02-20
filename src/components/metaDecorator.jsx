import { Helmet } from "react-helmet";


const MetaDecorator = ({ title, description, imageUrl, imageAlt }) => (
  <Helmet>
    <title>{title}</title>
    <meta property="og:title" content={title} />
    <meta name="description" content={description} />
    <meta property="og:description" content={description} />
    {/* <meta property="og:image" content={imageUrl} /> */}
    <meta
      property="og:url"
      content={"https://glasses-4u.com"+ window.location.pathname}
    />
    <meta name="twitter:card" content="summary_large_image" />
    {/* <meta name="twitter:image:alt" content={imageAlt} /> */}
  </Helmet>
);


export default MetaDecorator