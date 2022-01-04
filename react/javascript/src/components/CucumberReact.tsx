import React, { FunctionComponent } from 'react'
import { CustomRenderingContext, CustomRenderingSupport, IncludedTheme } from './customise'
import styles from './CucumberReact.module.scss'

interface IProps {
  theme?: IncludedTheme
  customRendering?: CustomRenderingSupport
  className?: string
}

export const CucumberReact: FunctionComponent<IProps> = ({
  children,
  theme = 'light',
  customRendering = {},
  className,
}) => {
  const classes = [styles.cucumberReact, styles[`${theme}Theme`], className]
  return (
    <CustomRenderingContext.Provider value={customRendering}>
      <div data-testid="cucumber-react" className={classes.filter((c) => !!c).join(' ')}>
        {children}
      </div>
    </CustomRenderingContext.Provider>
  )
}
