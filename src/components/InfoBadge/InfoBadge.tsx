import React from 'react'
import Close from '../../assets/svg/close.svg'
import './InfoBadge.css'

interface InfoBadgeProps {
  text: string | number
  id?: string
  className?: string
  onClose: (event: React.MouseEvent<HTMLElement>) => void
}

const InfoBadge: React.FC<InfoBadgeProps> = ({
  text,
  id,
  className,
  onClose
}) => (
  <span
    id={id}
    className={'info-badge ' + (className ?? '') }
  >
    {text}
    <img
      className='info-badge-close'
      src={Close}
      alt="Close SVG"
      onClick={(event) => { onClose(event) }}
    />
  </span>
)

export default InfoBadge
