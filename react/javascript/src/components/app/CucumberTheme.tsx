import React from 'react'

export declare type Theme = 'dark' | 'default'

const CucumberTheme: React.FunctionComponent<{ theme?: Theme }> = (props) => {
  return (
    <div className={'cucumber-theme--' + (props.theme || 'default')}>
      {props.children}
    </div>
  )
}

export default CucumberTheme
