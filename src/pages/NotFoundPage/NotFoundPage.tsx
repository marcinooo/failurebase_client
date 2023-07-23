import React from 'react'
import './NotFoundPage.css'

const NotFoundPage: React.FC = () => (
  <div>
    <div className="is-center">
      <p className="error-code text-primary">404</p>
    </div>
    <div className="is-center">
      <p className="reaction">Ooops!!</p>
    </div>
    <div className="is-center">
      <p className="info">THAT PAGE DOESN&apos;T EXIST</p>
    </div>
  </div>
)

export default NotFoundPage
