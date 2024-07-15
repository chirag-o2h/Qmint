import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"
import { useAppSelector } from "@/hooks"
import { joinWithPipe } from "@/utils/common"

function Seo({ description, lang, meta, keywords, title, isItShopPage = false, configDetailsState={} }: any) {
  // const { configDetails: configDetailsState } = useAppSelector((state) => state.homePage)
  title = joinWithPipe([(title ?? ''), (isItShopPage ? (configDetailsState?.Store_ShopPage_Title?.value) : (configDetailsState?.Store_Title?.value))])
  // const { site } = useStaticQuery(graphql`
  //   query DefaultSEOQuery {
  //     site {
  //       siteMetadata {
  //         title
  //         description
  //         author
  //       }
  //     }
  //   }
  // `)

  const metaDescription = description || configDetailsState?.Store_Meta_Description?.value
  // Filter out the noindex meta tag
  const filteredMeta = meta.filter((tag: any) => !((tag.name === 'robots' || tag.name === 'Googlebot') || tag.content === 'noindex'));
  const defaultMeta = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
  ]

  if (keywords.length > 0) {
    defaultMeta.push({
      name: `keywords`,
      content: keywords.join(`, `),
    })
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      meta={[...defaultMeta, ...meta]}
    // titleTemplate={`%s | ${site.siteMetadata.title}`}
    >
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
    </Helmet>
  )
}

Seo.defaultProps = {
  lang: `en`,
  keywords: [],
  meta: [],
  isItShopPage: false
}

Seo.propTypes = {
  description: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  lang: PropTypes.string,
  meta: PropTypes.array,
  title: PropTypes.string,
  isItShopPage: PropTypes.bool,
  configDetailsState: PropTypes.object
}

export default React.memo(Seo)
