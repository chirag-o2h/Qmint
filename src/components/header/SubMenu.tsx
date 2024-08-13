import React from "react"
import { Box, Link, List, Typography } from "@mui/material"
import { Icategory } from "./Navigation"
import classNames from "classnames"

function SubMenu(props: { name: string, subcategories: Icategory[], singleMenu?: boolean, searchEngineFriendlyPageName: string }) {
  const { name, subcategories, singleMenu } = props

  return (
    <Box className={classNames("SubMenu", { "singleMenu": singleMenu })}>
      <List
        component="nav"
      >
        {/* activeClassName="Active" */}
        <Link className="SubMenuLink"  key={'main'} href={`/category/${props?.searchEngineFriendlyPageName?.replace(/\//g, '')}`}>
          <Typography variant="overline" component="p">{name}</Typography>
        </Link>
        {subcategories.map((item: Icategory) => {
          return (
            item?.subCategories?.length > 0 ?
              <SubMenu name={item.name} subcategories={item.subCategories} key={item.categoryId} searchEngineFriendlyPageName={`/${item.searchEngineFriendlyPageName}`} /> :
              // @Note:: first menu render will be taken as main from css as per figma
              // activeClassName="Active"
              <Link className="SubMenuLink" key={item.name} href={`/category/${item?.searchEngineFriendlyPageName?.replace(/\//g, '')}`}>
                <Typography variant="overline" component="p">{item.name}</Typography>
              </Link>
          )
        })}
      </List>
    </Box>
  )
}

export default SubMenu