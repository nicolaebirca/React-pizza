import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader 
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="129" cy="119" r="117" /> 
    <rect x="22" y="254" rx="13" ry="13" width="217" height="25" /> 
    <rect x="26" y="293" rx="6" ry="6" width="211" height="58" /> 
    <rect x="30" y="365" rx="6" ry="6" width="83" height="21" /> 
    <rect x="128" y="359" rx="20" ry="20" width="105" height="35" />
  </ContentLoader>
)

export default Skeleton;