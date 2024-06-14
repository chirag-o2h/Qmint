import React from "react"
import { Box, List, Typography } from "@mui/material"
import { Icategory } from "./Navigation"
import { Link } from "gatsby";
import classNames from "classnames"

function SubMenu(props: { name: string, subcategories: Icategory[], singleMenu?: boolean, searchEngineFriendlyPageName: string }) {
  const { name, subcategories, singleMenu } = props

  return (
    <Box className={classNames("SubMenu", { "singleMenu": singleMenu })}>
      <List
        component="nav"
      >
        <Link className="SubMenuLink" activeClassName="Active" key={'main'} to={`/category/${props?.searchEngineFriendlyPageName?.replace(/\//g, '')}`}>
          <Typography variant="overline" component="p">{name}</Typography>
        </Link>
        {subcategories.map((item: Icategory) => {
          return (
            item?.subCategories?.length > 0 ?
              <SubMenu name={item.name} subcategories={item.subCategories} key={item.categoryId} searchEngineFriendlyPageName={`/${item.searchEngineFriendlyPageName}`} /> :
              // @Note:: first menu render will be taken as main from css as per figma
              <Link className="SubMenuLink" activeClassName="Active" key={item.name} to={`/category/${item?.searchEngineFriendlyPageName?.replace(/\//g, '')}`}>
                <Typography variant="overline" component="p">{item.name}</Typography>
              </Link>
          )
        })}
      </List>
    </Box>
  )
}

export default SubMenu