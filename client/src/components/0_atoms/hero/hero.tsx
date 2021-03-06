import React from 'react'

interface IProps {
  /** Additional CSS UI class */
  className?: string
  /** Subtitle of the banner */
  subtitle?: React.ReactElement | string
  /** Title of the banner */
  title: React.ReactElement | string
  /** Style css */
  style?: React.CSSProperties
}

export const Hero = React.memo(
  ({ className = '', title, subtitle, ...rest }: IProps) => (
    <section className={'hero ' + className} {...rest}>
      <div className="hero-body">
        <h1 className="title">{title}</h1>
        {subtitle && <h2 className="subtitle">{subtitle}</h2>}
      </div>
    </section>
  )
)
