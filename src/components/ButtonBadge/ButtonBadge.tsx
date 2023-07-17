import React from 'react'
import './ButtonBadge.css'

interface ButtonBadgeProps {
  text: string | number
  id?: string
  className?: string
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

const ButtonBadge: React.FC<ButtonBadgeProps> = ({
  text,
  id,
  className,
  onClick = (event) => {}
}) => (
  <div
    id={id}
    className={'button-badge ' + (className ?? '') }
    onClick={(event) => { onClick(event) }}
  >
    {text}
  </div>
)

export default ButtonBadge
