import Head from "next/head";
import { useRouter } from "next/router";
import { InferGetStaticPropsType, NextPage } from "next";
import { BuilderComponent, builder, Builder } from "@builder.io/react";
import parser from "html-react-parser";

import { componentRegister } from "../components/Title";

const locale = "Default";
builder.init(process.env.NEXT_PUBLIC_BUILDER_IO_KEY);

componentRegister();

const Home: NextPage<{ page: any }> = ({ page }) => {
  if (!Builder.isEditing && !Builder.isPreviewing && !page) {
    return <div>No content</div>;
  }

  const router = useRouter();
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  builder.setUserAttributes({ locale });
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {page || Builder.isPreviewing || Builder.isEditing ? (
          <div>
            <div>
              <BuilderComponent
                locale={locale}
                content={page}
                model="page"
                isChild
              />
            </div>
          </div>
        ) : (
          <div>Not found</div>
        )}
      </main>
    </div>
  );
};
export default Home;

export async function getStaticProps({ params }) {
  const path = (params.page || []).join("/");
  const page = await builder
    .get("page", {
      userAttributes: { urlPath: `/${path}`, locale: locale },
      options: { data: { locale: locale } },
      cachebust: true,
    })
    .toPromise();

  return {
    props: {
      page,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  // uncomment to have pages generated on the build time
  const pages = await builder.getAll("page", {
    options: { noTargeting: true },
    omit: "data.blocks",
  });
  const paths = pages.map((page) => page.data?.url);
  return {
    paths,
    fallback: true,
  };
}
