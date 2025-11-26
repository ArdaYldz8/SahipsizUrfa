import Head from 'next/head';

interface MetaProps {
  title: string;
  description: string;
  image?: string;
}

const Meta: React.FC<MetaProps> = ({ title, description, image }) => {
  return (
    <Head>
      <title>{title} | UrfadanHaber</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default Meta;
